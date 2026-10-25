import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  ShopProduct,
  ShopProductGetListParams,
} from "@/types/api/endpointTypes/shopProduct";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.shopProduct);

export const shopProductApi = {
  getList: (params?: ShopProductGetListParams) => {
    return client.get<APIGetTemplate<ShopProduct[]>>("/GetList", params);
  },
};
