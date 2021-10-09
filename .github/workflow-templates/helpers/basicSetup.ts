import { AppStep } from "../index";
import { CACHE, CHECKOUT, SETUP_NODE } from "./Versions.js";

export const basicSetup: AppStep[] = [
  {
    name: "Checkout the current branch",
    uses: CHECKOUT,
    with: {
      "fetch-depth": 0,
    },
  },
  {
    name: "Setup Node.js - 14.x.x",
    uses: SETUP_NODE,
    with: {
      "node-version": ">=14.18",
      cache: "npm",
    },
  },
  {
    uses: CACHE,
    name: "Cache Node Modules",
    with: {
      path: "~/.npm",
      key: "${{ runner.os}}-node-${{ hashFiles('**/package-lock.json') }}",
      "restore-keys": "${{ runner.os }}-node-",
    },
  },
  {
    name: "Install Node modules",
    run: "npm ci",
  },
];
