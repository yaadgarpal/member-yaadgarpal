import { apiRequest } from "../handler/apirequest";

export const AuthService = {
    async login(payload: { email: string, password: string }) {

        return await apiRequest.post("auth/login", payload)
    },
    async register(payload: { email: string, password: string }) {

        return await apiRequest.post("auth/register", payload)
    }, 
}