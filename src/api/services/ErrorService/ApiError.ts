export type ApiErrorType =
  | "NETWORK"
  | "TIMEOUT"
  | "UNAUTHORIZED_401"
  | "FORBIDDEN_403"
  | "NOT_FOUND_404"
  | "CONFLICT_409"
  | "VALIDATION_400"
  | "SERVER_500"
  | "UNKNOWN";

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export default class ApiError extends Error {
  type: ApiErrorType;
  statusCode?: number;
  details?: ApiErrorDetail[];
  raw?: any;

  constructor(
    type: ApiErrorType,
    message: string,
    statusCode?: number,
    details?: ApiErrorDetail[],
    raw?: any
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
    this.raw = raw;
  }
}
