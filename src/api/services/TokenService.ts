class TokenService {
  private readonly ACCESS_TOKEN_KEY = "access_token";
  private readonly REFRESH_TOKEN_KEY = "refresh_token";
  private readonly EXPIRES_AT_KEY = "expires_at";

  getAccessToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getExpiresAt(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(this.EXPIRES_AT_KEY);
  }

  setAccessToken(token: string): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  setRefreshToken(token: string): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  setExpiresAt(expiresAt: string): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(this.EXPIRES_AT_KEY, expiresAt);
  }

  removeAccessToken(): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  removeRefreshToken(): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  removeExpiresAt(): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(this.EXPIRES_AT_KEY);
  }

  clearTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeExpiresAt();
  }

  isExpired(): boolean {
    const expiresAt = this.getExpiresAt();

    if (!expiresAt) {
      return true;
    }

    const expirationTime = new Date(expiresAt).getTime();

    if (Number.isNaN(expirationTime)) {
      return true;
    }

    return Date.now() >= expirationTime;
  }

  hasValidAccessToken(): boolean {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return false;
    }

    return !this.isExpired();
  }
}

export default new TokenService();
