import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  CourseClasseGetListParams,
  CourseClass,
  CourseClassGet,
} from "@/types/api/endpointTypes/courseClasses.types";

const client = new ApiClient(
  API_CONFIG.panel.admin + API_ENDPOINT.courseClasses,
);

export const courseClassesApi = {
  getList: (params?: CourseClasseGetListParams) => {
    return client.get<APIGetTemplate<CourseClass[]>>("/GetList", params);
  },

  get: (params?: { id: number }) => {
    return client.get<CourseClassGet>(`/Get/${params?.id}`);
  },

  add: (data?: any) => {
    return client.post<APIAddTemplateResponse<number>, any>("/Add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  edit: (params?: any) => {
    return client.put<APIAddTemplateResponse, any>(`/Edit`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  //   delete: (params?: { id?: string }) => {
  //     return client.delete<APIGetTemplate<null>>(`/${params?.id}`);
  //   },
};
