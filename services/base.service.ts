import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

interface ErrorResponse {
  status?: number;
  data?: {
    errors?: Array<{ message: string }>;
    meta?: { message: string };
    message?: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://2f77-39-63-59-69.ngrok-free.app/api",
  prepareHeaders: async (headers) => {
    const token = "notoken";

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const error = result.error as ErrorResponse;
    let message = "Something went wrong. Please try again later.";
    let type: "normal" | "success" | "warning" | "danger" = "danger";

    switch (error.status) {
      case 500:
        message = "Internal server error";
        break;

      case 404:
        message = "Resource not found";
        type = "warning";
        break;

      case 400:
        message = error.data?.errors?.[0]?.message || message;
        break;

      case 422:
        message = error.data?.meta?.message || message;
        type = "warning";
        break;

      case 429:
        message = error.data?.message || "Too many requests";
        break;

      case 401:
        message =
          error.data?.meta?.message || "Session expired. Please login again";

        break;
    }
  }

  return result;
};
