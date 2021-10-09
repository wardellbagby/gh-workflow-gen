import { AppWorkflow } from "./index";
import { basicSetup } from "./helpers/basicSetup.js";

export const test: AppWorkflow = {
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
    test: {
      name: "Run tests",
      "runs-on": "ubuntu-20.04",
      steps: [
        ...basicSetup,
        {
          name: "Run tests",
          run: "npm run test",
        },
      ],
    },
  },
};
