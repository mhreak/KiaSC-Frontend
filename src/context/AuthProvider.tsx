"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { User } from "@/types/api/auth";

import AuthService from "@/api/services/AuthService";
import TokenService from "@/api/services/TokenService";

interface LoginDto {
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;

  isAuthenticated: boolean;
  isLoading: boolean;

  login: (data: LoginDto) => Promise<void>;
  logout: () => Promise<void>;

  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    try {
      const accessToken = TokenService.getAccessToken();

      const refreshToken = TokenService.getRefreshToken();

      // هیچ Tokenای وجود ندارد
      if (!accessToken && !refreshToken) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Access Token معتبر است
      if (accessToken && !TokenService.isExpired()) {
        setIsAuthenticated(true);
        return;
      }

      // Access Token وجود دارد ولی منقضی شده
      if (refreshToken) {
        await AuthService.refreshToken();

        setIsAuthenticated(true);
        return;
      }

      // نه Access Token معتبر داریم
      // نه Refresh Token
      TokenService.clearTokens();

      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Auth initialization failed:", error);

      TokenService.clearTokens();

      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(data: LoginDto) {
    await AuthService.login(data);

    setIsAuthenticated(true);
  }

  async function logout() {
    try {
      await AuthService.logout();
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  }

  async function refreshUser() {
    // فعلاً API مربوط به User نداریم.
    //
    // بعداً مثلاً:
    //
    // const user = await AuthService.getCurrentUser();
    // setUser(user);

    if (!TokenService.hasValidAccessToken()) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,

      login,
      logout,

      setUser,
      refreshUser,
    }),
    [user, isAuthenticated, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
