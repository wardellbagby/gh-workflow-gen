import { continuousIntegration } from "../.github/workflow-templates/continuousIntegration.js";
import { writeWorkflow } from "../src/index.js";
import { productionRelease } from "../.github/workflow-templates/productionRelease.js";

writeWorkflow(continuousIntegration);
writeWorkflow(productionRelease);
