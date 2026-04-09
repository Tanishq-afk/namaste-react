import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE } from "../src/utils/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem("token"),
    loading: true,
  });

  const clearAuth = () => {
    setAuth({
      user: null,
      token: null,
      loading: false,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (!auth.token) {
        clearAuth();
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/profile`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const data = await res.json();

        setAuth({
          user: data.user,
          token: auth.token,
          loading: false,
        });
      } catch {
        clearAuth();
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);

    setAuth({
      user: data.user,
      token: data.token,
      loading: false,
    });
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
    } catch {
      // Ignore network errors and clear local auth state.
    }

    localStorage.removeItem("token");
    clearAuth();
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
