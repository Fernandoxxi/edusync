import React from "react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  value?: string;
  trend?: "up" | "down" | "stable";
  className?: string;
  actions?: React.ReactNode; // Nueva prop para acciones
  description?: string; // Nueva prop para descripción
  height?: string; // Hacer altura configurable
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  children, 
  value, 
  trend, 
  className = "", 
  actions,
  description,
  height = "h-80" // Valor por defecto
}) => {
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
      {/* Header con título, valor y acciones */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {value && (
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-700">{value}</span>
                {trend && (
                  <span className={`text-sm ${getTrendColor()}`}>
                    {getTrendIcon()}
                  </span>
                )}
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
        
        {/* Área de acciones */}
        {actions && (
          <div className="flex items-center gap-2 ml-4">
            {actions}
          </div>
        )}
      </div>

      {/* Contenido del gráfico/card */}
      <div className={`w-full ${height}`}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;