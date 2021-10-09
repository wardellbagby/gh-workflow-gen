import { CHECKOUT } from "../Versions";
import { VersionedStep, VersionedWorkflow } from "../workflow-generator";

const basicSetup: VersionedStep[] = [
  {
    name: "Checkout project",
    uses: CHECKOUT,
  },
  {
    name: "Install project dependencies",
    run: "npm ci",
  },
];

export const continuousIntegration: VersionedWorkflow = {
  name: "Continuous Integration",
  on: {
    push: {},
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
    lint: {
      name: "Check lint",
      "runs-on": "ubuntu-20.04",
      steps: [
        ...basicSetup,
        {
          name: "Check lint",
          run: "npm run lint",
        },
      ],
    },
  },
};
