import * as versions from "./Versions.js";
import { Job, Step, Workflow } from "@wardellbagby/github-workflow-generator";

export type VersionedJob = Job<typeof versions>;
export type VersionedStep = Step<typeof versions>;
export type VersionedWorkflow = Workflow<typeof versions>;
