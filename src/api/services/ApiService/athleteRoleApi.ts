import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  AthleteRole,
  AthleteRoleGetListParams,
} from "@/types/api/endpointTypes/athleteRole.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.athleteRole);

export const athleteRoleApi = {
  getList: (params?: AthleteRoleGetListParams) => {
    return client.get<APIGetTemplate<AthleteRole[]>>("/GetList", params);
  },
};
