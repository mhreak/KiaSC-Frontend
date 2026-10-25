import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Discount,
  DiscountGetListParams,
} from "@/types/api/endpointTypes/discounts.types";

const client = new ApiClient(
  API_CONFIG.panel.admin + API_ENDPOINT.discountCode,
);

export const discountCodeApi = {
  getList: (params?: DiscountGetListParams) => {
    return client.get<APIGetTemplate<Discount[]>>("/GetList", params);
  },
};
