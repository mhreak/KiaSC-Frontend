import ApiClient from "@/api/ApiClient";
import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { API_CONFIG } from "@/config/apiConfig";
import {
  FileType,
  FileTypeGetListParams,
} from "@/types/api/endpointTypes/fileType.types";

const client = new ApiClient(API_CONFIG.panel.admin + API_ENDPOINT.fileType);

export const fileTypeApi = {
  getList: (params?: FileTypeGetListParams) => {
    return client.get<APIGetTemplate<FileType[]>>("/GetList", params);
  },
};
