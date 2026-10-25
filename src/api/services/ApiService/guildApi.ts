import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  Guild,
  GuildGetListParams,
} from "@/types/api/endpointTypes/guild.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.guild);

export const guildApi = {
  getList: (params?: GuildGetListParams) => {
    return client.get<APIGetTemplate<Guild[]>>("/GetList", params);
  },
};
