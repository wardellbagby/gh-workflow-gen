import { AppWorkflow } from "./index";
import { test } from "./helpers/test.js";

export const continuousIntegration: AppWorkflow = {
  name: "Run all tests",
  on: {
    push: {
      branches: ["main"],
    },
    pull_request: {
      branches: ["main"],
    },
  },
  jobs: {
    test,
  },
};
