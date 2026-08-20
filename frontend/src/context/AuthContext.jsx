import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "@/services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const updateUser = (nextUser) => {
    localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
  };

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const me = await authService.getMe();

        if (cancelled) {
          return;
        }

        setToken(storedToken);
        setUser(me);
        localStorage.setItem("user", JSON.stringify(me));
      } catch (error) {
        if (cancelled) {
          return;
        }

        if (error.response?.status === 401) {
          logout();
          return;
        }

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
          } catch {
            logout();
          }
        } else {
          logout();
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onUnauthorized = () => {
      setToken(null);
      setUser(null);
    };

    window.addEventListener("auth:unauthorized", onUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", onUnauthorized);
    };
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setToken(response.token);
    setUser(response.user);

    return response.user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
