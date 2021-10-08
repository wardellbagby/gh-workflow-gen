export interface BranchesOrTags {
  branches?: string[];
  tags?: string[];
}

export interface Job<
  VersionT extends Record<string, string> = Record<string, string>
> {
  name: string;
  "runs-on": "ubuntu-20.04" | "macos-10.15";
  needs?: Array<string | Job<VersionT>> | string | Job<VersionT>;
  if?: string;
  steps: Step<VersionT>[];
}

export interface Step<
  VersionT extends Record<string, string> = Record<string, string>
> {
  name: string;
  if?: string;
  uses?: VersionT[Extract<keyof VersionT, string>];

  run?: string;
  with?: Record<string, string | boolean | number>;
  env?: Record<string, string | boolean>;
}

export interface Workflow<
  VersionT extends Record<string, string> = Record<string, string>
> {
  name: string;
  on: {
    push?: BranchesOrTags;
    pull_request?: BranchesOrTags;
  };
  jobs: Record<string, Job<VersionT>>;
}
