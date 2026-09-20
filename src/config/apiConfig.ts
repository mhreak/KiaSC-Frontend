import { ENV } from "./env";

export const API_CONFIG = {
  baseUrl: ENV.API_BASE_URL,
  prefix: "/api",
  version: "/v1",
  panel: {
    admin: "/admin",
    auth: "/auth",
    files: "/files",
    locations: "/locations",
  },

  get baseURL() {
    return `${this.baseUrl}${this.prefix}${this.version}`;
  },
};
