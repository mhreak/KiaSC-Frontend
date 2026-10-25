import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Athlete,
  AthleteGet,
  AthleteGetListParams,
} from "@/types/api/endpointTypes/athlete.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.athlete);

export const athleteApi = {
  getList: (params?: AthleteGetListParams) => {
    return client.get<APIGetTemplate<Athlete[]>>("/GetList", params);
  },

  get: (params?: { id: number }) => {
    return client.get<AthleteGet>(`/Get/${params?.id}`);
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
