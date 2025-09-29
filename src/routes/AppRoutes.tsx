import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Login from "../pages/Login";
import DashboardDirector from "../pages/Director/DashboardDirector";
import GestionUsuarios from "../pages/Director/GestionUsuarios";
import ControlAcademico from "../pages/Director/ControlAcademico";
import Reportes from "../pages/Director/Reportes";
import Configuracion from "../pages/Director/Configuracion";
import Bienestar from "../pages/Director/Bienestar";

import DashboardProfesor from "../pages/Profesor/DashboardProfesor";
import DashboardEstudiante from "../pages/Estudiante/DashboardEstudiante";
import DashboardPadre from "../pages/Padre/DashboardPadre";
import MisTareas from "../pages/Estudiante/tareas";
import Calendario from "../pages/Estudiante/calendario"
import MiBienestar from "../pages/Estudiante/mibienestar"
import Mensajes from "../pages/Estudiante/mensajes"
import Rendimiento from "../pages/Estudiante/rendimiento"

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[]; // roles permitidos
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { userRole, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Cargando...
      </div>
    );

  // Si no hay sesión
  if (!userRole) return <Navigate to="/" replace />;

  // Si hay restricción de roles y el usuario no pertenece
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Principal (depende del rol) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                {userRole === "director" && <DashboardDirector />}
                {userRole === "profesor" && <DashboardProfesor />}
                {userRole === "estudiante" && <DashboardEstudiante />}
                {userRole === "padre" && <DashboardPadre />}
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* === Rutas de DIRECTOR === */}
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute roles={["director"]}>
              <DashboardLayout>
                <GestionUsuarios />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/academico"
          element={
            <ProtectedRoute roles={["director"]}>
              <DashboardLayout>
                <ControlAcademico />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reportes"
          element={
            <ProtectedRoute roles={["director"]}>
              <DashboardLayout>
                <Reportes />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/configuracion"
          element={
            <ProtectedRoute roles={["director"]}>
              <DashboardLayout>
                <Configuracion />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bienestar"
          element={
            <ProtectedRoute roles={["director"]}>
              <DashboardLayout>
                <Bienestar />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* === Rutas de ESTUDIANTE === */}
        <Route
          path="/tareas"
          element={
            <ProtectedRoute roles={["estudiante"]}>
              <DashboardLayout>
                <MisTareas />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendario"
          element={
            <ProtectedRoute roles={["estudiante"]}>
              <DashboardLayout>
                <Calendario />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mi-bienestar"
          element={
            <ProtectedRoute roles={["estudiante"]}>
              <DashboardLayout>
                <MiBienestar />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mensajes"
          element={
            <ProtectedRoute roles={["estudiante"]}>
              <DashboardLayout>
                <Mensajes />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/rendimiento"
          element={
            <ProtectedRoute roles={["estudiante"]}>
              <DashboardLayout>
                <Rendimiento />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirigir cualquier ruta desconocida al login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
