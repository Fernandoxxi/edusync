import React, { useState } from "react";

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  materia: string;
  fechaEntrega: string;
  prioridad: "alta" | "media" | "baja";
  estado: "pendiente" | "en-progreso" | "completado";
  tipo: "academica" | "personal";
  etiquetas: string[];
  recordatorio?: string;
}

const MisTareas: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([
    {
      id: 1,
      titulo: "Ejercicios de álgebra",
      descripcion: "Resolver problemas de ecuaciones cuadráticas",
      materia: "Matemáticas",
      fechaEntrega: "2025-10-05",
      prioridad: "alta",
      estado: "pendiente",
      tipo: "academica",
      etiquetas: ["matemáticas", "tarea"],
      recordatorio: "Mañana a las 8:00 AM"
    },
    {
      id: 2,
      titulo: "Ensayo sobre la revolución",
      descripcion: "Escribir 5 páginas sobre la revolución industrial",
      materia: "Historia",
      fechaEntrega: "2025-10-06",
      prioridad: "media",
      estado: "en-progreso",
      tipo: "academica",
      etiquetas: ["historia", "ensayo"]
    },
    {
      id: 3,
      titulo: "Comprar materiales",
      descripcion: "Comprar materiales para proyecto de ciencias",
      materia: "Biología",
      fechaEntrega: "2025-10-07",
      prioridad: "alta",
      estado: "pendiente",
      tipo: "personal",
      etiquetas: ["compras", "proyecto"]
    },
    {
      id: 4,
      titulo: "Estudiar para examen",
      descripcion: "Repasar capítulos 5-8 para examen de física",
      materia: "Física",
      fechaEntrega: "2025-10-08",
      prioridad: "alta",
      estado: "pendiente",
      tipo: "academica",
      etiquetas: ["examen", "estudio"],
      recordatorio: "Hoy a las 7:00 PM"
    },
    {
      id: 5,
      titulo: "Análisis de poema",
      descripcion: "Analizar estructura y métrica del poema asignado",
      materia: "Literatura",
      fechaEntrega: "2025-10-10",
      prioridad: "baja",
      estado: "completado",
      tipo: "academica",
      etiquetas: ["literatura", "análisis"]
    }
  ]);

  const [filtroMateria, setFiltroMateria] = useState<string>("todas");
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>("todas");
  const [filtroEstado, setFiltroEstado] = useState<string>("todas");
  const [filtroTipo, setFiltroTipo] = useState<string>("todas");
  const [busqueda, setBusqueda] = useState<string>("");
  const [nuevaTarea, setNuevaTarea] = useState<Partial<Tarea>>({
    titulo: "",
    descripcion: "",
    materia: "",
    fechaEntrega: "",
    prioridad: "media",
    estado: "pendiente",
    tipo: "academica",
    etiquetas: []
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [etiquetaInput, setEtiquetaInput] = useState("");

  const materias = ["Matemáticas", "Historia", "Biología", "Física", "Literatura", "Personal"];
  const estados = ["pendiente", "en-progreso", "completado"];

  // Filtrar tareas
  const tareasFiltradas = tareas.filter(tarea => {
    return (
      (filtroMateria === "todas" || tarea.materia === filtroMateria) &&
      (filtroPrioridad === "todas" || tarea.prioridad === filtroPrioridad) &&
      (filtroEstado === "todas" || tarea.estado === filtroEstado) &&
      (filtroTipo === "todas" || tarea.tipo === filtroTipo) &&
      (busqueda === "" || 
        tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        tarea.etiquetas.some(etiqueta => 
          etiqueta.toLowerCase().includes(busqueda.toLowerCase())
        ))
    );
  });

  // Agrupar por estado para vista Kanban
  const tareasPorEstado = {
    pendiente: tareasFiltradas.filter(t => t.estado === "pendiente"),
    "en-progreso": tareasFiltradas.filter(t => t.estado === "en-progreso"),
    completado: tareasFiltradas.filter(t => t.estado === "completado")
  };

  const agregarTarea = () => {
    if (nuevaTarea.titulo && nuevaTarea.materia && nuevaTarea.fechaEntrega) {
      const tarea: Tarea = {
        id: Date.now(),
        titulo: nuevaTarea.titulo!,
        descripcion: nuevaTarea.descripcion || "",
        materia: nuevaTarea.materia!,
        fechaEntrega: nuevaTarea.fechaEntrega!,
        prioridad: nuevaTarea.prioridad!,
        estado: nuevaTarea.estado!,
        tipo: nuevaTarea.tipo!,
        etiquetas: nuevaTarea.etiquetas || []
      };
      setTareas([...tareas, tarea]);
      setNuevaTarea({
        titulo: "",
        descripcion: "",
        materia: "",
        fechaEntrega: "",
        prioridad: "media",
        estado: "pendiente",
        tipo: "academica",
        etiquetas: []
      });
      setMostrarFormulario(false);
    }
  };

  const cambiarEstadoTarea = (id: number, nuevoEstado: Tarea["estado"]) => {
    setTareas(tareas.map(t => 
      t.id === id ? { ...t, estado: nuevoEstado } : t
    ));
  };

  const agregarEtiqueta = () => {
    if (etiquetaInput && !nuevaTarea.etiquetas?.includes(etiquetaInput)) {
      setNuevaTarea({
        ...nuevaTarea,
        etiquetas: [...(nuevaTarea.etiquetas || []), etiquetaInput]
      });
      setEtiquetaInput("");
    }
  };

  const eliminarEtiqueta = (etiqueta: string) => {
    setNuevaTarea({
      ...nuevaTarea,
      etiquetas: nuevaTarea.etiquetas?.filter(e => e !== etiqueta) || []
    });
  };

  const getColorPrioridad = (prioridad: string) => {
    switch (prioridad) {
      case "alta": return "bg-red-100 text-red-800 border-red-200";
      case "media": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "baja": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getColorEstado = (estado: string) => {
    switch (estado) {
      case "pendiente": return "bg-orange-100 text-orange-800";
      case "en-progreso": return "bg-blue-100 text-blue-800";
      case "completado": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">📝 Mis Tareas</h2>
            <p className="text-gray-600 mt-1">Organiza y gestiona todas tus actividades</p>
          </div>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            + Nueva Tarea
          </button>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Materia</label>
            <select
              value={filtroMateria}
              onChange={(e) => setFiltroMateria(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todas">Todas las materias</option>
              {materias.map(materia => (
                <option key={materia} value={materia}>{materia}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
            <select
              value={filtroPrioridad}
              onChange={(e) => setFiltroPrioridad(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todas">Todas las prioridades</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todas">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="en-progreso">En Progreso</option>
              <option value="completado">Completado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todas">Todos los tipos</option>
              <option value="academica">Académica</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">🔍 Buscar</label>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por título, descripción o etiquetas..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Formulario para nueva tarea */}
      {mostrarFormulario && (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">➕ Agregar Nueva Tarea</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
              <input
                type="text"
                value={nuevaTarea.titulo}
                onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Título de la tarea"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Materia *</label>
              <select
                value={nuevaTarea.materia}
                onChange={(e) => setNuevaTarea({...nuevaTarea, materia: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar materia</option>
                {materias.map(materia => (
                  <option key={materia} value={materia}>{materia}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de entrega *</label>
              <input
                type="date"
                value={nuevaTarea.fechaEntrega}
                onChange={(e) => setNuevaTarea({...nuevaTarea, fechaEntrega: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
              <select
                value={nuevaTarea.prioridad}
                onChange={(e) => setNuevaTarea({...nuevaTarea, prioridad: e.target.value as "alta" | "media" | "baja"})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select
                value={nuevaTarea.tipo}
                onChange={(e) => setNuevaTarea({...nuevaTarea, tipo: e.target.value as "academica" | "personal"})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="academica">Académica</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                value={nuevaTarea.descripcion}
                onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción opcional..."
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Etiquetas</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={etiquetaInput}
                  onChange={(e) => setEtiquetaInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && agregarEtiqueta()}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Agregar etiqueta..."
                />
                <button
                  onClick={agregarEtiqueta}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {nuevaTarea.etiquetas?.map((etiqueta, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                    {etiqueta}
                    <button onClick={() => eliminarEtiqueta(etiqueta)} className="text-blue-600 hover:text-blue-800">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={agregarTarea}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              Guardar Tarea
            </button>
            <button
              onClick={() => setMostrarFormulario(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Vista Kanban */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {estados.map((estado) => (
          <div key={estado} className="bg-white rounded-2xl p-4 shadow-lg">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${getColorEstado(estado)}`}>
              {estado === "pendiente" && "⏳"}
              {estado === "en-progreso" && "🚀"}
              {estado === "completado" && "✅"}
              {estado.charAt(0).toUpperCase() + estado.slice(1).replace('-', ' ')}
              <span className="ml-2 bg-white bg-opacity-50 px-2 py-1 rounded-full">
                {tareasPorEstado[estado as keyof typeof tareasPorEstado].length}
              </span>
            </div>

            <div className="space-y-3">
              {tareasPorEstado[estado as keyof typeof tareasPorEstado].map((tarea) => (
                <div key={tarea.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{tarea.titulo}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getColorPrioridad(tarea.prioridad)}`}>
                      {tarea.prioridad}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{tarea.descripcion}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>{tarea.materia}</span>
                    <span>📅 {new Date(tarea.fechaEntrega).toLocaleDateString()}</span>
                  </div>

                  {tarea.recordatorio && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-2">
                      <p className="text-xs text-yellow-800">⏰ {tarea.recordatorio}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {tarea.etiquetas.map((etiqueta, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        #{etiqueta}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded ${getColorEstado(tarea.estado)}`}>
                      {tarea.tipo === "personal" ? "🎯 Personal" : "📚 Académica"}
                    </span>
                    <div className="flex gap-1">
                      {estado !== "completado" && (
                        <button
                          onClick={() => cambiarEstadoTarea(tarea.id, 
                            estado === "pendiente" ? "en-progreso" : "completado"
                          )}
                          className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                        >
                          {estado === "pendiente" ? "Comenzar" : "Completar"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lista de todas las tareas (vista alternativa para móvil) */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Todas las Tareas ({tareasFiltradas.length})</h3>
        <div className="space-y-3">
          {tareasFiltradas.map((tarea) => (
            <div key={tarea.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{tarea.titulo}</h4>
                  <p className="text-sm text-gray-600 mt-1">{tarea.descripcion}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getColorPrioridad(tarea.prioridad)}`}>
                  {tarea.prioridad}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>{tarea.materia}</span>
                <span>📅 {new Date(tarea.fechaEntrega).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${getColorEstado(tarea.estado)}`}>
                  {tarea.estado.replace('-', ' ')}
                </span>
                <span className="text-xs text-gray-500">
                  {tarea.tipo === "personal" ? "🎯 Personal" : "📚 Académica"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisTareas;