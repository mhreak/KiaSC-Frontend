import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  AgeGroup,
  AgeGroupGetListParams,
} from "@/types/api/endpointTypes/ageGroup.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.ageGroup);

export const ageGroupApi = {
  getList: (params?: AgeGroupGetListParams) => {
    return client.get<APIGetTemplate<AgeGroup[]>>("/GetList", params);
  },
};
