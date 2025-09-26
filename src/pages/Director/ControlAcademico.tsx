import React from "react";
import ChartCard from "../../components/ChartCard";

const ControlAcademico: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Control Académico</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Cursos y Materias">
          <div className="flex items-center justify-center h-full text-gray-400">[Tabla o gráfico de cursos]</div>
        </ChartCard>

        <ChartCard title="Asignación de Profesores">
          <div className="flex items-center justify-center h-full text-gray-400">[Tabla de asignaciones]</div>
        </ChartCard>
      </div>

      <ChartCard title="Analytics de Rendimiento">
        <div className="flex items-center justify-center h-60 text-gray-400">[Gráfico de rendimiento]</div>
      </ChartCard>

      <ChartCard title="Planificación Académica Anual">
        <div className="flex items-center justify-center h-60 text-gray-400">[Calendario académico]</div>
      </ChartCard>
    </div>
  );
};

export default ControlAcademico;
