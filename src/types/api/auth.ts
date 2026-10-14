export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  roles: string[];
  token?: string;
}

export interface LoginDto {
  UserName: string;
  Password: string;
}

export interface LoginResponse {
  AccessToken: string;
  RefreshToken: string;
  AccessTokenExpiresAtUtc: string;
  Roles: [];
}

export interface RefreshTokenResponse {
  AccessToken: string;
  RefreshToken: string;
  AccessTokenExpiresAtUtc: string;
  Roles: [];
}
