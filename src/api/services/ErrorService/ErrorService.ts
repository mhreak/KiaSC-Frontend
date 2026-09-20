import { ErrorMapper } from "./ErrorMapper";
import { GlobalErrorHandler } from "./GlobalErrorHandler";

class ErrorService {

    handle(error:any) {

        const apiError = ErrorMapper.fromAxios(error);

        GlobalErrorHandler.handle(apiError);

        return apiError;

    }

}

export default new ErrorService();