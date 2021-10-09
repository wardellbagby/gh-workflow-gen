import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { Job, Workflow } from "./Workflow.js";

export * from "./Workflow.js";

/**
 * Convert an array of entries into an object of type T;
 */
const fromEntries = <T>(entries: Array<[keyof T, T[keyof T]]>): T => {
  const newObject = Object.create(null);
  for (const [key, val] of entries) {
    newObject[key] = val;
  }
  return newObject;
};

const error = (message: string): never => {
  throw new Error(message);
};

/**
 * A very complicated way to replace the "needs" field with the actual key of
 * the job being depended on.
 *
 * @param workflow The Workflow to normalize.
 */
const normalize = <T extends Record<string, string>>(
  workflow: Workflow<T>
): Workflow<T> => ({
  ...workflow,
  jobs: fromEntries(
    Object.entries(workflow.jobs).map((namedJob) => {
      const [name, job] = namedJob;
      return [
        name,
        {
          ...job,
          needs: (Array.isArray(job.needs)
            ? job.needs
            : job.needs === undefined
            ? undefined
            : [job.needs]
          )?.map((need: string | Job<T>) => {
            if (typeof need === "string") {
              return need;
            } else {
              const reference = Object.entries(workflow.jobs).find(
                (match) => match[1] === need
              );
              return reference[0];
            }
          }),
        },
      ];
    })
  ),
});

/**
 * Iterates through all parent directories until it finds a valid GitHub Workflows folder and returns it if it
 * exists, and null otherwise.
 *
 * @param dir An optional starting directory. If not supplied, will default to the current working directory.
 */
export const findNearestWorkflowFolder = (dir?: string): string | null => {
  const currentDir = path.resolve(dir ?? process.cwd());
  for (const dir of fs.readdirSync(currentDir)) {
    if (dir === ".github") {
      return path.resolve(dir, "workflows");
    }
  }
  const parentDir = path.resolve(currentDir, "..");
  if (parentDir === currentDir) {
    return null;
  }
  return findNearestWorkflowFolder(parentDir);
};
/**
 * Write the given Workflow to a YAML file.

 * @param workflow The Workflow to write.
 * @param file An optional file to write to. If not given, will default to a file based on the name of the Workflow
 * in the first GitHub Workflows folder that can be found by iterating through parent directories, starting at the
 * current working directory.

 * @see findNearestWorkflowFolder
 */
export const writeWorkflow = <T extends Record<string, string>>(
  workflow: Workflow<T>,
  file?: string
) => {
  const outputFile =
    file ??
    path.resolve(
      findNearestWorkflowFolder() ??
        error("Failed to find a valid GitHub Workflows folder."),
      `${workflow.name.replace(/\s/g, "-")}.yml`
    );

  fs.mkdirSync(path.resolve(outputFile, ".."), { recursive: true });
  fs.writeFileSync(outputFile, convertToYaml(workflow));
};

/**
 * Convert the given Workflow to a YAML file that is valid for GitHub.
 * @param workflow The Workflow to convert.
 */
export const convertToYaml = <T extends Record<string, string>>(
  workflow: Workflow<T>
): string => {
  return yaml.dump(normalize(workflow), { forceQuotes: true, noRefs: true });
};
