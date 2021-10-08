import {
  Workflow,
  convertToYaml,
} from "@wardellbagby/github-workflow-generator";
import path from "path";
import fs from "fs";
import { assertEquals, directory } from "../test_helpers.js";

export const testSimpleWorkflow = () => {
  const workflow: Workflow = {
    name: "Simple Workflow",
    on: {
      push: {},
    },
    jobs: {
      echo: {
        name: "Echo",
        "runs-on": "macos-10.15",
        steps: [
          {
            name: "Echoing!",
            run: 'echo "Hello World!"',
          },
        ],
      },
    },
  };

  const actual = convertToYaml(workflow);

  const expected = fs
    .readFileSync(
      path.resolve(directory(import.meta.url), "simple-expected.yml")
    )
    .toString();

  assertEquals(actual, expected);
};
