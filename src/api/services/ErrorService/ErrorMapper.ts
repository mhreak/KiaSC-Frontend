import { AxiosError } from "axios";

import { errorMessages } from "./ErrorMessages";
import ApiError from "./ApiError";
import { APIGlobalErrorResponse } from "@/types/api/commonApiTypes";

const handleApiErrorMessage = (
  data: APIGlobalErrorResponse<any>,
): string | undefined => {
  let dataError: string | undefined = undefined;

  if (typeof data?.message === "string") dataError = data?.message;

  return dataError;
};

export class ErrorMapper {
  static fromAxios(error: AxiosError<APIGlobalErrorResponse>): ApiError {
    if (!error.response) {
      return new ApiError("NETWORK", errorMessages.NETWORK);
    }

    const { status, data } = error.response;

    const dataError: string | undefined = handleApiErrorMessage(data);

    console.log(dataError, status, data, error);

    if (status === 401) {
      // 401
      return new ApiError(
        "UNAUTHORIZED_401",
        dataError || errorMessages.UNAUTHORIZED_401,
        401,
        undefined,
        data,
      );
    }

    // 403
    if (status === 403) {
      return new ApiError(
        "FORBIDDEN_403",
        dataError || errorMessages.FORBIDDEN_403,
        403,
        undefined,
        data,
      );
    }

    // 404
    if (status === 404) {
      return new ApiError(
        "NOT_FOUND_404",
        dataError || errorMessages.NOT_FOUND_404,
        404,
        undefined,
        data,
      );
    }
    // 409
    if (status === 409) {
      return new ApiError(
        "CONFLICT_409",
        dataError || errorMessages.CONFLICT_409,
        409,
        [],
        data,
      );
    }

    //✅ Validation (ASP.NET ModelState)
    if (status === 400) {
      return new ApiError(
        "VALIDATION_400",
        dataError || errorMessages.VALIDATION_400,
        400,
        undefined,
        data,
      );
    }

    // 500+
    if (status >= 500) {
      return new ApiError(
        "SERVER_500",
        dataError || errorMessages.SERVER_500,
        status,
        undefined,
        data,
      );
    }

    // fallback
    return new ApiError(
      "UNKNOWN",
      dataError || errorMessages.UNKNOWN,
      status,
      undefined,
      data,
    );
  }
}
