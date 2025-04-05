// services/apis/imageManagement.api.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../base.service";

export const imageManagementApi = createApi({
  reducerPath: "imageApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Image"],
  endpoints: (builder) => ({
    /**
     * Upload a photo for processing
     * @param formData - FormData with image and styleType
     * @returns jobId and message
     */
    uploadPhoto: builder.mutation<
      { jobId: number | string; message: string },
      FormData
    >({
      query: (formData) => ({
        url: "/upload-image",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Image"],
    }),

    /**
     * Get processing status by jobId
     * @param jobId - Job ID returned after upload
     */
    getJobStatus: builder.query<{ status: string; resultUrl?: string }, number>(
      {
        query: (jobId) => `/status/${jobId}`,
        providesTags: ["Image"],
      }
    ),
  }),
});

export const { useUploadPhotoMutation, useGetJobStatusQuery } =
  imageManagementApi;
