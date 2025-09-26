import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiCalendar,
  FiAlertCircle,
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";

const DashboardLayout: React.FC = () => {
  const { userRole, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();


  const menuItems = {
    director: [   
      { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
      { name: "Gestión Usuarios", path: "/dashboard/gestion-usuarios", icon: <FiUsers /> },
      { name: "Control Académico", path: "/dashboard/control-academico", icon: <FiFileText /> },
      { name: "Reportes", path: "/dashboard/reportes", icon: <FiAlertCircle /> },
      { name: "Configuración", path: "/dashboard/configuracion", icon: <FiCalendar /> },
    ],
    profesor: [
      { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
      { name: "Mis Cursos", path: "/dashboard/cursos", icon: <FiFileText /> },
      { name: "Calificaciones", path: "/dashboard/calificaciones", icon: <FiFileText /> },
      { name: "Asistencia", path: "/dashboard/asistencia", icon: <FiCalendar /> },
      { name: "Comunicaciones", path: "/dashboard/comunicaciones", icon: <FiAlertCircle /> },
    ],
    tutor: [
      { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
      { name: "Seguimiento", path: "/dashboard/seguimiento", icon: <FiFileText /> },
      { name: "Intervenciones", path: "/dashboard/intervenciones", icon: <FiAlertCircle /> },
      { name: "Comunicaciones", path: "/dashboard/comunicaciones", icon: <FiUsers /> },
      { name: "Alertas", path: "/dashboard/alertas", icon: <FiAlertCircle /> },
    ],
    estudiante: [
      { name: "Mi Dashboard", path: "/dashboard", icon: <FiHome /> },
      { name: "Mis Tareas", path: "/dashboard/tareas", icon: <FiFileText /> },
      { name: "Calendario", path: "/dashboard/calendario", icon: <FiCalendar /> },
      { name: "Bienestar", path: "/dashboard/bienestar", icon: <FiAlertCircle /> },
      { name: "Mensajes", path: "/dashboard/mensajes", icon: <FiUsers /> },
    ],
    padre: [
      { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
      { name: "Rendimiento", path: "/dashboard/rendimiento", icon: <FiFileText /> },
      { name: "Alertas", path: "/dashboard/alertas", icon: <FiAlertCircle /> },
      { name: "Comunicaciones", path: "/dashboard/comunicaciones", icon: <FiUsers /> },
      { name: "Calendario", path: "/dashboard/calendario", icon: <FiCalendar /> },
    ],
  };

  const currentMenu = menuItems[userRole as keyof typeof menuItems] || [];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">

      {/* Overlay móvil */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50
        w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white
        transform transition-transform duration-300 ease-in-out
        flex flex-col justify-between
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        h-screen
      `}>
        {/* Header Sidebar */}
        <div className="p-5 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide">EduSync</h1>
              <span className="text-gray-300 text-sm uppercase font-medium">{userRole}</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-700 rounded transition-transform duration-200 hover:scale-110"
            >
              <FiX size={22} />
            </button>
          </div>
        </div>

        {/* Menú */}
        <nav className="flex-1 overflow-y-auto p-5">
          <div className="flex flex-col gap-3">
            {currentMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'hover:bg-gray-700 hover:scale-105 text-gray-200'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full p-3 bg-red-600 hover:bg-red-700 rounded-xl transition duration-300 font-semibold text-white shadow"
          >
            <FiLogOut />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header móvil */}
        <header className="lg:hidden bg-white shadow sticky top-0 z-30 border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition transform hover:scale-110"
            >
              <FiMenu size={24} className="text-gray-700" />
            </button>
            
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-800 tracking-wide">EduSync</h1>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
            
            <div className="w-10" /> {/* espacio balance */}
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 overflow-auto p-4 lg:p-6 bg-gray-100">
          <div className="max-w-7xl mx-auto min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
