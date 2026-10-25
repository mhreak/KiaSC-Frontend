import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Place,
  PlaceGetListParams,
} from "@/types/api/endpointTypes/place.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.place);

export const placeApi = {
  getList: (params?: PlaceGetListParams) => {
    return client.get<APIGetTemplate<Place[]>>("/GetList", params);
  },
};
