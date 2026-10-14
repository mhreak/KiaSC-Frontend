export interface Task {
  id: string;
  name: string;
  status: "enabled" | "disabled";
  lastRuntime: string;
  lastRuntimeStatus: "success" | "failed";
}
