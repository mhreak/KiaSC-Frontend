import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Shop,
  ShopGet,
  ShopGetListParams,
} from "@/types/api/endpointTypes/shop.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.shop);

export const shopApi = {
  getList: (params?: ShopGetListParams) => {
    return client.get<APIGetTemplate<Shop[]>>("/GetList", params);
  },
  get: (params?: { id: number }) => {
    return client.get<ShopGet>(`/Get/${params?.id}`);
  },

  add: (data?: any) => {
    return client.post<APIAddTemplateResponse<number>, any>("/Add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  edit: (params?: any) => {
    return client.put<APIAddTemplateResponse, any>(`/Edit`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
