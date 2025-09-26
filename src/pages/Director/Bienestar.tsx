import React from "react";
import ChartCard from "../../components/ChartCard";
import AlertCard from "../../components/AlertCard";

const Bienestar: React.FC = () => {
  const alerts = [
    { id: 1, student: "Ana Torres", grade: "10mo A", issue: "Estrés alto", priority: "high" as const },
    { id: 2, student: "Carlos Ruiz", grade: "8vo B", issue: "Bajo ánimo", priority: "medium" as const },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Monitoreo de Bienestar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Índices de Bienestar General">
          <div className="flex items-center justify-center h-60 text-gray-400">[Gráfico de bienestar]</div>
        </ChartCard>

        <ChartCard title="Tendencias Emocionales por Grado/Curso">
          <div className="flex items-center justify-center h-60 text-gray-400">[Gráfico tendencias emocionales]</div>
        </ChartCard>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertas de Bienestar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} {...alert} />
          ))}
        </div>
      </div>

      <ChartCard title="Métricas de Intervenciones">
        <div className="flex items-center justify-center h-60 text-gray-400">[Gráfico de intervenciones]</div>
      </ChartCard>
    </div>
  );
};

export default Bienestar;
