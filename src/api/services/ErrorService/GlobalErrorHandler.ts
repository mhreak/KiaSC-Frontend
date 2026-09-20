import ApiError from "./ApiError";
import { toast } from "@/lib/toast/toast";

export class GlobalErrorHandler {
  static handle(error: ApiError) {
    // خطاهای موردنظر را می‌توانی فیلتر کنی
    // if (
    //   error.type === "NOT_FOUND_404" ||
    //   error.type === "SERVER_500"
    // ) {
    //   return;
    // }

    toast.error(error.message);
  }
}
