import React from "react";

const DashboardProfesor: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Bienvenido Profesor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700">Mis Cursos</h3>
          <p className="text-gray-500 mt-2">Administra materias y seguimiento de estudiantes.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-gray-700">Registro de Asistencia</h3>
          <p className="text-gray-500 mt-2">Control diario de asistencia y alertas tempranas.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfesor;
