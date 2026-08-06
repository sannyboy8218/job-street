import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import * as authService from "@/services/auth.service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (token) {
    try {
      const decoded = jwtDecode(token);

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser({
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
        });
      }
    } catch (error) {
      console.error("Invalid token:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setToken(null);
      setUser(null);
    }
  }

  setLoading(false);
}, [token]);

const login = async (credentials) => {
  const response = await authService.login(credentials);

  localStorage.setItem("token", response.token);

  // Save the whole user object
  localStorage.setItem(
    "user",
    JSON.stringify(response.user)
  );

  setToken(response.token);
  setUser(response.user);

  return response.user;
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}