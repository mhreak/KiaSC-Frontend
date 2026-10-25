import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  PromoType,
  PromoTypeGetListParams,
} from "@/types/api/endpointTypes/promoType.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.promoType);

export const promoTypeApi = {
  getList: (params?: PromoTypeGetListParams) => {
    return client.get<APIGetTemplate<PromoType[]>>("/GetList", params);
  },
};
