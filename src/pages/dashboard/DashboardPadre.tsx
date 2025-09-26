import React from "react";

const DashboardPadre: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Bienvenido Padre / Tutor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700">Rendimiento Académico</h3>
          <p className="text-gray-500 mt-2">Visualiza notas, asistencia y observaciones de tus hijos.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700">Alertas y Mensajes</h3>
          <p className="text-gray-500 mt-2">Recibe notificaciones importantes y comunica con la escuela.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPadre;
