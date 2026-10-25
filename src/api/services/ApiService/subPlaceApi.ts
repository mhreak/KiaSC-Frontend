import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  SubPlace,
  SubPlaceGetListParams,
} from "@/types/api/endpointTypes/subPlace.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.subPlace);

export const subPlaceApi = {
  getList: (params?: SubPlaceGetListParams) => {
    return client.get<APIGetTemplate<SubPlace[]>>("/GetList", params);
  },
};
