import { Workflow } from "@wardellbagby/github-workflow-generator";

export type WorkflowWithSpecialEvent = Workflow & {
  on: {
    my_special_event?: { event_property: boolean };
  };
};
