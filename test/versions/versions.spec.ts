import {
  Workflow,
  convertToYaml,
} from "@wardellbagby/gh-workflow-gen";
import path from "path";
import fs from "fs";
import { assertEquals, directory } from "../test_helpers.js";
import * as Versions from "./Verions.js";

export const testWorkflowWithVersions = () => {
  const workflow: Workflow<typeof Versions> = {
    name: "Versioned Workflow",
    on: {
      push: {},
    },
    jobs: {
      echo: {
        name: "Check the deps!",
        "runs-on": "ubuntu-latest",
        steps: [
          {
            name: "Using a dependency!!",
            uses: Versions.SOME_THING,
          },
        ],
      },
    },
  };

  const actual = convertToYaml(workflow);

  const expected = fs
    .readFileSync(
      path.resolve(directory(import.meta.url), "versioned-expected.yml")
    )
    .toString();

  assertEquals(actual, expected);
};
