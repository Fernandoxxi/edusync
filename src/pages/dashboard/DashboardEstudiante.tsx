import React from "react";

const DashboardEstudiante: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Bienvenido Estudiante</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700">Mis Tareas</h3>
          <p className="text-gray-500 mt-2">Visualiza tus actividades pendientes y fechas límite.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700">Bienestar Emocional</h3>
          <p className="text-gray-500 mt-2">Registra tu estado emocional diario y solicita ayuda.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardEstudiante;
