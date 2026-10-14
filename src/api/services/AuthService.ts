import HttpService from "@/api/services/HttpService";
import TokenService from "./TokenService";
import {
  LoginDto,
  LoginResponse,
  RefreshTokenResponse,
} from "@/types/api/auth";

class AuthService {
  async login(data: LoginDto): Promise<void> {
    const response = await HttpService.post<LoginResponse, LoginDto>(
      `/auth/login`,
      data,
    );

    const { AccessToken, RefreshToken, AccessTokenExpiresAtUtc } = response;

    TokenService.setAccessToken(AccessToken);
    TokenService.setRefreshToken(RefreshToken);
    TokenService.setExpiresAt(AccessTokenExpiresAtUtc);
  }

  async refreshToken(): Promise<string> {
    const refreshToken = TokenService.getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await HttpService.post<
      RefreshTokenResponse,
      { refreshToken: string }
    >(`/auth/refresh`, {
      refreshToken,
    });

    const {
      AccessToken,
      RefreshToken: newRefreshToken,
      AccessTokenExpiresAtUtc,
    } = response;

    TokenService.setAccessToken(AccessToken);
    TokenService.setExpiresAt(AccessTokenExpiresAtUtc);

    if (newRefreshToken) {
      TokenService.setRefreshToken(newRefreshToken);
    }

    return AccessToken;
  }

  async logout(): Promise<void> {
    TokenService.clearTokens();
  }
}

export default new AuthService();
