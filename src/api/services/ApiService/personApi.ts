import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Person,
  PersonGetListParams,
} from "@/types/api/endpointTypes/person.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.person);

export const personApi = {
  getList: (params?: PersonGetListParams) => {
    return client.get<APIGetTemplate<Person[]>>("/GetList", params);
  },
};
