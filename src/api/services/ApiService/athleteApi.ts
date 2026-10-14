import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
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

  //   add: (data?: ContractAdd) => {
  //     return client.post<APIGetTemplate<Contract>, ContractAdd>("", data);
  //   },

  //   edit: (params?: { data: ContractEdit; id: string }) => {
  //     return client.put<APIGetTemplate<Contract>, ContractEdit>(
  //       `/${params?.id}`,
  //       params?.data,
  //     );
  //   },
  //   delete: (params?: { id?: string }) => {
  //     return client.delete<APIGetTemplate<null>>(`/${params?.id}`);
  //   },
};
