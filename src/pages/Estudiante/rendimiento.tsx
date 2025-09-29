import React, { useState } from "react";

interface Materia {
  id: number;
  nombre: string;
  notaActual: number;
  promedioCurso: number;
  tendencia: "subiendo" | "bajando" | "estable";
  color: string;
  icono: string;
}

interface Calificacion {
  id: number;
  materia: string;
  nota: number;
  fecha: string;
  tipo: "examen" | "tarea" | "proyecto";
  ponderacion: number;
  comentario: string;
}

interface Logro {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  icono: string;
  color: string;
}

const PerfilRendimiento: React.FC = () => {
  const [vista, setVista] = useState<"resumen" | "calificaciones" | "logros">("resumen");

  const materias: Materia[] = [
    {
      id: 1,
      nombre: "Matemáticas",
      notaActual: 8.5,
      promedioCurso: 7.2,
      tendencia: "subiendo",
      color: "bg-blue-500",
      icono: "📊"
    },
    {
      id: 2,
      nombre: "Historia",
      notaActual: 7.8,
      promedioCurso: 6.9,
      tendencia: "estable",
      color: "bg-green-500",
      icono: "📚"
    },
    {
      id: 3,
      nombre: "Biología",
      notaActual: 9.2,
      promedioCurso: 8.1,
      tendencia: "subiendo",
      color: "bg-purple-500",
      icono: "🔬"
    },
    {
      id: 4,
      nombre: "Literatura",
      notaActual: 6.5,
      promedioCurso: 7.0,
      tendencia: "bajando",
      color: "bg-orange-500",
      icono: "📖"
    },
    {
      id: 5,
      nombre: "Física",
      notaActual: 8.0,
      promedioCurso: 7.5,
      tendencia: "estable",
      color: "bg-red-500",
      icono: "⚡"
    },
    {
      id: 6,
      nombre: "Inglés",
      notaActual: 9.0,
      promedioCurso: 8.3,
      tendencia: "subiendo",
      color: "bg-indigo-500",
      icono: "🌎"
    }
  ];

  const calificaciones: Calificacion[] = [
    {
      id: 1,
      materia: "Matemáticas",
      nota: 8.5,
      fecha: "2024-01-15",
      tipo: "examen",
      ponderacion: 30,
      comentario: "Excelente trabajo en álgebra"
    },
    {
      id: 2,
      materia: "Historia",
      nota: 7.0,
      fecha: "2024-01-14",
      tipo: "tarea",
      ponderacion: 15,
      comentario: "Buen análisis histórico"
    },
    {
      id: 3,
      materia: "Biología",
      nota: 9.5,
      fecha: "2024-01-13",
      tipo: "proyecto",
      ponderacion: 25,
      comentario: "Proyecto de investigación sobresaliente"
    },
    {
      id: 4,
      materia: "Literatura",
      nota: 6.0,
      fecha: "2024-01-12",
      tipo: "examen",
      ponderacion: 30,
      comentario: "Necesita mejorar en análisis literario"
    },
    {
      id: 5,
      materia: "Física",
      nota: 8.0,
      fecha: "2024-01-11",
      tipo: "tarea",
      ponderacion: 10,
      comentario: "Buen manejo de conceptos"
    }
  ];

  const logros: Logro[] = [
    {
      id: 1,
      titulo: "Mejor en Matemáticas",
      descripcion: "Primer lugar en el examen de álgebra",
      fecha: "2024-01-15",
      icono: "🥇",
      color: "bg-yellow-100 border-yellow-200"
    },
    {
      id: 2,
      titulo: "Proyecto Destacado",
      descripcion: "Reconocimiento por proyecto de ciencias",
      fecha: "2024-01-13",
      icono: "⭐",
      color: "bg-blue-100 border-blue-200"
    },
    {
      id: 3,
      titulo: "Asistencia Perfecta",
      descripcion: "0 faltas este mes",
      fecha: "2024-01-10",
      icono: "✅",
      color: "bg-green-100 border-green-200"
    },
    {
      id: 4,
      titulo: "Mejora Continua",
      descripcion: "Incrementó 1.5 puntos su promedio",
      fecha: "2024-01-08",
      icono: "📈",
      color: "bg-purple-100 border-purple-200"
    }
  ];

  const getNotaColor = (nota: number) => {
    if (nota >= 9) return "text-green-600 bg-green-100";
    if (nota >= 7) return "text-blue-600 bg-blue-100";
    if (nota >= 5) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getTendenciaIcono = (tendencia: string) => {
    switch (tendencia) {
      case "subiendo": return "↗️";
      case "bajando": return "↘️";
      default: return "➡️";
    }
  };

  const getTendenciaColor = (tendencia: string) => {
    switch (tendencia) {
      case "subiendo": return "text-green-500";
      case "bajando": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const promedioGeneral = materias.reduce((sum, materia) => sum + materia.notaActual, 0) / materias.length;
  const promedioCursoGeneral = materias.reduce((sum, materia) => sum + materia.promedioCurso, 0) / materias.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-b-3xl shadow-sm pb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">📊 Mi Rendimiento</h1>
              <p className="text-gray-600">Seguimiento de tu progreso académico</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-800">{promedioGeneral.toFixed(1)}</div>
              <div className="text-sm text-gray-500">Promedio General</div>
            </div>
          </div>

          {/* Barra de progreso general */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Tu progreso</span>
              <span>+{(promedioGeneral - promedioCursoGeneral).toFixed(1)} sobre el promedio</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(promedioGeneral / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div className="px-6">
          <div className="flex bg-gray-100 rounded-2xl p-1">
            {[
              { key: "resumen", label: "Resumen", icon: "📊" },
              { key: "calificaciones", label: "Calificaciones", icon: "📋" },
              { key: "logros", label: "Logros", icon: "🏆" }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setVista(item.key as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                  vista === item.key
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 -mt-4">
        {/* Vista Resumen */}
        {vista === "resumen" && (
          <div className="space-y-4">
            {/* Gráfico de comparativa */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Comparativa por Materia</h3>
              <div className="space-y-4">
                {materias.map((materia) => (
                  <div key={materia.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl ${materia.color} flex items-center justify-center text-white`}>
                        {materia.icono}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-800">{materia.nombre}</span>
                          <span className={`text-sm font-bold ${getNotaColor(materia.notaActual)} px-2 py-1 rounded-full`}>
                            {materia.notaActual}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
                              style={{ width: `${(materia.notaActual / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className={`text-xs ${getTendenciaColor(materia.tendencia)}`}>
                            {getTendenciaIcono(materia.tendencia)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Promedio del curso: {materia.promedioCurso}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Áreas de mejora */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">🎯 Áreas de Mejora</h3>
              <div className="space-y-3">
                {materias
                  .filter(materia => materia.notaActual < 7)
                  .map((materia) => (
                    <div key={materia.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${materia.color} flex items-center justify-center text-white`}>
                          {materia.icono}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{materia.nombre}</div>
                          <div className="text-sm text-orange-600">
                            Necesita mejorar - Actual: {materia.notaActual}
                          </div>
                        </div>
                      </div>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                        Practicar
                      </button>
                    </div>
                  ))}
                
                {materias.filter(materia => materia.notaActual < 7).length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <div className="text-4xl mb-2">🎉</div>
                    <p>¡Excelente! No tienes áreas críticas que mejorar</p>
                  </div>
                )}
              </div>
            </div>

            {/* Materias destacadas */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">⭐ Materias Destacadas</h3>
              <div className="grid grid-cols-2 gap-3">
                {materias
                  .filter(materia => materia.notaActual >= 8.5)
                  .map((materia) => (
                    <div key={materia.id} className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg ${materia.color} flex items-center justify-center text-white`}>
                          {materia.icono}
                        </div>
                        <div className="font-semibold text-gray-800">{materia.nombre}</div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{materia.notaActual}</div>
                      <div className="text-xs text-green-600 flex items-center gap-1">
                        {getTendenciaIcono(materia.tendencia)} +{(materia.notaActual - materia.promedioCurso).toFixed(1)} sobre el promedio
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Vista Calificaciones */}
        {vista === "calificaciones" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">📋 Historial de Calificaciones</h3>
              <div className="space-y-3">
                {calificaciones.map((calificacion) => (
                  <div key={calificacion.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                      calificacion.tipo === "examen" ? "bg-red-500" :
                      calificacion.tipo === "tarea" ? "bg-blue-500" :
                      "bg-purple-500"
                    }`}>
                      {calificacion.tipo === "examen" ? "📝" :
                       calificacion.tipo === "tarea" ? "📄" : "📚"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{calificacion.materia}</h4>
                          <p className="text-sm text-gray-600 capitalize">{calificacion.tipo} • {calificacion.ponderacion}%</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-lg font-bold ${getNotaColor(calificacion.nota)} px-2 py-1 rounded-full`}>
                            {calificacion.nota}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(calificacion.fecha).toLocaleDateString('es-ES')}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                        {calificacion.comentario}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">📈 Estadísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{promedioGeneral.toFixed(1)}</div>
                  <div className="text-sm text-blue-600">Promedio Actual</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {materias.filter(m => m.notaActual >= 7).length}/{materias.length}
                  </div>
                  <div className="text-sm text-green-600">Materias Aprobadas</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {materias.filter(m => m.tendencia === "subiendo").length}
                  </div>
                  <div className="text-sm text-purple-600">En Mejora</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">
                    {calificaciones.filter(c => c.nota >= 9).length}
                  </div>
                  <div className="text-sm text-orange-600">Notas Excelentes</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vista Logros */}
        {vista === "logros" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">🏆 Logros y Reconocimientos</h3>
              <div className="space-y-4">
                {logros.map((logro) => (
                  <div key={logro.id} className={`flex items-center gap-4 p-4 border rounded-xl ${logro.color} transition-all duration-200 hover:shadow-md`}>
                    <div className="text-3xl">{logro.icono}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{logro.titulo}</h4>
                      <p className="text-sm text-gray-600 mt-1">{logro.descripcion}</p>
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(logro.fecha).toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progreso general */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="font-semibold text-lg mb-2">¡Sigue así!</h3>
                <p className="text-blue-100 mb-4">
                  Has obtenido {logros.length} logros este mes. 
                  Tu dedicación está dando resultados.
                </p>
                <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 inline-block">
                  <span className="font-semibold">Próximo objetivo:</span> Mantener promedio arriba de 8.5
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfilRendimiento;