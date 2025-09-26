import React, { useState } from "react";
import { FiUsers, FiTrendingUp, FiAlertTriangle, FiSearch, FiAward } from "react-icons/fi";
import KPICard from "../../components/KPICard";
import AlertCard from "../../components/AlertCard";

interface AlertData {
  estudiante: string;
  grado: string;
  seccion: string;
  materia: string;
  problema: string;
  prioridad: "high" | "medium" | "low";
  fecha: string; // "YYYY-MM-DD"
}

const DashboardDirector: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'semana' | 'mes' | 'trimestre'>('mes');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);

  // KPIs
  const kpisData = [
    { title: "Total Estudiantes", value: "684", change: "+18", icon: <FiUsers />, color: "bg-blue-100 text-blue-600" },
    { title: "Tasa Asistencia", value: "92.7%", change: "+1.5%", icon: <FiTrendingUp />, color: "bg-green-100 text-green-600" },
    { title: "Alertas Activas", value: "8", change: "-2", icon: <FiAlertTriangle />, color: "bg-red-100 text-red-600" },
    { title: "Promedio General", value: "78.5/100", icon: <FiAward />, color: "bg-purple-100 text-purple-600" }
  ];

  // Alertas
  const alertasData: AlertData[] = [
    { estudiante: "Antoni Rodriguez", grado: "3ro", seccion: "A", materia: "Matemáticas", problema: "Bajas calificaciones en los ultimos examenes", prioridad: "high", fecha: "2025-09-21" },
    { estudiante: "Fernando Manrique", grado: "5to", seccion: "C", materia: "Ciencias", problema: "Baja participación en laboratorios", prioridad: "medium", fecha: "2025-09-15" },
    { estudiante: "Jesus Palomino", grado: "2do", seccion: "B", materia: "Lenguaje", problema: "Dificultades en comprensión lectora", prioridad: "medium", fecha: "2025-09-10" },
    { estudiante: "Ricardo Mendoza", grado: "4to", seccion: "D", materia: "Inglés", problema: "Asistencia irregular", prioridad: "low", fecha: "2025-08-28" }
  ];

  // Filtrar alertas por búsqueda y período
  const filteredAlerts = alertasData.filter(alerta => {
    const alertaDate = new Date(alerta.fecha);
    const today = new Date();

    const matchesSearch =
      alerta.grado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alerta.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alerta.seccion.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (timeRange === 'semana') {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);
      return alertaDate >= weekAgo;
    } else if (timeRange === 'mes') {
      return alertaDate.getMonth() === today.getMonth() && alertaDate.getFullYear() === today.getFullYear();
    } else if (timeRange === 'trimestre') {
      const month = today.getMonth();
      const quarterStartMonth = month - (month % 3);
      return alertaDate.getMonth() >= quarterStartMonth && alertaDate.getMonth() <= quarterStartMonth + 2 && alertaDate.getFullYear() === today.getFullYear();
    }

    return true;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  // Modal para ver detalles de alerta
  const AlertModal: React.FC<{ alerta: AlertData; onClose: () => void }> = ({ alerta, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold">×</button>
        <h2 className="text-xl font-semibold mb-4">Detalles de la alerta</h2>
        <p><strong>Estudiante:</strong> {alerta.estudiante}</p>
        <p><strong>Grado:</strong> {alerta.grado}</p>
        <p><strong>Sección:</strong> {alerta.seccion}</p>
        <p><strong>Materia:</strong> {alerta.materia}</p>
        <p><strong>Problema:</strong> {alerta.problema}</p>
        <p><strong>Prioridad:</strong> {alerta.prioridad}</p>
        <p><strong>Fecha:</strong> {alerta.fecha}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard - Nivel Secundaria</h1>
          <p className="text-gray-600 mt-1">
            Resumen académico - {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {kpisData.map((kpi, index) => (
          <KPICard key={index} title={kpi.title} value={kpi.value} change={kpi.change} icon={kpi.icon} color={kpi.color} />
        ))}
      </div>

      {/* Alertas */}
      <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Alertas Académicas</h3>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Buscar grado o materia" value={searchTerm} onChange={handleSearch} className="pl-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="relative">
              <select value={timeRange} onChange={(e) => setTimeRange(e.target.value as any)} className="bg-white border border-gray-300 rounded-lg px-2 py-2 text-sm">
                <option value="semana">Esta semana</option>
                <option value="mes">Este mes</option>
                <option value="trimestre">Este trimestre</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No se encontraron alertas en este período.</p>
          ) : (
            filteredAlerts.map((alerta, index) => (
              <AlertCard
                key={index}
                student={alerta.estudiante}
                grade={alerta.materia}
                issue={alerta.problema}
                priority={alerta.prioridad}
                onViewDetails={() => setSelectedAlert(alerta)}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedAlert && (
        <AlertModal alerta={selectedAlert} onClose={() => setSelectedAlert(null)} />
      )}
    </div>
  );
};

export default DashboardDirector;
