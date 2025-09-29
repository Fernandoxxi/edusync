import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DashboardEstudiante: React.FC = () => {
  const [estadoEmocional, setEstadoEmocional] = useState<string>("");
  const [emocionSeleccionada, setEmocionSeleccionada] = useState<string>("");
  const [tareasCompletadas, setTareasCompletadas] = useState<number[]>([]);
  const [semanaActual, setSemanaActual] = useState<Date[]>([]);
  const [hoyIndex, setHoyIndex] = useState<number>(0);

  // Datos de ejemplo
  const estudiante = {
    nombre: "Ana García",
    curso: "5° A",
    avatar: "👩‍🎓"
  };

  const tareasPendientes = [
    { id: 1, materia: "Matemáticas", tarea: "Ejercicios de álgebra", fecha: "Hoy", urgente: true },
    { id: 2, materia: "Historia", tarea: "Ensayo sobre la revolución", fecha: "Mañana", urgente: true },
    { id: 3, materia: "Biología", tarea: "Informe de laboratorio", fecha: "En 2 días", urgente: false },
    { id: 4, materia: "Literatura", tarea: "Análisis de poema", fecha: "En 3 días", urgente: false }
  ];

  const notificaciones = [
    { id: 1, tipo: "examen", mensaje: "Examen de Física: Lunes 9:00 AM", importante: true },
    { id: 2, tipo: "evento", mensaje: "Reunión de padres: Viernes 4:00 PM", importante: false }
  ];

  const emociones = [
    { emoji: "😊", label: "Feliz", color: "bg-yellow-100" },
    { emoji: "😐", label: "Neutral", color: "bg-gray-100" },
    { emoji: "😢", label: "Triste", color: "bg-blue-100" },
    { emoji: "😡", label: "Enojado", color: "bg-red-100" },
    { emoji: "😴", label: "Cansado", color: "bg-purple-100" },
    { emoji: "😰", label: "Ansioso", color: "bg-orange-100" }
  ];

  // Función para obtener la semana actual empezando por domingo
  const obtenerSemanaActual = () => {
    const hoy = new Date(2025, 8, 28); // 28 de Septiembre 2025 (mes 8 = Septiembre)
    const diaSemana = hoy.getDay(); // 0 = Domingo, 1 = Lunes, etc.
    
    const semana: Date[] = [];
    
    // Empezar desde el domingo de esta semana
    const domingo = new Date(hoy);
    domingo.setDate(hoy.getDate() - diaSemana);
    
    for (let i = 0; i < 7; i++) {
      const dia = new Date(domingo);
      dia.setDate(domingo.getDate() + i);
      semana.push(dia);
    }
    
    setSemanaActual(semana);
    setHoyIndex(diaSemana); // El índice de hoy en el array (0 = Domingo)
  };

  useEffect(() => {
    obtenerSemanaActual();
  }, []);

  const handleCheckInEmocional = (emocion: string, label: string) => {
    setEmocionSeleccionada(emocion);
    setEstadoEmocional(label);
    
    setTimeout(() => {
      setEstadoEmocional(label);
    }, 300);
  };

  const toggleTareaCompletada = (id: number) => {
    setTareasCompletadas(prev => 
      prev.includes(id) 
        ? prev.filter(tareaId => tareaId !== id)
        : [...prev, id]
    );
  };

  const getMensajeEmocional = (emocion: string) => {
    const mensajes = {
      "Feliz": "¡Genial que te sientas feliz! 😄",
      "Neutral": "Todo en calma, está bien 👍",
      "Triste": "Es válido sentirse así 💙",
      "Enojado": "Respira hondo, tú puedes 🌬️",
      "Cansado": "Descansa cuando lo necesites 🛌",
      "Ansioso": "Tómate un momento, todo estará bien 🌈"
    };
    return mensajes[emocion as keyof typeof mensajes] || "¡Gracias por compartir!";
  };

  // Nombres de los días empezando por domingo
  const nombresDias = ["D", "L", "M", "X", "J", "V", "S"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-4 space-y-6">
      {/* Header con saludo personalizado */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center space-x-4">
          <div className="text-4xl animate-bounce">{estudiante.avatar}</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 animate-pulse">
              ¡Hola, {estudiante.nombre}!
            </h1>
            <p className="text-gray-600 mt-1 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-medium">
              {estudiante.curso}
            </p>
          </div>
        </div>
      </div>

      {/* Widget de check-in emocional */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="font-semibold text-gray-700 text-lg mb-4">¿Cómo te sientes hoy?</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {emociones.map(({ emoji, label, color }) => (
            <button
              key={emoji}
              onClick={() => handleCheckInEmocional(emoji, label)}
              className={`
                flex flex-col items-center p-4 rounded-2xl transition-all duration-300 transform
                ${emocionSeleccionada === emoji 
                  ? `${color} scale-110 border-2 border-indigo-300 shadow-md` 
                  : "bg-gray-50 hover:bg-gray-100 hover:scale-105"
                }
              `}
            >
              <span className="text-3xl mb-2">{emoji}</span>
              <span className="text-xs font-medium text-gray-600">{label}</span>
            </button>
          ))}
        </div>
        {estadoEmocional && (
          <div className="animate-fade-in">
            <p className="text-center text-green-600 font-medium p-3 bg-green-50 rounded-xl">
              {getMensajeEmocional(estadoEmocional)}
            </p>
          </div>
        )}
      </div>

      {/* Próximas tareas */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-700 text-lg">Próximas tareas</h3>
          <Link
            to="/tareas"
            className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 transform hover:scale-105"
          >
            Ver todas →
          </Link>
        </div>
        <div className="space-y-3">
          {tareasPendientes.map((tarea) => (
            <div 
              key={tarea.id}
              className={`
                p-4 rounded-xl border-l-4 transition-all duration-300 transform hover:scale-[1.02]
                ${tareasCompletadas.includes(tarea.id) ? 'opacity-60' : ''}
                ${
                  tarea.urgente 
                    ? "border-red-400 bg-gradient-to-r from-red-50 to-orange-50" 
                    : "border-blue-400 bg-gradient-to-r from-blue-50 to-cyan-50"
                }
              `}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3 flex-1">
                  <button
                    onClick={() => toggleTareaCompletada(tarea.id)}
                    className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                      ${tareasCompletadas.includes(tarea.id) 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-green-500'
                      }
                    `}
                  >
                    {tareasCompletadas.includes(tarea.id) && '✓'}
                  </button>
                  <div className="flex-1">
                    <h4 className={`font-medium text-gray-800 ${tareasCompletadas.includes(tarea.id) ? 'line-through' : ''}`}>
                      {tarea.tarea}
                    </h4>
                    <p className="text-sm text-gray-600">{tarea.materia}</p>
                  </div>
                </div>
                <span className={`
                  text-sm font-medium px-2 py-1 rounded-full transition-all duration-200
                  ${tarea.urgente 
                    ? "bg-red-100 text-red-600 hover:bg-red-200" 
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }
                `}>
                  {tarea.fecha}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendario semanal simplificado */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <h3 className="font-semibold text-gray-700 text-lg mb-4">Esta semana</h3>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {semanaActual.map((dia, index) => (
            <div key={index} className="text-center group">
              <div className="text-gray-600 text-sm font-medium">{nombresDias[index]}</div>
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-full mx-auto transition-all duration-200
                group-hover:scale-110
                ${index === hoyIndex 
                  ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                }
              `}>
                {dia.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">Examen de Matemáticas - 10:00 AM</span>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-700">Entrega de proyecto - 3:00 PM</span>
          </div>
        </div>
      </div>

      {/* Notificaciones inmediatas */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="font-semibold text-gray-700 text-lg mb-4">Notificaciones</h3>
        <div className="space-y-3">
          {notificaciones.map((notif) => (
            <div 
              key={notif.id}
              className={`
                p-4 rounded-xl flex items-start space-x-3 transition-all duration-300 transform hover:scale-[1.01]
                ${notif.importante 
                  ? "bg-yellow-50 border-l-4 border-yellow-400 hover:bg-yellow-100" 
                  : "bg-gray-50 hover:bg-gray-100"
                }
              `}
            >
              <div className={`
                text-2xl transition-transform duration-200 hover:scale-110
                ${notif.tipo === "examen" ? "animate-bounce" : "animate-pulse"}
              `}>
                {notif.tipo === "examen" ? "📝" : "📅"}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{notif.mensaje}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {notif.tipo === "examen" ? "Examen próximo" : "Evento escolar"}
                </p>
              </div>
              <button className="text-blue-500 hover:text-blue-700 transition-colors duration-200">
                ✓
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Se ha eliminado la sección de Acceso rápido a módulos */}
    </div>
  );
};

export default DashboardEstudiante;