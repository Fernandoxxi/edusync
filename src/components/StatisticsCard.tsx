import React from "react";

interface StatisticsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  change?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  change 
}) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className="text-xs text-gray-500 mt-1">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;