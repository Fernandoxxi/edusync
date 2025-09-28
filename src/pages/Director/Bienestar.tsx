import React, { useState } from "react";
import { 
  FiHeart, FiTrendingUp, FiAlertTriangle,
  FiTarget, FiEye, FiDownload, FiUsers,
  FiSmile, FiFrown, FiMeh, FiX, FiClock, FiArrowRight, FiCheck
} from "react-icons/fi";
import ChartCard from "../../components/ChartCard";

// Componente de Gráfico de Bienestar CORREGIDO
const WellnessChart: React.FC<{ data: number[]; labels: string[]; color?: string }> = ({ 
  data, 
  labels, 
  color = "#ef4444" 
}) => {
  const maxValue = 100; // Siempre 100% porque son porcentajes

  return (
    <div className="w-full h-full p-4">
      <div className="flex items-end justify-between h-48 gap-3 px-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1 h-full">
            <div className="flex flex-col justify-end h-full w-full relative">
              <div 
                className="w-full rounded-t-lg transition-all hover:opacity-90 relative group"
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  backgroundColor: color,
                  minHeight: '8px'
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                  {value}%
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-600 mt-2 text-center font-medium truncate w-full">
              {labels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente de Gráfico de Emociones
const EmotionChart: React.FC<{ data: { positive: number; neutral: number; negative: number } }> = ({ data }) => {
  const total = data.positive + data.neutral + data.negative;
  
  return (
    <div className="w-full h-full">
      <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
        <div 
          className="bg-green-500 h-4 absolute left-0"
          style={{ width: `${(data.positive / total) * 100}%` }}
        ></div>
        <div 
          className="bg-yellow-500 h-4 absolute"
          style={{ 
            width: `${(data.neutral / total) * 100}%`,
            left: `${(data.positive / total) * 100}%`
          }}
        ></div>
        <div 
          className="bg-red-500 h-4 absolute"
          style={{ 
            width: `${(data.negative / total) * 100}%`,
            left: `${((data.positive + data.neutral) / total) * 100}%`
          }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-2">
        <span>Positivo: {data.positive}%</span>
        <span>Neutral: {data.neutral}%</span>
        <span>Negativo: {data.negative}%</span>
      </div>
    </div>
  );
};

// Definir tipo para las alertas
type AlertType = {
  id: number;
  student: string;
  grade: string;
  issue: string;
  priority: "high" | "medium";
  trend: string;
  date: string;
  description: string;
  actions: string[];
  status: "active" | "resolved";
};

const Bienestar: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");
  const [selectedAlert, setSelectedAlert] = useState<AlertType | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<AlertType[]>([
    { 
      id: 1, 
      student: "Ana Torres", 
      grade: "10mo A", 
      issue: "Estrés académico elevado", 
      priority: "high",
      trend: "Aumento del 25% en reportes de ansiedad",
      date: "2024-03-15",
      description: "La estudiante ha mostrado signos de ansiedad persistente durante evaluaciones y ha solicitado apoyo psicológico en 3 ocasiones este mes.",
      actions: ["Sesión de acompañamiento psicológico", "Adaptación de carga académica", "Seguimiento semanal"],
      status: "active"
    },
    { 
      id: 2, 
      student: "Carlos Ruiz", 
      grade: "8vo B", 
      issue: "Bajo ánimo persistente", 
      priority: "medium",
      trend: "3 semanas con estado emocional bajo",
      date: "2024-03-14",
      description: "Disminución en participación en actividades grupales y cambios notorios en el comportamiento social.",
      actions: ["Entrevista con familia", "Inclusión en taller de habilidades sociales", "Monitoreo diario"],
      status: "active"
    },
    { 
      id: 3, 
      student: "María González", 
      grade: "11mo C", 
      issue: "Aislamiento social", 
      priority: "high",
      trend: "Disminución en participación grupal",
      date: "2024-03-13",
      description: "La estudiante ha evitado contacto con compañeros durante 2 semanas y muestra resistencia a actividades colaborativas.",
      actions: ["Evaluación psicológica completa", "Plan de inclusión progresiva", "Coordinación con tutores"],
      status: "active"
    },
    { 
      id: 4, 
      student: "Grupo 9no A", 
      grade: "9no A", 
      issue: "Clima grupal tenso", 
      priority: "medium",
      trend: "Incremento en conflictos entre pares",
      date: "2024-03-12",
      description: "Se han reportado múltiples incidentes de conflicto entre estudiantes del grupo durante la última semana.",
      actions: ["Taller de resolución de conflictos", "Reunión con representantes", "Actividades de integración"],
      status: "active"
    }
  ]);

  // Datos de bienestar general
  const wellnessData = {
    week: [65, 72, 78, 82, 75, 85, 80],
    month: [72, 80, 84, 90],
    quarter: [65, 68, 72, 75, 80, 78, 82, 85, 79, 83, 87, 85]
  };

  const wellnessLabels = {
    week: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    month: ["Sem1", "Sem2", "Sem3", "Sem4"],
    quarter: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  };

  // Datos de tendencias emocionales por grado
  const emotionalTrends = [
    { grade: "1ro", positive: 65, neutral: 25, negative: 10, students: 45, trend: "stable" },
    { grade: "2do", positive: 72, neutral: 20, negative: 8, students: 42, trend: "up" },
    { grade: "3ro", positive: 58, neutral: 30, negative: 12, students: 38, trend: "down" },
    { grade: "4to", positive: 80, neutral: 15, negative: 5, students: 40, trend: "up" },
    { grade: "5to", positive: 75, neutral: 18, negative: 7, students: 44, trend: "stable" }
  ];

  // Métricas de uso del módulo
  const usageMetrics = {
    activeStudents: 1250,
    weeklySessions: 345,
    completionRate: 78,
    mostUsedFeature: "Diario Emocional"
  };

  // Métricas de intervenciones
  const interventionMetrics = [
    { type: "Acompañamiento", count: 45, successRate: 85 },
    { type: "Orientación", count: 32, successRate: 78 },
    { type: "Derivación", count: 12, successRate: 92 },
    { type: "Talleres", count: 28, successRate: 88 }
  ];

  // Función para marcar alerta como resuelta
  const markAlertAsResolved = (alertId: number) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: "resolved" }
          : alert
      )
    );
    setSelectedAlert(null);
    
    alert(`Alerta #${alertId} marcada como resuelta exitosamente`);
  };

  // Función para reactivar una alerta
  const reactivateAlert = (alertId: number) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: "active" }
          : alert
      )
    );
  };

  const exportWellnessReport = () => {
    const activeAlerts = alerts.filter(alert => alert.status === "active");
    
    const reportData = {
      periodo: timeRange,
      indiceBienestarGeneral: wellnessData[timeRange].reduce((a, b) => a + b, 0) / wellnessData[timeRange].length,
      tendenciasEmocionales: emotionalTrends,
      alertasActivas: activeAlerts.length,
      alertasResueltas: alerts.filter(alert => alert.status === "resolved").length,
      metricasUso: usageMetrics,
      intervenciones: interventionMetrics
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte-bienestar-${timeRange}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Modal de Detalles de Alerta ACTUALIZADO
  const AlertDetailModal: React.FC<{ alert: AlertType; onClose: () => void }> = ({ alert, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {alert.status === "resolved" ? "✅ " : ""}Detalles de Alerta
            </h2>
            <p className="text-sm text-gray-600">
              {alert.status === "resolved" ? "Caso resuelto" : "Información completa del caso"}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Estudiante/Grupo</label>
              <p className="mt-1 text-sm text-gray-900">{alert.student}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Grado</label>
              <p className="mt-1 text-sm text-gray-900">{alert.grade}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Problema Identificado</label>
            <p className="mt-1 text-sm text-gray-900">{alert.issue}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción Detallada</label>
            <p className="mt-1 text-sm text-gray-600">{alert.description}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tendencia</label>
            <p className="mt-1 text-sm text-gray-600">{alert.trend}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Acciones Recomendadas</label>
            <ul className="mt-2 space-y-1">
              {alert.actions.map((action: string, index: number) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <FiArrowRight className="mr-2 text-blue-500" />
                  {action}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-500">
              <FiClock className="inline mr-1" />
              Reportado: {new Date(alert.date).toLocaleDateString()}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              alert.status === "resolved" 
                ? "bg-green-100 text-green-800"
                : alert.priority === "high" 
                  ? "bg-red-100 text-red-800" 
                  : "bg-yellow-100 text-yellow-800"
            }`}>
              {alert.status === "resolved" ? "Resuelto" : `Prioridad ${alert.priority === "high" ? "Alta" : "Media"}`}
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Cerrar
          </button>
          
          {alert.status === "active" ? (
            <button 
              onClick={() => markAlertAsResolved(alert.id)}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <FiCheck size={16} />
              Marcar como Resuelto
            </button>
          ) : (
            <button 
              onClick={() => reactivateAlert(alert.id)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <FiAlertTriangle size={16} />
              Reactivar Alerta
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Componente de tarjeta de alerta individual ACTUALIZADO
  const AlertCard: React.FC<{ alert: AlertType }> = ({ alert }) => (
    <div className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
      alert.status === "resolved" ? "border-green-200 bg-green-50" : "border-gray-200"
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-900">{alert.student}</h4>
          <p className="text-sm text-gray-600">{alert.grade}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            alert.status === "resolved" 
              ? "bg-green-100 text-green-800"
              : alert.priority === "high" 
                ? "bg-red-100 text-red-800" 
                : "bg-yellow-100 text-yellow-800"
          }`}>
            {alert.status === "resolved" ? "✅ Resuelto" : alert.priority === "high" ? "Alta" : "Media"}
          </span>
          {alert.status === "resolved" && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                reactivateAlert(alert.id);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 transition"
            >
              Reactivar
            </button>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-800 mb-2">{alert.issue}</p>
      <p className="text-xs text-gray-600 mb-2">{alert.trend}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{alert.date}</span>
        <button 
          onClick={() => setSelectedAlert(alert)}
          className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
        >
          <FiEye className="inline" />
          Ver detalles
        </button>
      </div>
    </div>
  );

  // Filtros para alertas
  const [alertFilter, setAlertFilter] = useState<"all" | "active" | "resolved">("active");
  
  const filteredAlerts = alerts.filter(alert => {
    if (alertFilter === "all") return true;
    return alert.status === alertFilter;
  });

  const activeAlertsCount = alerts.filter(alert => alert.status === "active").length;
  const resolvedAlertsCount = alerts.filter(alert => alert.status === "resolved").length;

  // Métricas de Uso e Intervenciones
  const UsageMetricsCard: React.FC = () => (
    <ChartCard 
      title="📊 Reportes de Uso del Módulo" 
      description="Estadísticas de participación estudiantil"
      height="h-80"
    >
      <div className="space-y-4 h-64 overflow-y-auto p-2">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="font-semibold">Estudiantes Activos</span>
          <span className="text-lg font-bold">{usageMetrics.activeStudents}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="font-semibold">Sesiones Semanales</span>
          <span className="text-lg font-bold">{usageMetrics.weeklySessions}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
          <span className="font-semibold">Tasa de Finalización</span>
          <span className="text-lg font-bold">{usageMetrics.completionRate}%</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
          <span className="font-semibold">Función Más Usada</span>
          <span className="text-sm font-bold">{usageMetrics.mostUsedFeature}</span>
        </div>
      </div>
    </ChartCard>
  );

  const InterventionMetricsCard: React.FC = () => (
    <ChartCard 
      title="🎯 Métricas de Intervenciones de Apoyo" 
      description="Efectividad de las intervenciones realizadas"
      height="h-80"
    >
      <div className="space-y-3 h-64 overflow-y-auto">
        {interventionMetrics.map((metric, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{metric.type}</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {metric.count} casos
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${metric.successRate}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Tasa de éxito</span>
              <span>{metric.successRate}%</span>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );

  const ExecutiveSummaryCard: React.FC = () => (
    <ChartCard 
      title="📋 Resumen Ejecutivo de Bienestar" 
      description="Panorama general del estado emocional institucional"
      height="h-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4">
          <FiSmile className="text-4xl text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">
            {Math.round(emotionalTrends.reduce((sum, trend) => sum + trend.positive, 0) / emotionalTrends.length)}%
          </div>
          <div className="text-sm text-gray-600">Emociones Positivas</div>
        </div>
        <div className="text-center p-4">
          <FiMeh className="text-4xl text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-600">
            {Math.round(emotionalTrends.reduce((sum, trend) => sum + trend.neutral, 0) / emotionalTrends.length)}%
          </div>
          <div className="text-sm text-gray-600">Emociones Neutrales</div>
        </div>
        <div className="text-center p-4">
          <FiFrown className="text-4xl text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-600">
            {Math.round(emotionalTrends.reduce((sum, trend) => sum + trend.negative, 0) / emotionalTrends.length)}%
          </div>
          <div className="text-sm text-gray-600">Emociones Negativas</div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Recomendaciones</h4>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>✅ Incrementar actividades grupales en 3ro (58% positivo)</li>
          <li>📊 Monitorear clima grupal en 9no A (alertas activas)</li>
          <li>🎯 Fortecer programa de acompañamiento emocional</li>
        </ul>
      </div>
    </ChartCard>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monitoreo de Bienestar</h1>
          <p className="text-gray-600">Seguimiento integral del bienestar emocional estudiantil</p>
        </div>
        
        <div className="flex gap-2 mt-4 lg:mt-0">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="quarter">Último trimestre</option>
          </select>
          <button 
            onClick={exportWellnessReport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FiDownload />
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* Indicadores Rápidos ACTUALIZADO */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <FiHeart className="text-red-500" />
            <span className="font-semibold text-gray-900">Índice Bienestar</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(wellnessData[timeRange].reduce((a, b) => a + b, 0) / wellnessData[timeRange].length)}%
          </div>
          <div className="text-sm text-gray-600">Promedio general</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <FiUsers className="text-blue-500" />
            <span className="font-semibold text-gray-900">Estudiantes Activos</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{usageMetrics.activeStudents}</div>
          <div className="text-sm text-gray-600">En módulo bienestar</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <FiAlertTriangle className="text-orange-500" />
            <span className="font-semibold text-gray-900">Alertas Activas</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{activeAlertsCount}</div>
          <div className="text-sm text-gray-600">Requieren atención</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <FiTarget className="text-green-500" />
            <span className="font-semibold text-gray-900">Intervenciones</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {interventionMetrics.reduce((sum, metric) => sum + metric.count, 0)}
          </div>
          <div className="text-sm text-gray-600">Realizadas</div>
        </div>
      </div>

      {/* Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="❤️ Índice de Bienestar General" 
          description="Evolución del bienestar emocional agregado"
          height="h-80"
        >
          <div className="h-64">
            <WellnessChart 
              data={wellnessData[timeRange]} 
              labels={wellnessLabels[timeRange]} 
              color="#ef4444" 
            />
          </div>
        </ChartCard>

        <ChartCard 
          title="📈 Distribución Emocional por Grado" 
          description="Estado emocional actual de los estudiantes"
          height="h-80"
        >
          <div className="space-y-4 h-64 overflow-y-auto p-2">
            {emotionalTrends.map((trend, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                  selectedGrade === trend.grade ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedGrade(trend.grade === selectedGrade ? null : trend.grade)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{trend.grade}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {trend.positive}% positivo
                    </span>
                    {trend.trend === "up" && <FiTrendingUp className="text-green-500" />}
                    {trend.trend === "down" && <FiTrendingUp className="text-red-500 rotate-180" />}
                    {trend.trend === "stable" && <FiTrendingUp className="text-gray-500" />}
                  </div>
                </div>
                <EmotionChart data={trend} />
                {selectedGrade === trend.grade && (
                  <div className="mt-2 p-2 bg-white rounded border text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Estudiantes:</span>
                      <span className="font-medium">{trend.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Neutral:</span>
                      <span className="font-medium">{trend.neutral}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Negativo:</span>
                      <span className="font-medium">{trend.negative}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Alertas de Bienestar ACTUALIZADO */}
      <ChartCard 
        title="⚠️ Alertas de Bienestar Institucional" 
        description="Casos que requieren atención prioritaria"
        height="h-auto"
      >
        {/* Filtros de alertas */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setAlertFilter("active")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              alertFilter === "active" 
                ? "bg-red-100 text-red-800 border border-red-200" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Activas ({activeAlertsCount})
          </button>
          <button
            onClick={() => setAlertFilter("resolved")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              alertFilter === "resolved" 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Resueltas ({resolvedAlertsCount})
          </button>
          <button
            onClick={() => setAlertFilter("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              alertFilter === "all" 
                ? "bg-blue-100 text-blue-800 border border-blue-200" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todas ({alerts.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
          {filteredAlerts.length === 0 && (
            <div className="col-span-2 text-center py-8 text-gray-500">
              <FiCheck className="mx-auto text-4xl text-green-500 mb-2" />
              <p>No hay alertas {alertFilter === "active" ? "activas" : alertFilter === "resolved" ? "resueltas" : ""}</p>
            </div>
          )}
        </div>
      </ChartCard>

      {/* Métricas de Uso e Intervenciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsageMetricsCard />
        <InterventionMetricsCard />
      </div>

      {/* Resumen Ejecutivo */}
      <ExecutiveSummaryCard />

      {/* Modal de Detalles */}
      {selectedAlert && (
        <AlertDetailModal 
          alert={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
        />
      )}
    </div>
  );
};

export default Bienestar;