import React, { createContext, useState, useContext } from "react";

export type UserRole = "director" | "profesor" | "estudiante" | "padre" | null;

interface AuthContextType {
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode; // ReactNode compatible con TS
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const login = (role: UserRole) => setUserRole(role);
  const logout = () => setUserRole(null);

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
