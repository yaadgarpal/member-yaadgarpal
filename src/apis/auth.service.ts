import { apiRequest } from "../handler/apirequest";

export const AuthService = {
  async login(payload: { email: string; password: string }) {
    return await apiRequest.post("auth/login", payload);
  },
  async register(payload: { email: string; password: string }) {
    return await apiRequest.post("auth/register", payload);
  },
  async forgotPassword(payload: { email: string }) {
    return await apiRequest.post("auth/forgot-password", payload);
  },
  async getProfile() {
    return await apiRequest.get("member/auth/me");
  },
  async resetPassword(token: string, payload: { password: string }) {
    return await apiRequest.put(`auth/reset-password/${token}`, payload);
  },
  async profile() {
    return await apiRequest.get("auth/profile");
  },
  async getReferralHistory(page = 1, limit = 10) {
    const response = await apiRequest.get(
      `auth/wallet/history?page=${page}&limit=${limit}&type=REFERRAL_REWARD`,
    );

    return response;
  },
  async getOnlyWalletHistory(page = 1, limit = 10) {
    const response = await apiRequest.get(
      `auth/wallet/history?page=${page}&limit=${limit}&type=WALLET_CREDIT`,
    );

    return {
      ...response,
      data: {
        ...response.data,
      },
    };
  },
  async getAllWalletHistory(page = 1, limit = 100) {
    return await apiRequest.get(
      `auth/wallet/history?page=${page}&limit=${limit}`,
    );
  },
  async getBankAccounts() {
    return await apiRequest.get("auth/member-account");
  },

  async addBankAccount(payload: {
    name: string;
    account_no: string;
    ifsc: string;
    bank_name: string;
    branch_name: string;
    is_default: boolean;
  }) {
    return await apiRequest.post("auth/member-account", payload);
  },
  async getBankByIFSC(ifsc: string) {
    const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);

    return await response.json();
  },
  async updateBankAccount(
    id: string,
    payload: {
      name: string;
      account_no: string;
      ifsc: string;
      bank_name: string;
      branch_name: string;
      is_default: boolean;
    },
  ) {
    return await apiRequest.put(`auth/member-account/${id}`, payload);
  },

  async deleteBankAccount(id: string) {
    return await apiRequest.delete(`auth/member-account/${id}`);
  },

  async transferPoints(payload: { email: string; points: number }) {
    return await apiRequest.post("auth/wallet/points-transfer", payload);
  },
};
