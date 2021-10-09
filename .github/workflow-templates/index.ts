import { Step, Workflow } from "../../src/";
import * as versions from "./helpers/Versions.js";

export type AppWorkflow = Workflow<typeof versions>;
export type AppStep = Step<typeof versions>;
