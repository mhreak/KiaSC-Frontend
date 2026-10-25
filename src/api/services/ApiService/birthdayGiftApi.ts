import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Birthday,
  BirthdayGetListParams,
  Gift,
  GiftGetListParams,
} from "@/types/api/endpointTypes/birthdays.types";

const client = new ApiClient(
  API_CONFIG.panel.admin + API_ENDPOINT.birthdayGift,
);

export const birthdayGiftApi = {
  getList: (params?: GiftGetListParams) => {
    return client.get<APIGetTemplate<Gift[]>>("/GetList", params);
  },
  getBirthdays: (params?: BirthdayGetListParams) => {
    return client.get<APIGetTemplate<Birthday[]>>("/Birthdays", params);
  },
};
