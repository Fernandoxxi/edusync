import React from "react";

const Configuracion: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-2">General</h2>
          <p className="text-sm text-gray-600">Configuración general de la plataforma.</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-2">Notificaciones y Alertas</h2>
          <p className="text-sm text-gray-600">Administrar mensajes y alertas del sistema.</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-2">Roles y Permisos</h2>
          <p className="text-sm text-gray-600">Gestionar permisos de cada tipo de usuario.</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="font-semibold text-gray-900 mb-2">Seguridad</h2>
          <p className="text-sm text-gray-600">Configurar seguridad y privacidad de la plataforma.</p>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
