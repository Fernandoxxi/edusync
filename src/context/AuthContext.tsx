import React, { createContext, useState, useContext, useEffect } from "react";

export type UserRole = "director" | "profesor" | "estudiante" | "padre" | null;

interface AuthContextType {
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole;
    if (savedRole) setUserRole(savedRole);
    setLoading(false); // Termina la carga
  }, []);

  const login = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem("userRole", role || "");
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
