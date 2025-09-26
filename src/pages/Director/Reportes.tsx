import React from "react";
import ChartCard from "../../components/ChartCard";

const Reportes: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reportes y Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Reporte Ejecutivo">
          <div className="flex items-center justify-center h-60 text-gray-400">[Reporte PDF/Excel]</div>
        </ChartCard>

        <ChartCard title="Dashboards Avanzados">
          <div className="flex items-center justify-center h-60 text-gray-400">[Gráficos interactivos]</div>
        </ChartCard>
      </div>

      <ChartCard title="Filtros y Tendencias">
        <div className="flex items-center justify-center h-60 text-gray-400">[Filtros por periodo, grado, materia]</div>
      </ChartCard>
    </div>
  );
};

export default Reportes;
