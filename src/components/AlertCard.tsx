import React from "react";
import { FiEye } from "react-icons/fi";

interface AlertCardProps {
  student: string;
  grade: string;
  issue: string;
  priority: "high" | "medium" | "low";
  onViewDetails?: () => void; // Callback opcional para abrir modal
}

const AlertCard: React.FC<AlertCardProps> = ({ student, grade, issue, priority, onViewDetails }) => {
  const color =
    priority === "high"
      ? "bg-red-50 border-red-200 text-red-800"
      : priority === "medium"
      ? "bg-yellow-50 border-yellow-200 text-yellow-800"
      : "bg-green-50 border-green-200 text-green-800";

  return (
    <div
      className={`flex justify-between items-center p-4 border rounded-xl ${color} transition hover:shadow-md`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`w-3 h-3 rounded-full ${
            priority === "high"
              ? "bg-red-500"
              : priority === "medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        ></span>
        <div className="flex flex-col">
          <p className="font-semibold text-sm">
            {student} - {grade}
          </p>
          <p className="text-xs text-gray-700 truncate">{issue}</p>
        </div>
      </div>
      {onViewDetails && (
        <button
          onClick={onViewDetails}
          className="text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Ver detalles"
        >
          {/* Texto visible en desktop, ícono en móvil */}
          <span className="hidden md:inline text-xs font-medium hover:underline">
            Ver detalles
          </span>
          {/* Ícono visible solo en móvil */}
          <FiEye className="md:hidden" size={18} />
        </button>
      )}
    </div>
  );
};

export default AlertCard;