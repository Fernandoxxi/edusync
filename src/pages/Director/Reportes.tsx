import React, { useState } from "react";
import { 
  FiDownload, FiTrendingUp, FiBarChart2, FiEye, FiPrinter, FiFileText, FiX
} from "react-icons/fi";
import ChartCard from "../../components/ChartCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Types
interface ReportData {
  id: number;
  title: string;
  type: "executive" | "academic" | "financial" | "attendance";
  period: string;
  generatedDate: string;
  data: any;
}

// Simple SVG Chart Components - tus gráficos iguales
const LineChart: React.FC<{ data: number[]; labels: string[]; color?: string }> = ({ data, labels, color = "#3b82f6" }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  return (
    <div className="w-full h-full p-1">
      <svg viewBox="0 0 100 60" className="w-full h-full"> 
        {[15, 30, 45].map((y) => ( 
          <line key={y} x1="5" y1={y} x2="95" y2={y} stroke="#f3f4f6" strokeWidth="0.5"/>
        ))}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          points={data.map((value, index) => {
            const x = 10 + (index / (data.length - 1)) * 80;
            const y = 50 - ((value - minValue) / range) * 40; 
            return `${x},${y}`;
          }).join(" ")}
        />
        {data.map((value, index) => {
          const x = 10 + (index / (data.length - 1)) * 80;
          const y = 50 - ((value - minValue) / range) * 40; 
          return <circle key={index} cx={x} cy={y} r="1.5" fill={color} stroke="white" strokeWidth="0.5"/>;
        })}
      </svg>
      <div className="flex justify-between text-xs text-gray-600 mt-1 px-1">
        {labels.map((label, index) => <span key={index} className="text-center flex-1 text-[10px]">{label}</span>)}
      </div>
    </div>
  );
};

const PieChart: React.FC<{ data: number[]; labels: string[]; colors?: string[] }> = ({ data, labels, colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"] }) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  let currentAngle = 0;
  return (
    <div className="w-full h-full p-2 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center mb-2">
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          {data.map((value, index) => {
            const percentage = (value / total) * 100;
            const angle = (percentage / 100) * 360;
            const largeArcFlag = angle > 180 ? 1 : 0;
            const x1 = 50 + 40 * Math.cos(currentAngle * Math.PI / 180);
            const y1 = 50 + 40 * Math.sin(currentAngle * Math.PI / 180);
            const x2 = 50 + 40 * Math.cos((currentAngle + angle) * Math.PI / 180);
            const y2 = 50 + 40 * Math.sin((currentAngle + angle) * Math.PI / 180);
            const pathData = [`M 50 50`,`L ${x1} ${y1}`,`A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,`Z`].join(" ");
            currentAngle += angle;
            return <path key={index} d={pathData} fill={colors[index % colors.length]} stroke="white" strokeWidth="2"/>;
          })}
        </svg>
      </div>
      <div className="grid grid-cols-1 gap-1 text-xs w-full mt-2">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded" style={{ backgroundColor: colors[index % colors.length] }}/>
              <span className="truncate text-xs">{label}</span>
            </div>
            <span className="font-medium text-xs">({data[index]}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BarChart: React.FC<{ data: number[]; labels: string[]; color?: string }> = ({ data, labels, color = "#3b82f6" }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  return (
    <div className="w-full h-full p-2">
      <div className="flex items-end justify-between h-full gap-2 px-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1 h-full">
            <div className="flex flex-col justify-end h-full w-full">
              <div 
                className="w-full rounded-t transition-all hover:opacity-80 relative group"
                style={{height: `${((value - minValue) / (maxValue - minValue || 1)) * 100}%`, backgroundColor: color, minHeight: value === 0 ? '0px' : '30px'}}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {value}%
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-600 mt-2 text-center truncate w-full">{labels[index]}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-4 px-2">
        <span>{minValue}%</span>
        <span>{maxValue}%</span>
      </div>
    </div>
  );
};

const Reportes: React.FC = () => {
  const [activeReport, setActiveReport] = useState<"executive" | "analytics" | "trends">("executive");
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  // datos de ejemplo (igual que los que tenías)
  const performanceData = [75, 78, 82, 79, 85, 88];
  const performanceLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const attendanceData = [89, 91, 92, 90, 93, 94];
  const subjectData = [25, 20, 22, 18, 15];
  const subjectLabels = ["Matemáticas", "Ciencias", "Lenguaje", "Historia", "Inglés"];
  const gradeData = [75, 92, 60, 85, 95];
  const gradeLabels = ["1ro", "2do", "3ro", "4to", "5to"];

  const reportData: ReportData[] = [
    {
      id: 1,
      title: "Reporte Ejecutivo Trimestral",
      type: "executive",
      period: "Ene-Mar 2024",
      generatedDate: "2024-04-01",
      data: { totalStudents: 1250, averagePerformance: 78.5, attendanceRate: 92.3, topPerformingSubject: "Matemáticas", areasForImprovement: ["Ciencias", "Historia"] }
    },
    {
      id: 2,
      title: "Análisis Académico por Materia",
      type: "academic",
      period: "2024 Q1",
      generatedDate: "2024-04-05",
      data: { subjects: [ { name: "Matemáticas", performance: 85, attendance: 94 }, { name: "Ciencias", performance: 72, attendance: 89 } ] }
    }
  ];

  // ✅ PDF con estilos
  const exportToPDF = (report: ReportData) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(report.title, 14, 20);
    doc.setFontSize(12);
    doc.text(`Período: ${report.period}`, 14, 30);
    doc.text(`Generado: ${new Date(report.generatedDate).toLocaleDateString()}`, 14, 40);

    autoTable(doc, {
      startY: 50,
      head: [["Clave", "Valor"]],
      body: Object.entries(report.data).map(([key, value]) => [
        key, typeof value === "object" ? JSON.stringify(value) : String(value)
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255, halign: "center" },
      alternateRowStyles: { fillColor: [240, 240, 240] }
    });

    doc.save(`${report.title.replace(/\s+/g, "_")}.pdf`);
  };

  // ✅ Excel con autoajuste de columnas
  const exportToExcel = (report: ReportData) => {
    const worksheet = XLSX.utils.json_to_sheet(
      Object.entries(report.data).map(([key, value]) => ({
        Clave: key,
        Valor: typeof value === "object" ? JSON.stringify(value) : value
      }))
    );
    worksheet["!cols"] = [{ wch: 20 }, { wch: 40 }];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
    XLSX.writeFile(workbook, `${report.title.replace(/\s+/g, "_")}.xlsx`);
  };

  const printReport = (report: ReportData) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`<html><head><title>${report.title}</title></head><body><h1>${report.title}</h1><pre>${JSON.stringify(report.data, null, 2)}</pre></body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
  };
  // Componente de Tarjeta de Reporte
  const ReportCard: React.FC<{ report: ReportData }> = ({ report }) => (
    <div className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{report.title}</h4>
          <p className="text-sm text-gray-600">{report.period}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          report.type === "executive" ? "bg-blue-100 text-blue-800" :
          report.type === "academic" ? "bg-green-100 text-green-800" :
          report.type === "attendance" ? "bg-purple-100 text-purple-800" :
          "bg-orange-100 text-orange-800"
        }`}>
          {report.type}
        </span>
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        Generado: {new Date(report.generatedDate).toLocaleDateString()}
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedReport(report);
          }}
          className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition"
        >
          <FiEye size={14} />
          Ver
        </button>
        <div className="flex gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              exportToPDF(report);
            }}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
            title="Exportar a PDF"
          >
            <FiFileText size={14} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              exportToExcel(report);
            }}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition"
            title="Exportar a Excel"
          >
            <FiDownload size={14} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              printReport(report);
            }}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
            title="Imprimir"
          >
            <FiPrinter size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes y Analytics</h1>
          <p className="text-gray-600">Análisis avanzado y generación de reportes personalizados</p>
        </div>
        
        <div className="flex gap-2 mt-4 lg:mt-0">
          <button 
            onClick={() => exportToExcel(reportData[0])}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FiDownload />
            Exportar Todo
          </button>
        </div>
      </div>

      

      {/* Navegación */}
      <div className="bg-white rounded-xl shadow border">
        <div className="flex overflow-x-auto">
          {[
            { id: "executive", label: "📈 Reportes Ejecutivos", icon: <FiFileText /> },
            { id: "analytics", label: "📊 Dashboards Analytics", icon: <FiBarChart2 /> },
            { id: "trends", label: "📉 Tendencias y Patrones", icon: <FiTrendingUp /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveReport(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition whitespace-nowrap ${
                activeReport === tab.id
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido de Reportes Ejecutivos */}
      {activeReport === "executive" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard 
              title="Reporte Ejecutivo"
              value="78.5%"
              trend="up"
              actions={
                <div className="flex gap-1">
                  <button 
                    onClick={() => exportToPDF(reportData[0])}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                    title="Exportar PDF"
                  >
                    <FiFileText size={14} />
                  </button>
                  <button 
                    onClick={() => exportToExcel(reportData[0])}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition"
                    title="Exportar Excel"
                  >
                    <FiDownload size={14} />
                  </button>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">1,250</div>
                    <div className="text-sm text-gray-600">Estudiantes</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">78.5%</div>
                    <div className="text-sm text-gray-600">Rendimiento</div>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <h5 className="font-semibold mb-2">Resumen Ejecutivo</h5>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>✅ Asistencia promedio: 92.3%</li>
                    <li>📈 Materia destacada: Matemáticas (85%)</li>
                    <li>⚠️ Necesita mejora: Ciencias (72%)</li>
                  </ul>
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Reportes Guardados" height="h-80">
              <div className="space-y-3 h-64 overflow-y-auto">
                {reportData.map(report => (
                  <div key={report.id} onClick={() => setSelectedReport(report)}>
                    <ReportCard report={report} />
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      )}

      {/* Contenido de Dashboards Analytics - MEJORADO */}
      {activeReport === "analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            <ChartCard 
              title="Rendimiento por Período" 
              height="h-52"
            >
              <div className="h-44 flex items-center justify-center">
                <LineChart data={performanceData} labels={performanceLabels} color="#3b82f6" />
              </div>
            </ChartCard>

            <ChartCard 
              title="Distribución por Materia" 
              height="h-52"
            >
              <div className="h-48 flex items-center justify-center">
                <PieChart data={subjectData} labels={subjectLabels} />
              </div>
            </ChartCard>

            <ChartCard 
              title="Asistencia por Grado" 
              height="h-52"
            >
              <div className="h-48 flex items-center justify-center">
                <BarChart data={gradeData} labels={gradeLabels} color="#10b981" />
              </div>
            </ChartCard>
          </div>

          <ChartCard 
          title="Comparativa de Métricas" 
          height="h-96" // Aumenté la altura
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-72"> {/* Reducí el gap y altura */}
            <div className="flex flex-col h-full">
              <h4 className="font-semibold mb-2 text-center text-sm">Rendimiento Académico</h4>
              <div className="flex-1 min-h-0"> {/* Agregué min-h-0 para contener el gráfico */}
                <LineChart data={performanceData} labels={performanceLabels} color="#3b82f6" />
              </div>
            </div>
            <div className="flex flex-col h-full">
              <h4 className="font-semibold mb-2 text-center text-sm">Tasa de Asistencia</h4>
              <div className="flex-1 min-h-0"> {/* Agregué min-h-0 para contener el gráfico */}
                <LineChart data={attendanceData} labels={performanceLabels} color="#10b981" />
              </div>
            </div>
          </div>
        </ChartCard>
        </div>
      )}

      {/* Contenido de Tendencias y Patrones */}
      {activeReport === "trends" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Análisis de Tendencias">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg h-full">
                <div className="flex items-center gap-2 mb-4">
                  <FiTrendingUp className="text-blue-600" />
                  <h4 className="font-semibold">Tendencias Académicas</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-green-600">+5.2%</div>
                    <div className="text-sm text-gray-600">Rendimiento</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-blue-600">+2.8%</div>
                    <div className="text-sm text-gray-600">Asistencia</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>📈 Matemáticas: Tendencia positiva (+7%)</span>
                    <span className="text-green-600">Excelente</span>
                  </div>
                  <div className="flex justify-between">
                    <span>⚠️ Ciencias: Necesita atención (-2%)</span>
                    <span className="text-yellow-600">Regular</span>
                  </div>
                  <div className="flex justify-between">
                    <span>📊 Lenguaje: Estable (+1%)</span>
                    <span className="text-blue-600">Bueno</span>
                  </div>
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Patrones de Rendimiento">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Patrón detectado</div>
                    <div className="text-sm text-gray-600">Bajo rendimiento en evaluaciones vespertinas</div>
                  </div>
                  <span className="text-yellow-600">⚠️</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Tendencia positiva</div>
                    <div className="text-sm text-gray-600">Mejora continua en asistencia</div>
                  </div>
                  <span className="text-green-600">📈</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold">Correlación encontrada</div>
                    <div className="text-sm text-gray-600">Asistencia vs Rendimiento: r=0.85</div>
                  </div>
                  <span className="text-blue-600">🔍</span>
                </div>
              </div>
            </ChartCard>
          </div>

          <ChartCard title="Análisis Predictivo">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">15%</div>
                <div className="text-sm text-gray-600">Riesgo de bajo rendimiento</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">82%</div>
                <div className="text-sm text-gray-600">Probabilidad de éxito</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">Q2 2024</div>
                <div className="text-sm text-gray-600">Próximo punto crítico</div>
              </div>
            </div>
          </ChartCard>
        </div>
      )}

      {/* Modal de Vista de Reporte */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">{selectedReport.title}</h2>
              <button 
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Período:</strong> {selectedReport.period}
                </div>
                <div>
                  <strong>Tipo:</strong> {selectedReport.type}
                </div>
                <div>
                  <strong>Generado:</strong> {new Date(selectedReport.generatedDate).toLocaleDateString()}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Datos del Reporte</h4>
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {JSON.stringify(selectedReport.data, null, 2)}
                </pre>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => exportToPDF(selectedReport)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <FiFileText />
                  Exportar PDF
                </button>
                <button 
                  onClick={() => exportToExcel(selectedReport)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <FiDownload />
                  Exportar Excel
                </button>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reportes;