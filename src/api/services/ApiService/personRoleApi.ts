import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  PersonRole,
  PersonRoleGetListParams,
} from "@/types/api/endpointTypes/personRole.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.personRole);

export const personRoleApi = {
  getList: (params?: PersonRoleGetListParams) => {
    return client.get<APIGetTemplate<PersonRole[]>>("/GetList", params);
  },
};
