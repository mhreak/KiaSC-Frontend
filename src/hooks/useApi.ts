import { useState, useCallback } from "react";
import ApiError from "@/api/services/ErrorService/ApiError";

export function useApi<TResponse, TParams = void>(
  apiCall: (params?: TParams) => Promise<TResponse>,
  options?: {
    onError?: (error: ApiError) => void;
    onSuccess?: (response: TResponse, payload?: TParams) => void;
    onDone?: (payload?: TParams) => void;
  },
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(
    async (params?: TParams) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiCall(params);
        setData(result);

        options?.onSuccess?.(result, params);

        return result;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        options?.onError?.(apiError);
        throw apiError;
      } finally {
        setIsLoading(false);
        options?.onDone?.(params);
      }
    },
    [apiCall, options],
  );

  return {
    isLoading,
    data,
    setData,
    error,
    execute,
  };
}
