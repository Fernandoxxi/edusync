import React from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color?: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center border border-gray-100 transition hover:shadow-xl">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p className={`text-xs mt-1 font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} vs mes anterior
          </p>
        )}
      </div>
      <div className={`p-4 rounded-lg ${color || "bg-gray-100"} text-3xl flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
};

export default KPICard;
