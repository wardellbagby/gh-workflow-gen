import { basicSetup } from "./basicSetup.js";
import { AppJob } from "../index";

export const test: AppJob = {
  name: "Run tests",
  "runs-on": "ubuntu-latest",
  steps: [
    ...basicSetup,
    {
      name: "Run tests",
      run: "npm run test",
    },
  ],
};
