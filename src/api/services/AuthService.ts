import HttpService from "@/api/services/HttpService";
import TokenService from "./TokenService";
import { API_CONFIG } from "@/config/apiConfig";

interface LoginDto {
  username: string;
  password: string;
}

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  };
}

interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    isProfileCompleted: boolean;
  };
}

class AuthService {
  async login(data: LoginDto): Promise<void> {
    const response = await HttpService.post<LoginResponse, LoginDto>(
      `${API_CONFIG.panel.admin}/auth/login`,
      data,
    );

    const { accessToken, refreshToken, expiresAt } = response.data;

    TokenService.setAccessToken(accessToken);
    TokenService.setRefreshToken(refreshToken);
    TokenService.setExpiresAt(expiresAt);
  }

  async refreshToken(): Promise<string> {
    const refreshToken = TokenService.getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await HttpService.post<
      RefreshTokenResponse,
      { refreshToken: string }
    >(`${API_CONFIG.panel.admin}/auth/refresh-token`, {
      refreshToken,
    });

    const {
      accessToken,
      refreshToken: newRefreshToken,
      expiresAt,
    } = response.data;

    TokenService.setAccessToken(accessToken);
    TokenService.setExpiresAt(expiresAt);

    if (newRefreshToken) {
      TokenService.setRefreshToken(newRefreshToken);
    }

    return accessToken;
  }

  async logout(): Promise<void> {
    TokenService.clearTokens();
  }
}

export default new AuthService();
