import React from "react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  value?: string; // Hacer opcional para mantener compatibilidad
  trend?: "up" | "down" | "stable"; // Hacer opcional
  className?: string; // Hacer opcional
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, value, trend, className = "" }) => {
  const getTrendIcon = () => {
    if (trend === "up") return "🔼";
    if (trend === "down") return "🔽";
    if (trend === "stable") return "➡️";
    return null;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    if (trend === "stable") return "text-gray-600";
    return "text-gray-600";
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-5 border border-gray-100 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {value && (
          <div className="flex items-center gap-1">
            <span className="font-medium">{value}</span>
            {trend && (
              <span className={`text-sm ${getTrendColor()}`}>
                {getTrendIcon()}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="w-full h-60">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;