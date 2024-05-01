import request from "../config";
import { Request } from "@auth-interface";

const auth: Request = {
    sign_up: (data) => request.post("/auth/register", data),
    sign_in: (data) => request.post("/auth/login", data),
    auth_verify: (data) => request.post("/auth/verify", data),
}

export default auth