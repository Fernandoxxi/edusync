import React, { useState } from "react";
import { useAuth, type UserRole } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface User {
  dni: string;
  password: string;
  role: Exclude<UserRole, null>;
  name: string;
}

// Usuarios simulados
const users: User[] = [
  { dni: "11111111", password: "11111111", role: "director", name: "Jose Ricardo" },
  { dni: "22222222", password: "22222222", role: "profesor", name: "Ana Maroa" },
  { dni: "33333333", password: "33333333", role: "estudiante", name: "Jorge Luis" },
  { dni: "44444444", password: "44444444", role: "padre", name: "Elias Jose" },
];

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.dni === dni && u.password === password
    );

    if (user) {
      login(user.role);
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-4">
      <div className="max-w-md w-full bg-gray-900/80 backdrop-blur-md rounded-xl shadow-xl p-8 md:p-10 text-white">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight">EduSync</h1>
          <p className="mt-2 text-gray-300">Bienvenido, inicia sesión para continuar</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          {error && (
            <p className="text-red-400 text-center font-medium">{error}</p>
          )}

          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-semibold">DNI</label>
            <input
              type="text"
              placeholder="Ingrese su DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-300 font-semibold">Contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          ©2025 Todos los derechos reservados. 
        </div>
      </div>
    </div>
  );
};

export default Login;
