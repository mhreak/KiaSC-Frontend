import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Sport,
  SportGet,
  SportGetListParams,
} from "@/types/api/endpointTypes/sport.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.sport);

export const sportApi = {
  getList: (params?: SportGetListParams) => {
    return client.get<APIGetTemplate<Sport[]>>("/GetList", params);
  },
  get: (params?: { id: number }) => {
    return client.get<SportGet>(`/Get/${params?.id}`);
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
};
