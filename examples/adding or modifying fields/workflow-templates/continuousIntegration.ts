import { WorkflowWithSpecialEvent } from "../workflow-generator";
import { Step } from "@wardellbagby/github-workflow-generator";

const basicSetup: Step[] = [
  {
    name: "Checkout project",
    run: "git clone my-project-url",
  },
  {
    name: "Install project dependencies",
    run: "npm ci",
  },
];

export const continuousIntegration: WorkflowWithSpecialEvent = {
  name: "Continuous Integration",
  on: {
    push: {},
    my_special_event: {
      event_property: true,
    },
  },
  jobs: {
    test: {
      name: "Run Tests",
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
