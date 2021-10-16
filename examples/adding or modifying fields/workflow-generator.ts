import { Workflow } from "@wardellbagby/gh-workflow-gen";

export type WorkflowWithSpecialEvent = Workflow & {
  on: {
    my_special_event?: { event_property: boolean };
  };
};
