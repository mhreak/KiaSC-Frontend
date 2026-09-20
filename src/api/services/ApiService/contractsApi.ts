// import ApiClient from "@/api/ApiClient";
// import { API_ENDPOINT } from "@/constants/api/apiEndpoints";
// import { APIGetTemplate } from "@/types/api/commonApiTypes";
// import { API_CONFIG } from "@/config/apiConfig";
// import {
//   Contract,
//   ContractAdd,
//   ContractBoard,
//   ContractBoardParams,
//   ContractEdit,
//   ContractGetAllParams,
//   ContractMoveStepData,
// } from "@/types/api/endpointTypes/contract.types";

// const client = new ApiClient(
//   API_CONFIG.panel.admin + API_ENDPOINT.contracts.endpoint,
// );

// const contractApi = {
//   getAll: (params?: ContractGetAllParams) => {
//     return client.get<APIGetTemplate<Contract[]>>("", params);
//   },

//   get: (params?: { id: string }) => {
//     return client.get<APIGetTemplate<Contract>>(`/${params?.id}`);
//   },

//   add: (data?: ContractAdd) => {
//     return client.post<APIGetTemplate<Contract>, ContractAdd>("", data);
//   },

//   edit: (params?: { data: ContractEdit; id: string }) => {
//     return client.put<APIGetTemplate<Contract>, ContractEdit>(
//       `/${params?.id}`,
//       params?.data,
//     );
//   },
//   delete: (params?: { id?: string }) => {
//     return client.delete<APIGetTemplate<null>>(`/${params?.id}`);
//   },
//   getBoard: (params?: ContractBoardParams) => {
//     return client.get<APIGetTemplate<ContractBoard>>("/board", params);
//   },
//   moveStep: (params?: { data: ContractMoveStepData; id: string }) => {
//     return client.put<APIGetTemplate<Contract>, ContractMoveStepData>(
//       `/${params?.id}${API_ENDPOINT.contracts.actions.moveStep}`,
//       params?.data,
//     );
//   },
// };

// export default contractApi;
