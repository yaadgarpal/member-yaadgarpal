import { apiRequest } from "../handler/apirequest";

export const AuthService = {
    async login(payload: { email: string, password: string }) {

        return await apiRequest.post("auth/login", payload)
    },
    async register(payload: { email: string, password: string }) {

        return await apiRequest.post("auth/register", payload)
    }, 
    async forgotPassword(payload: { email: string }) {

        return await apiRequest.post("auth/forgot-password", payload)
    },
    async getProfile() {
        return await apiRequest.get("member/auth/me");
    },
    async resetPassword(
        token: string,
        payload: { password: string }
        ) {
        return await apiRequest.put(
            `auth/reset-password/${token}`,
            payload
        );
    },
    async profile() {
        return await apiRequest.get("auth/profile");
    }
}