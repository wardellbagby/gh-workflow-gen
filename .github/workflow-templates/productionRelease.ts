import { AppWorkflow } from "./index";
import { basicSetup } from "./helpers/basicSetup.js";
import { test } from "./helpers/test.js";
import { NPM_PUBLISH } from "./helpers/Versions.js";

export const productionRelease: AppWorkflow = {
  name: "Release to NPM",
  on: {
    push: {
      tags: ["v*"],
    },
  },
  jobs: {
    test,
    publish: {
      name: "Release to NPM registry",
      needs: test,
      "runs-on": "ubuntu-20.04",
      steps: [
        ...basicSetup,
        {
          name: "Publish to NPM",
          uses: NPM_PUBLISH,
          with: {
            token: "${{ secrets.NPM_TOKEN }}",
          },
        },
      ],
    },
  },
};
