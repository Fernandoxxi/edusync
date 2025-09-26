import React from "react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode; // Aquí se pueden poner gráficos con Recharts, Chart.js, etc.
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="w-full h-60">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
