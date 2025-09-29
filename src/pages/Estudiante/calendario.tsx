import React, { useState, useEffect } from "react";

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  tipo: "clase" | "examen" | "entrega" | "actividad" | "reunion";
  materia?: string;
  profesor?: string;
  ubicacion?: string;
  recordatorio: boolean;
  color: string;
}

const CalendarioAcademico: React.FC = () => {
  const [vista, setVista] = useState<"mensual" | "semanal" | "diario">("mensual");
  const [fechaActual, setFechaActual] = useState(new Date());
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState<Partial<Evento>>({
    titulo: "",
    descripcion: "",
    fecha: new Date().toISOString().split('T')[0],
    hora: "08:00",
    tipo: "clase",
    recordatorio: true,
    color: "blue"
  });

  // Eventos de ejemplo
  useEffect(() => {
    const eventosEjemplo: Evento[] = [
      {
        id: 1,
        titulo: "Matemáticas",
        descripcion: "Clase de álgebra",
        fecha: "2024-01-15",
        hora: "08:00",
        tipo: "clase",
        materia: "Matemáticas",
        profesor: "Prof. García",
        ubicacion: "Aula 201",
        recordatorio: true,
        color: "blue"
      },
      {
        id: 2,
        titulo: "Examen de Historia",
        descripcion: "Examen sobre revolución industrial",
        fecha: "2024-01-16",
        hora: "10:00",
        tipo: "examen",
        materia: "Historia",
        profesor: "Prof. Martínez",
        ubicacion: "Aula 105",
        recordatorio: true,
        color: "red"
      },
      {
        id: 3,
        titulo: "Entrega de Proyecto",
        descripcion: "Proyecto de ciencias",
        fecha: "2024-01-17",
        hora: "14:00",
        tipo: "entrega",
        materia: "Biología",
        recordatorio: true,
        color: "green"
      },
      {
        id: 4,
        titulo: "Reunión de Padres",
        descripcion: "Reunión trimestral",
        fecha: "2024-01-18",
        hora: "16:00",
        tipo: "reunion",
        ubicacion: "Auditorio",
        recordatorio: true,
        color: "purple"
      },
      {
        id: 5,
        titulo: "Feria Científica",
        descripcion: "Presentación de proyectos",
        fecha: "2024-01-19",
        hora: "09:00",
        tipo: "actividad",
        ubicacion: "Gimnasio",
        recordatorio: true,
        color: "orange"
      }
    ];
    setEventos(eventosEjemplo);
  }, []);

  // Mostrar alerta de recordatorio
  const agregarRecordatorio = () => {
    setEventoSeleccionado(null);
    setMostrarAlerta(true); 
    setTimeout(() => {
        setMostrarAlerta(false); 
    }, 3000);
  };

  // Navegación del calendario
  const cambiarMes = (direccion: number) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setMonth(fechaActual.getMonth() + direccion);
    setFechaActual(nuevaFecha);
  };

  const cambiarSemana = (direccion: number) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(fechaActual.getDate() + (direccion * 7));
    setFechaActual(nuevaFecha);
  };

  const cambiarDia = (direccion: number) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(fechaActual.getDate() + direccion);
    setFechaActual(nuevaFecha);
  };

  // Generar días del mes
  const generarDiasMes = () => {
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth();
    
    const primerDia = new Date(year, month, 1);
    const ultimoDia = new Date(year, month + 1, 0);
    
    const dias: Date[] = [];
    
    // Días del mes anterior
    const primerDiaSemana = primerDia.getDay();
    for (let i = primerDiaSemana - 1; i >= 0; i--) {
      const dia = new Date(year, month, -i);
      dias.push(dia);
    }
    
    // Días del mes actual
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push(new Date(year, month, i));
    }
    
    // Días del siguiente mes
    const diasRestantes = 42 - dias.length;
    for (let i = 1; i <= diasRestantes; i++) {
      dias.push(new Date(year, month + 1, i));
    }
    
    return dias;
  };

  // Generar semana actual
  const generarSemana = () => {
    const semana: Date[] = [];
    const inicioSemana = new Date(fechaActual);
    inicioSemana.setDate(fechaActual.getDate() - fechaActual.getDay());
    
    for (let i = 0; i < 7; i++) {
      const dia = new Date(inicioSemana);
      dia.setDate(inicioSemana.getDate() + i);
      semana.push(dia);
    }
    
    return semana;
  };

  // Obtener eventos para una fecha específica
  const obtenerEventosPorFecha = (fecha: Date) => {
    return eventos.filter(evento => 
      evento.fecha === fecha.toISOString().split('T')[0]
    );
  };

  // Agregar nuevo evento
  const agregarEvento = () => {
    if (nuevoEvento.titulo && nuevoEvento.fecha) {
      const evento: Evento = {
        id: Date.now(),
        titulo: nuevoEvento.titulo!,
        descripcion: nuevoEvento.descripcion || "",
        fecha: nuevoEvento.fecha!,
        hora: nuevoEvento.hora!,
        tipo: nuevoEvento.tipo!,
        materia: nuevoEvento.materia,
        profesor: nuevoEvento.profesor,
        ubicacion: nuevoEvento.ubicacion,
        recordatorio: nuevoEvento.recordatorio!,
        color: nuevoEvento.color!
      };
      setEventos([...eventos, evento]);
      setMostrarFormulario(false);
      setNuevoEvento({
        titulo: "",
        descripcion: "",
        fecha: new Date().toISOString().split('T')[0],
        hora: "08:00",
        tipo: "clase",
        recordatorio: true,
        color: "blue"
      });
    }
  };

  // Obtener icono según tipo de evento
  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case "clase": return "📚";
      case "examen": return "📝";
      case "entrega": return "📄";
      case "actividad": return "🎉";
      case "reunion": return "👥";
      default: return "📅";
    }
  };

  // Obtener color según tipo
  const getColorEvento = (color: string) => {
    const colores = {
      blue: "bg-blue-100 border-blue-300 text-blue-800",
      red: "bg-red-100 border-red-300 text-red-800",
      green: "bg-green-100 border-green-300 text-green-800",
      purple: "bg-purple-100 border-purple-300 text-purple-800",
      orange: "bg-orange-100 border-orange-300 text-orange-800"
    };
    return colores[color as keyof typeof colores] || colores.blue;
  };

  // Notificaciones de eventos próximos
  const eventosProximos = eventos
    .filter(evento => {
      const fechaEvento = new Date(evento.fecha);
      const hoy = new Date();
      const diferencia = fechaEvento.getTime() - hoy.getTime();
      return diferencia > 0 && diferencia <= 3 * 24 * 60 * 60 * 1000; // Próximos 3 días
    })
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Alerta de recordatorio agregado */}
      {mostrarAlerta && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down w-80">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 max-w-sm mx-auto">
            <div className="flex items-center justify-center w-8 h-8 bg-green-400 rounded-full">
              <span className="text-lg">✅</span>
            </div>
            <div>
              <p className="font-semibold">¡Recordatorio agregado!</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">📅 Calendario Académico</h2>
            <p className="text-gray-600 mt-1">Organiza tu tiempo y actividades</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setMostrarFormulario(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              + Evento
            </button>
          </div>
        </div>
      </div>

      {/* Notificaciones de eventos próximos */}
      {eventosProximos.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">🔔 Eventos Próximos</h3>
          <div className="space-y-2">
            {eventosProximos.slice(0, 3).map(evento => (
              <div key={evento.id} className="flex items-center gap-3 text-sm">
                <span className={getColorEvento(evento.color)}>
                  {getIconoTipo(evento.tipo)}
                </span>
                <span className="font-medium text-yellow-800">{evento.titulo}</span>
                <span className="text-yellow-600">
                  {new Date(evento.fecha).toLocaleDateString()} a las {evento.hora}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selector de vista y navegación */}
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Selector de vista */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {["mensual", "semanal", "diario"].map((vistaOption) => (
              <button
                key={vistaOption}
                onClick={() => setVista(vistaOption as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  vista === vistaOption
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {vistaOption.charAt(0).toUpperCase() + vistaOption.slice(1)}
              </button>
            ))}
          </div>

          {/* Navegación */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (vista === "mensual") cambiarMes(-1);
                if (vista === "semanal") cambiarSemana(-1);
                if (vista === "diario") cambiarDia(-1);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            
            <span className="font-semibold text-gray-800 text-lg">
              {vista === "mensual" && fechaActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              {vista === "semanal" && `Semana del ${generarSemana()[0].toLocaleDateString()}`}
              {vista === "diario" && fechaActual.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
            
            <button
              onClick={() => {
                if (vista === "mensual") cambiarMes(1);
                if (vista === "semanal") cambiarSemana(1);
                if (vista === "diario") cambiarDia(1);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              →
            </button>

            <button
              onClick={() => setFechaActual(new Date())}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm"
            >
              Hoy
            </button>
          </div>
        </div>
      </div>

      {/* Vista del Calendario */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Vista Mensual */}
        {vista === "mensual" && (
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(dia => (
                <div key={dia} className="p-2 text-center text-sm font-medium text-gray-600">
                  {dia}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {generarDiasMes().map((dia, index) => {
                const eventosDia = obtenerEventosPorFecha(dia);
                const esHoy = dia.toDateString() === new Date().toDateString();
                const esMesActual = dia.getMonth() === fechaActual.getMonth();
                
                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border border-gray-200 ${
                      !esMesActual ? "bg-gray-50 text-gray-400" : "bg-white"
                    } ${esHoy ? "bg-blue-50 border-blue-300" : ""}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      esHoy ? "text-blue-600" : "text-gray-700"
                    }`}>
                      {dia.getDate()}
                    </div>
                    <div className="space-y-1">
                      {eventosDia.slice(0, 2).map(evento => (
                        <div
                          key={evento.id}
                          className={`text-xs p-1 rounded border ${getColorEvento(evento.color)} cursor-pointer hover:opacity-80`}
                          onClick={() => setEventoSeleccionado(evento)}
                        >
                          <div className="flex items-center gap-1">
                            <span>{getIconoTipo(evento.tipo)}</span>
                            <span className="truncate">{evento.titulo}</span>
                          </div>
                        </div>
                      ))}
                      {eventosDia.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{eventosDia.length - 2} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Vista Semanal */}
        {vista === "semanal" && (
          <div className="p-4">
            <div className="grid grid-cols-8 gap-1">
              <div className="p-2"></div>
              {generarSemana().map((dia, index) => {
                const esHoy = dia.toDateString() === new Date().toDateString();
                return (
                  <div key={index} className={`p-2 text-center ${esHoy ? "bg-blue-50 rounded-lg" : ""}`}>
                    <div className="text-sm font-medium text-gray-600">
                      {dia.toLocaleDateString('es-ES', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-bold ${esHoy ? "text-blue-600" : "text-gray-800"}`}>
                      {dia.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="grid grid-cols-8 gap-1 mt-4">
              <div className="p-2 space-y-8">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="text-xs text-gray-500 text-right pr-2 h-16">
                    {i + 8}:00
                  </div>
                ))}
              </div>
              
              {generarSemana().map((dia, diaIndex) => (
                <div key={diaIndex} className="relative">
                  {Array.from({ length: 12 }, (_, horaIndex) => {
                    const hora = horaIndex + 8;
                    const eventosHora = eventos.filter(evento => 
                      evento.fecha === dia.toISOString().split('T')[0] &&
                      parseInt(evento.hora) === hora
                    );
                    
                    return (
                      <div key={horaIndex} className="border-t border-gray-200 h-16 p-1">
                        {eventosHora.map(evento => (
                          <div
                            key={evento.id}
                            className={`text-xs p-1 rounded border ${getColorEvento(evento.color)} mb-1 cursor-pointer hover:opacity-80`}
                            onClick={() => setEventoSeleccionado(evento)}
                          >
                            <div className="flex items-center gap-1">
                              <span>{getIconoTipo(evento.tipo)}</span>
                              <span className="truncate">{evento.titulo}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vista Diaria */}
        {vista === "diario" && (
          <div className="p-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {fechaActual.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h3>
            </div>
            
            <div className="space-y-4">
              {Array.from({ length: 12 }, (_, i) => {
                const hora = i + 8;
                const eventosHora = eventos.filter(evento => 
                  evento.fecha === fechaActual.toISOString().split('T')[0] &&
                  parseInt(evento.hora) === hora
                );
                
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-16 text-right">
                      <span className="text-sm font-medium text-gray-600">{hora}:00</span>
                    </div>
                    <div className="flex-1 border-t border-gray-200 pt-2">
                      {eventosHora.map(evento => (
                        <div
                          key={evento.id}
                          className={`p-3 rounded-lg border ${getColorEvento(evento.color)} mb-2 cursor-pointer hover:shadow-md transition-all`}
                          onClick={() => setEventoSeleccionado(evento)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{getIconoTipo(evento.tipo)}</span>
                            <h4 className="font-semibold">{evento.titulo}</h4>
                          </div>
                          {evento.descripcion && (
                            <p className="text-sm text-gray-600 mb-1">{evento.descripcion}</p>
                          )}
                          <div className="text-xs text-gray-500">
                            {evento.ubicacion && `📍 ${evento.ubicacion} • `}
                            {evento.materia && `📚 ${evento.materia}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Detalles del Evento */}
      {eventoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{getIconoTipo(eventoSeleccionado.tipo)}</span>
              <h3 className="text-xl font-bold text-gray-800">{eventoSeleccionado.titulo}</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">📅 Fecha: </span>
                {new Date(eventoSeleccionado.fecha).toLocaleDateString('es-ES')}
              </div>
              <div>
                <span className="font-medium text-gray-700">⏰ Hora: </span>
                {eventoSeleccionado.hora}
              </div>
              {eventoSeleccionado.descripcion && (
                <div>
                  <span className="font-medium text-gray-700">📝 Descripción: </span>
                  {eventoSeleccionado.descripcion}
                </div>
              )}
              {eventoSeleccionado.materia && (
                <div>
                  <span className="font-medium text-gray-700">📚 Materia: </span>
                  {eventoSeleccionado.materia}
                </div>
              )}
              {eventoSeleccionado.ubicacion && (
                <div>
                  <span className="font-medium text-gray-700">📍 Ubicación: </span>
                  {eventoSeleccionado.ubicacion}
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setEventoSeleccionado(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              >
                Cerrar
              </button>
              <button 
                onClick={agregarRecordatorio}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>⏰</span>
                Agregar Recordatorio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formulario para nuevo evento */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">➕ Nuevo Evento</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  value={nuevoEvento.titulo}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, titulo: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Título del evento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={nuevoEvento.tipo}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, tipo: e.target.value as any})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="clase">📚 Clase</option>
                  <option value="examen">📝 Examen</option>
                  <option value="entrega">📄 Entrega</option>
                  <option value="actividad">🎉 Actividad</option>
                  <option value="reunion">👥 Reunión</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
                  <input
                    type="date"
                    value={nuevoEvento.fecha}
                    onChange={(e) => setNuevoEvento({...nuevoEvento, fecha: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                  <input
                    type="time"
                    value={nuevoEvento.hora}
                    onChange={(e) => setNuevoEvento({...nuevoEvento, hora: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={nuevoEvento.descripcion}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, descripcion: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Descripción opcional..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Materia</label>
                <input
                  type="text"
                  value={nuevoEvento.materia}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, materia: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Matemáticas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input
                  type="text"
                  value={nuevoEvento.ubicacion}
                  onChange={(e) => setNuevoEvento({...nuevoEvento, ubicacion: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Aula 201"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={agregarEvento}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setMostrarFormulario(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioAcademico;