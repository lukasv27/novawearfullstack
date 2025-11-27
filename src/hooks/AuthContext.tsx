import { createContext, useContext, useState } from "react";
import type { Persona } from "@/api/types";
import * as AuthService from "@/api/service/AuthService";
import type { ReactNode } from "react";

interface AuthContextType {
  usuario: Persona | null;
  setUsuario: (usuario: Persona | null) => void;
  login: (email: string, password: string) => Promise<Persona>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Persona | null>(
    JSON.parse(localStorage.getItem("usuario") || "null")
  );

  const login = async (email: string, password: string) => {
    const persona = await AuthService.login({ email, password });

    setUsuario(persona);
    localStorage.setItem("usuario", JSON.stringify(persona));

    return persona;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("jwt");
  };

  const isAdmin = usuario?.rol === "ADMINISTRADOR";

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
