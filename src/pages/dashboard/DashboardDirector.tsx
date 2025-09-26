import React from "react";

// Datos mock MÁS ESTRATÉGICOS para un director
const mockData = {
  // Métricas INSTITUCIONALES (no solo operativas)
  institutionalMetrics: {
    totalStudents: 1247,
    totalTeachers: 68,
    attendanceRate: 94.2,
    academicPerformance: 82.5, // Promedio general de notas
    wellbeingIndex: 78.5,
    graduationRate: 96.8, // Tasa de promoción
    dropoutRate: 2.3, // Tasa de deserción
    parentEngagement: 75.2, // Participación de padres
  },
  
  // Alertas ESTRATÉGICAS (no solo individuales)
  strategicAlerts: [
    { 
      id: 1, 
      type: 'academic', 
      title: 'Bajo rendimiento en Matemáticas 10mo',
      description: '35% de estudiantes con notas < 70 en el último trimestre',
      severity: 'high',
      affected: '45 estudiantes',
      trend: 'empeorando'
    },
    { 
      id: 2, 
      type: 'emotional', 
      title: 'Aumento de estrés en secundaria',
      description: 'Índice de bienestar bajó 12% en últimos 2 meses',
      severity: 'medium',
      affected: 'Secundaria completa',
      trend: 'estable'
    },
    { 
      id: 3, 
      type: 'operational', 
      title: 'Baja participación de padres',
      description: 'Solo 45% de padres acceden regularmente a la plataforma',
      severity: 'medium',
      affected: 'Familias de primaria',
      trend: 'mejorando'
    }
  ],

  // Tendencias institucionales
  trends: [
    { metric: 'Asistencia', current: 94.2, previous: 92.1, trend: 'up' },
    { metric: 'Rendimiento académico', current: 82.5, previous: 80.3, trend: 'up' },
    { metric: 'Bienestar emocional', current: 78.5, previous: 81.2, trend: 'down' },
    { metric: 'Participación padres', current: 75.2, previous: 72.8, trend: 'up' }
  ],

  // Acciones ALINEADAS con sus funciones reales
  directorActions: [
    { 
      icon: '📋', 
      label: 'Reporte Trimestral', 
      description: 'Generar reporte ejecutivo',
      path: '/dashboard/reportes' 
    },
    { 
      icon: '👥', 
      label: 'Gestión de Personal', 
      description: 'Administrar profesores y staff',
      path: '/dashboard/gestion-usuarios' 
    },
    { 
      icon: '📚', 
      label: 'Planificación Académica', 
      description: 'Ver calendario y planes',
      path: '/dashboard/control-academico' 
    },
    { 
      icon: '⚙️', 
      label: 'Configuración Sistema', 
      description: 'Ajustes de plataforma',
      path: '/dashboard/configuracion' 
    }
  ]
};

const DashboardDirector: React.FC = () => {
  //const [activeView, setActiveView] = useState('overview');

  const MetricCard = ({ title, value, subtitle, icon, color, trend }: any) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend && (
            <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
              trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {trend === 'up' ? '↗ Mejorando' : '↘ Atención'}
            </span>
          )}
        </div>
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${color} text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Estratégico */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
        <h1 className="text-2xl lg:text-3xl font-bold">Panel de Control Institucional</h1>
        <p className="text-blue-100 mt-2">Visión estratégica del colegio - {new Date().toLocaleDateString()}</p>
      </div>

      {/* Métricas INSTITUCIONALES (no operativas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Estudiantes" 
          value={mockData.institutionalMetrics.totalStudents} 
          subtitle="Inscritos activos"
          icon="👨‍🎓" 
          color="bg-blue-50" 
        />
        
        <MetricCard 
          title="Rendimiento Académico" 
          value={`${mockData.institutionalMetrics.academicPerformance}%`} 
          subtitle="Promedio general"
          icon="📊" 
          color="bg-green-50"
          trend="up"
        />
        
        <MetricCard 
          title="Tasa Graduación" 
          value={`${mockData.institutionalMetrics.graduationRate}%`} 
          subtitle="Promoción anual"
          icon="🎓" 
          color="bg-purple-50" 
        />
        
        <MetricCard 
          title="Participación Padres" 
          value={`${mockData.institutionalMetrics.parentEngagement}%`} 
          subtitle="Activos en plataforma"
          icon="👨‍👩‍👧‍👦" 
          color="bg-orange-50"
          trend="up"
        />
      </div>

      {/* Alertas ESTRATÉGICAS (no individuales) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Alertas Institucionales</h2>
            <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full">Requieren atención</span>
          </div>
          
          <div className="space-y-4">
            {mockData.strategicAlerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${
                alert.severity === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>Afecta: {alert.affected}</span>
                      <span>Tendencia: {alert.trend}</span>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Plan de acción →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones ALINEADAS con el menú */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Acciones de Gestión</h2>
          <div className="space-y-3">
            {mockData.directorActions.map(action => (
              <button 
                key={action.label}
                onClick={() => window.location.href = action.path}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-700">{action.label}</p>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDirector;