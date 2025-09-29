import React, { useState, useEffect } from "react";

interface RegistroEmocional {
  id: number;
  fecha: string;
  emocion: string;
  emoji: string;
  descripcion: string;
  intensidad: number;
  color: string;
}

interface Recurso {
  id: number;
  titulo: string;
  tipo: "ejercicio" | "articulo" | "meditacion";
  duracion: string;
  descripcion: string;
  icono: string;
  color: string;
}

type TipoAlerta = "registro" | "ayuda" | null;

const BienestarEmocional: React.FC = () => {
  const [emocionSeleccionada, setEmocionSeleccionada] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [registros, setRegistros] = useState<RegistroEmocional[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [vista, setVista] = useState<"checkin" | "historial" | "recursos">("checkin");
  const [tipoAlerta, setTipoAlerta] = useState<TipoAlerta>(null);

  // Emociones disponibles
  const emociones = [
    { emoji: "😊", label: "Feliz", color: "bg-yellow-100", colorHex: "#FEF3C7" },
    { emoji: "😐", label: "Neutral", color: "bg-gray-100", colorHex: "#F3F4F6" },
    { emoji: "😢", label: "Triste", color: "bg-blue-100", colorHex: "#DBEAFE" },
    { emoji: "😡", label: "Enojado", color: "bg-red-100", colorHex: "#FEE2E2" },
    { emoji: "😴", label: "Cansado", color: "bg-purple-100", colorHex: "#E9D5FF" },
    { emoji: "😰", label: "Ansioso", color: "bg-orange-100", colorHex: "#FFEDD5" },
    { emoji: "😨", label: "Asustado", color: "bg-indigo-100", colorHex: "#E0E7FF" },
    { emoji: "😍", label: "Emocionado", color: "bg-pink-100", colorHex: "#FCE7F3" }
  ];

  // Recursos de apoyo
  const recursos: Recurso[] = [
    {
      id: 1,
      titulo: "Respiración 4-7-8",
      tipo: "ejercicio",
      duracion: "5 min",
      descripcion: "Técnica de respiración para calmar la ansiedad",
      icono: "🌬️",
      color: "bg-blue-50 border-blue-200"
    },
    {
      id: 2,
      titulo: "Meditación Guiada",
      tipo: "meditacion",
      duracion: "10 min",
      descripcion: "Relajación muscular progresiva",
      icono: "🧘",
      color: "bg-green-50 border-green-200"
    },
    {
      id: 3,
      titulo: "Manejo del Estrés Académico",
      tipo: "articulo",
      duracion: "8 min",
      descripcion: "Estrategias para exámenes y tareas",
      icono: "📚",
      color: "bg-purple-50 border-purple-200"
    },
    {
      id: 4,
      titulo: "Ejercicio de Grounding",
      tipo: "ejercicio",
      duracion: "3 min",
      descripcion: "Conectar con el presente usando los sentidos",
      icono: "🌍",
      color: "bg-orange-50 border-orange-200"
    },
    {
      id: 5,
      titulo: "Dormir Mejor",
      tipo: "articulo",
      duracion: "6 min",
      descripcion: "Hábitos para un sueño reparador",
      icono: "😴",
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      id: 6,
      titulo: "Mindfulness Básico",
      tipo: "meditacion",
      duracion: "7 min",
      descripcion: "Atención plena para principiantes",
      icono: "🌿",
      color: "bg-teal-50 border-teal-200"
    }
  ];

  // Cargar registros de ejemplo
  useEffect(() => {
    const registrosEjemplo: RegistroEmocional[] = [
      {
        id: 1,
        fecha: "2024-01-15",
        emocion: "Feliz",
        emoji: "😊",
        descripcion: "Me fue bien en el examen de matemáticas",
        intensidad: 8,
        color: "#FEF3C7"
      },
      {
        id: 2,
        fecha: "2024-01-14",
        emocion: "Ansioso",
        emoji: "😰",
        descripcion: "Mucha tarea pendiente",
        intensidad: 6,
        color: "#FFEDD5"
      },
      {
        id: 3,
        fecha: "2024-01-13",
        emocion: "Cansado",
        emoji: "😴",
        descripcion: "Dormí poco anoche",
        intensidad: 7,
        color: "#E9D5FF"
      },
      {
        id: 4,
        fecha: "2024-01-12",
        emocion: "Neutral",
        emoji: "😐",
        descripcion: "Día normal de clases",
        intensidad: 5,
        color: "#F3F4F6"
      },
      {
        id: 5,
        fecha: "2024-01-11",
        emocion: "Emocionado",
        emoji: "😍",
        descripcion: "Visita de mi familia",
        intensidad: 9,
        color: "#FCE7F3"
      }
    ];
    setRegistros(registrosEjemplo);
  }, []);

  const mostrarAlertaTemporal = (tipo: TipoAlerta) => {
    setTipoAlerta(tipo);
    setTimeout(() => {
      setTipoAlerta(null);
    }, 4000);
  };

  const registrarEmocion = () => {
    if (emocionSeleccionada) {
      const emocion = emociones.find(e => e.label === emocionSeleccionada);
      const nuevoRegistro: RegistroEmocional = {
        id: Date.now(),
        fecha: new Date().toISOString().split('T')[0],
        emocion: emocionSeleccionada,
        emoji: emocion?.emoji || "😊",
        descripcion: descripcion,
        intensidad: 5,
        color: emocion?.colorHex || "#F3F4F6"
      };
      
      setRegistros([nuevoRegistro, ...registros]);
      setEmocionSeleccionada("");
      setDescripcion("");
      setMostrarFormulario(false);
      mostrarAlertaTemporal("registro");
    }
  };

  const solicitarAyuda = () => {
    // Simular envío de solicitud de ayuda
    mostrarAlertaTemporal("ayuda");
  };

  // Calcular estadísticas para el gráfico
  const estadisticasEmociones = emociones.map(emocion => {
    const count = registros.filter(r => r.emocion === emocion.label).length;
    return {
      ...emocion,
      count,
      percentage: registros.length > 0 ? (count / registros.length) * 100 : 0
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Alertas diferentes según el tipo */}
      {tipoAlerta === "registro" && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down w-80">
          <div className="bg-green-500 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-green-400 rounded-full">
              <span className="text-lg">✅</span>
            </div>
            <div>
              <p className="font-semibold">¡Registro guardado!</p>
            </div>
          </div>
        </div>
      )}

      {tipoAlerta === "ayuda" && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down w-80">
          <div className="bg-blue-500 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-400 rounded-full">
              <span className="text-lg">🆘</span>
            </div>
            <div>
              <p className="font-semibold">¡Solicitud enviada!</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">💚 Bienestar Emocional</h2>
            <p className="text-gray-600 mt-1">Cuida de tu salud mental</p>
          </div>
          
          <button
            onClick={solicitarAyuda}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2"
          >
            <span>🆘</span>
            Solicitar Ayuda
          </button>
        </div>
      </div>

      {/* Navegación */}
      <div className="bg-white rounded-2xl p-2 shadow-lg mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { key: "checkin", label: "Check-in", icon: "😊" },
            { key: "historial", label: "Historial", icon: "📈" },
            { key: "recursos", label: "Recursos", icon: "🧘" }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setVista(item.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                vista === item.key
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vista de Check-in Emocional */}
      {vista === "checkin" && (
        <div className="space-y-6">
          {/* Estado de hoy */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">¿Cómo te sientes hoy?</h3>
            
            {!mostrarFormulario ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">😊</div>
                <p className="text-gray-600 mb-4">Hoy no has registrado tu estado emocional</p>
                <button
                  onClick={() => setMostrarFormulario(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  Registrar Mi Estado
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Selector de emociones */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Selecciona tu emoción:
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {emociones.map((emocion) => (
                      <button
                        key={emocion.label}
                        onClick={() => setEmocionSeleccionada(emocion.label)}
                        className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                          emocionSeleccionada === emocion.label
                            ? `${emocion.color} border-2 border-green-300 scale-105`
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-2xl mb-1">{emocion.emoji}</span>
                        <span className="text-xs font-medium text-gray-700">{emocion.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Quieres agregar alguna nota? (opcional)
                  </label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Ej: Hoy me sentí así porque..."
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                    rows={3}
                  />
                </div>

                {/* Botones */}
                <div className="flex gap-3">
                  <button
                    onClick={registrarEmocion}
                    disabled={!emocionSeleccionada}
                    className={`flex-1 py-3 rounded-xl transition-all duration-200 ${
                      emocionSeleccionada
                        ? "bg-green-500 hover:bg-green-600 text-white transform hover:scale-105"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Guardar Registro
                  </button>
                  <button
                    onClick={() => setMostrarFormulario(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl transition-all duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recordatorio de privacidad */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-blue-500 text-lg">🔒</span>
              <div>
                <h4 className="font-semibold text-blue-800">Tu privacidad está protegida</h4>
                <p className="text-blue-600 text-sm mt-1">
                  Solo tú y tu tutor pueden ver los detalles específicos de tus registros emocionales.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vista de Historial */}
      {vista === "historial" && (
        <div className="space-y-6">
          {/* Gráfico simplificado */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tendencia Emocional</h3>
            <div className="space-y-3">
              {estadisticasEmociones
                .filter(stat => stat.count > 0)
                .map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <span className="text-xl">{stat.emoji}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{stat.label}</span>
                        <span className="text-gray-500">{stat.count} veces</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${stat.percentage}%`,
                            backgroundColor: stat.colorHex
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Lista de registros */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Registros Recientes</h3>
            <div className="space-y-3">
              {registros.map((registro) => (
                <div
                  key={registro.id}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <span className="text-2xl">{registro.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">{registro.emocion}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(registro.fecha).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    {registro.descripcion && (
                      <p className="text-sm text-gray-600 mt-1">{registro.descripcion}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vista de Recursos */}
      {vista === "recursos" && (
        <div className="space-y-6">
          {/* Recursos de apoyo */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recursos de Apoyo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recursos.map((recurso) => (
                <div
                  key={recurso.id}
                  className={`p-4 border rounded-xl transition-all duration-200 transform hover:scale-105 cursor-pointer ${recurso.color}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{recurso.icono}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-gray-800">{recurso.titulo}</h4>
                        <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                          {recurso.duracion}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{recurso.descripcion}</p>
                      <span className="inline-block bg-white bg-opacity-50 px-2 py-1 rounded text-xs font-medium">
                        {recurso.tipo === "ejercicio" && "💪 Ejercicio"}
                        {recurso.tipo === "articulo" && "📖 Artículo"}
                        {recurso.tipo === "meditacion" && "🧘 Meditación"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto de emergencia */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-red-500 text-2xl">🆘</span>
              <div>
                <h4 className="font-semibold text-red-800">¿Necesitas ayuda inmediata?</h4>
                <p className="text-red-600 text-sm mt-1 mb-3">
                  Si estás en crisis o necesitas hablar con alguien urgentemente:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">📞</span>
                    <span className="text-red-700 font-medium">Línea de crisis: 988</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">👨‍🏫</span>
                    <span className="text-red-700 font-medium">Tutor: Prof. García</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">📧</span>
                    <span className="text-red-700 font-medium">tutor@colegio.edu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BienestarEmocional;