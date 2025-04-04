import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../base.service";

export const imageManagementApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "ImageApi",
  tagTypes: ["Image"],
  endpoints: (builder) => ({
    /**
     * Upload a photo with style type
     * @param formData - FormData containing image and styleType
     * @return Response with image URL
     */
    uploadPhoto: builder.mutation<
      {
        imageUrl: string;
      },
      FormData
    >({
      query: (formData) => ({
        url: "/upload-image",
        method: "POST",
        body: formData,
         
      }),
      invalidatesTags: ["Image"],
    }),
  }),
});

export const { useUploadPhotoMutation } = imageManagementApi;
