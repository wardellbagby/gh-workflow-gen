export interface BranchesTagsOrPaths {
  branches?: string[];
  tags?: string[];
  paths?: string[];
}

export interface Schedule {
  cron: string;
}

type ubuntuVersions = "22.04" | "20.04" | "latest";
type macOSVersions = "13" | "12" | "11" | "latest";
type windowsVersions = "2022" | "2019" | "latest";

type SelfHostedRunnerLabels =
  | "windows"
  | "linux"
  | "macOS"
  | "x64"
  | "ARM"
  | "ARM64"
  | string;

export type Runners =
  | `ubuntu-${ubuntuVersions}`
  | `macos-${macOSVersions}`
  | `windows-${windowsVersions}`
  | ["self-hosted", ...SelfHostedRunnerLabels[]];

type PermissionValue = "read" | "write" | "none";
export type Permissions =
  | {
      actions?: PermissionValue;
      checks?: PermissionValue;
      contents?: PermissionValue;
      deployments?: PermissionValue;
      "id-token"?: PermissionValue;
      issues?: PermissionValue;
      discussions?: PermissionValue;
      packages?: PermissionValue;
      pages?: PermissionValue;
      "pull-requests"?: PermissionValue;
      "repository-projects"?: PermissionValue;
      "security-events"?: PermissionValue;
      statuses?: PermissionValue;
    }
  | "read-all"
  | "write-all";

export interface Job<
  VersionT extends Record<string, string> = Record<string, string>
> {
  name: string;
  "runs-on": Runners;
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
    push?: BranchesTagsOrPaths;
    pull_request?: BranchesTagsOrPaths;
    schedule?: Schedule[];
    workflow_dispatch?: Record<string, never>;
  };
  permissions?: Permissions;
  env?: Record<string, string | boolean>;
  jobs: Record<string, Job<VersionT>>;
}
