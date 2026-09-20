import { useEffect } from "react";
import { errorBus } from "./ErrorBus";
import ApiError from "./ApiError";
// import { useNavigate } from "react-router-dom";

export default function AppErrorListener() {
  // const navigate = useNavigate();

  useEffect(() => {
    return errorBus.subscribe((error: ApiError) => {
      if (error.type === "UNAUTHORIZED_401") {
        // navigate("/login");
      }
    });
  }, []);

  return null;
}
