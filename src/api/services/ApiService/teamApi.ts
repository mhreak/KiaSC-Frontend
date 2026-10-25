import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Team,
  TeamGet,
  TeamGetListParams,
} from "@/types/api/endpointTypes/team.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.team);

export const teamApi = {
  getList: (params?: TeamGetListParams) => {
    return client.get<APIGetTemplate<Team[]>>("/GetList", params);
  },
  get: (params?: { id: number }) => {
    return client.get<TeamGet>(`/Get/${params?.id}`);
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
