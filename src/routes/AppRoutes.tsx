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
import MisTareas from "../pages/Estudiante/mistareas";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userRole, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Cargando...
      </div>
    );

  return <>{userRole ? children : <Navigate to="/" replace />}</>;
};

const AppRoutes: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Principal */}
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

        {/* Rutas Planas de Director */}
        <Route
          path="/gestion-usuarios"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <GestionUsuarios />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/academico"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ControlAcademico />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reportes"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Reportes />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/configuracion"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Configuracion />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bienestar"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Bienestar />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Rutas adicionales */}
        <Route
          path="/mistareas"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MisTareas />
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
