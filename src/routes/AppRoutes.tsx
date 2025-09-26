import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Login from "../pages/Login";
import DashboardDirector from "../pages/dashboard/DashboardDirector";
import DashboardProfesor from "../pages/dashboard/DashboardProfesor";
import DashboardEstudiante from "../pages/dashboard/DashboardEstudiante";
import DashboardPadre from "../pages/dashboard/DashboardPadre";
import GestionUsuarios from "../pages/dashboard/gestionusuarios";
import MisTareas from "../pages/dashboard/mistareas";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userRole, loading } = useAuth();

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

  return <>{userRole ? children : <Navigate to="/" replace />}</>;
};


const AppRoutes: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <>
                {userRole === "director" && <DashboardDirector />}
                {userRole === "profesor" && <DashboardProfesor />}
                {userRole === "estudiante" && <DashboardEstudiante />}
                {userRole === "padre" && <DashboardPadre />}
              </>
            }
          />
          <Route path="gestion-usuarios" element={<GestionUsuarios />} />
          <Route path="mistareas" element={<MisTareas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
