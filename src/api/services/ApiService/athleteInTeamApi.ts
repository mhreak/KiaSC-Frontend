import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  AthleteInTeam,
  AthleteInTeamGet,
  AthleteInTeamGetListParams,
} from "@/types/api/endpointTypes/athleteInTeam.types";

const client = new ApiClient(
  API_CONFIG.panel.admin + API_ENDPOINT.athleteInTeam,
);

export const athleteInTeamApi = {
  getList: (params?: AthleteInTeamGetListParams) => {
    return client.get<APIGetTemplate<AthleteInTeam[]>>("/GetList", params);
  },

  get: (params?: { id: number }) => {
    return client.get<AthleteInTeamGet>(`/Get/${params?.id}`);
  },

  add: (params?: { data: any; teamId?: number }) => {
    return client.post<APIAddTemplateResponse<number>, any>(
      `/Create/${params?.teamId}`,
      params?.data,
    );
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
