import React, { useState, useEffect, useRef } from "react";

interface Mensaje {
  id: number;
  remitente: string;
  avatar: string;
  contenido: string;
  fecha: string;
  hora: string;
  leido: boolean;
  tipo: "texto" | "archivo" | "anuncio";
  archivo?: {
    nombre: string;
    tipo: string;
    tamaño: string;
    url: string;
  };
}

interface Chat {
  id: number;
  nombre: string;
  tipo: "profesor" | "tutor" | "anuncios";
  materia?: string;
  avatar: string;
  color: string;
  ultimoMensaje: string;
  ultimaHora: string;
  noLeidos: number;
  enLinea?: boolean;
}

const Mensajes: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      nombre: "Prof. García",
      tipo: "profesor",
      materia: "Matemáticas",
      avatar: "👨‍🏫",
      color: "bg-blue-500",
      ultimoMensaje: "Recuerden llevar la tarea de álgebra",
      ultimaHora: "10:30",
      noLeidos: 2,
      enLinea: true
    },
    {
      id: 2,
      nombre: "Prof. Martínez",
      tipo: "profesor",
      materia: "Historia",
      avatar: "👩‍🏫",
      color: "bg-green-500",
      ultimoMensaje: "El ensayo se entrega el viernes",
      ultimaHora: "09:15",
      noLeidos: 0,
      enLinea: false
    },
    {
      id: 3,
      nombre: "Tutoría 5°A",
      tipo: "tutor",
      materia: "Tutoría",
      avatar: "👥",
      color: "bg-purple-500",
      ultimoMensaje: "Ana: ¿Alguien tiene los ejercicios?",
      ultimaHora: "11:45",
      noLeidos: 5,
      enLinea: true
    },
    {
      id: 4,
      nombre: "Anuncios del Colegio",
      tipo: "anuncios",
      avatar: "📢",
      color: "bg-orange-500",
      ultimoMensaje: "Feria científica este viernes",
      ultimaHora: "08:00",
      noLeidos: 1,
      enLinea: false
    }
  ]);

  const [chatActivo, setChatActivo] = useState<Chat | null>(null);
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mostrarAdjuntos, setMostrarAdjuntos] = useState(false);
  const [vista, setVista] = useState<"chats" | "anuncios">("chats");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mensajes de ejemplo
  useEffect(() => {
    if (chatActivo) {
      const mensajesEjemplo: Mensaje[] = [
        {
          id: 1,
          remitente: chatActivo.nombre,
          avatar: chatActivo.avatar,
          contenido: "¡Hola! ¿Cómo estás?",
          fecha: "2024-01-15",
          hora: "10:25",
          leido: true,
          tipo: "texto"
        },
        {
          id: 2,
          remitente: chatActivo.nombre,
          avatar: chatActivo.avatar,
          contenido: chatActivo.ultimoMensaje,
          fecha: "2024-01-15",
          hora: chatActivo.ultimaHora,
          leido: true,
          tipo: "texto"
        },
        {
          id: 3,
          remitente: "Tú",
          avatar: "👦",
          contenido: "Entendido, gracias por la información",
          fecha: "2024-01-15",
          hora: "10:35",
          leido: true,
          tipo: "texto"
        },
        {
          id: 4,
          remitente: chatActivo.nombre,
          avatar: chatActivo.avatar,
          contenido: "Adjunto el material de estudio para la próxima clase",
          fecha: "2024-01-15",
          hora: "10:40",
          leido: false,
          tipo: "archivo",
          archivo: {
            nombre: "guia_estudio.pdf",
            tipo: "pdf",
            tamaño: "2.4 MB",
            url: "#"
          }
        },
        {
          id: 5,
          remitente: "Tú",
          avatar: "👦",
          contenido: "¡Perfecto! Ya descargué el archivo, muchas gracias",
          fecha: "2024-01-15",
          hora: "10:42",
          leido: true,
          tipo: "texto"
        }
      ];
      setMensajes(mensajesEjemplo);
    }
  }, [chatActivo]);

  // Scroll al final de los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const enviarMensaje = () => {
    if (nuevoMensaje.trim() && chatActivo) {
      const mensaje: Mensaje = {
        id: Date.now(),
        remitente: "Tú",
        avatar: "👦",
        contenido: nuevoMensaje,
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        leido: true,
        tipo: "texto"
      };
      
      setMensajes([...mensajes, mensaje]);
      setNuevoMensaje("");
      
      // Actualizar último mensaje en la lista de chats
      setChats(chats.map(chat => 
        chat.id === chatActivo.id 
          ? { ...chat, ultimoMensaje: nuevoMensaje, ultimaHora: mensaje.hora, noLeidos: 0 }
          : chat
      ));
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && chatActivo) {
      const archivo: Mensaje = {
        id: Date.now(),
        remitente: "Tú",
        avatar: "👦",
        contenido: "Archivo adjunto",
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        leido: true,
        tipo: "archivo",
        archivo: {
          nombre: file.name,
          tipo: file.type.split('/')[1] || 'archivo',
          tamaño: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          url: URL.createObjectURL(file)
        }
      };
      
      setMensajes([...mensajes, archivo]);
      setMostrarAdjuntos(false);
      
      setChats(chats.map(chat => 
        chat.id === chatActivo.id 
          ? { ...chat, ultimoMensaje: "📎 Archivo adjunto", ultimaHora: archivo.hora, noLeidos: 0 }
          : chat
      ));
    }
  };

  const marcarComoLeido = (chatId: number) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, noLeidos: 0 } : chat
    ));
  };

  const getColorChat = (color: string) => {
    const colores: { [key: string]: string } = {
      "bg-blue-500": "bg-blue-500",
      "bg-green-500": "bg-green-500",
      "bg-purple-500": "bg-purple-500",
      "bg-orange-500": "bg-orange-500"
    };
    return colores[color] || "bg-gray-500";
  };

  const getFileIcon = (tipo: string) => {
    switch (tipo) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      case 'mp4':
      case 'avi': return '🎥';
      default: return '📎';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Vista de Lista de Chats - Estilo WhatsApp */}
      {!chatActivo && (
        <div className="h-screen flex flex-col bg-gray-50">
          {/* Header fijo */}
          <div className="bg-green-500 px-4 py-3 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                  👦
                </div>
                <h1 className="text-white font-semibold text-lg">Mensajes</h1>
              </div>
              <div className="flex gap-4">
                <button className="text-white text-xl">🔍</button>
                <button className="text-white text-xl">⋮</button>
              </div>
            </div>
          </div>

          {/* Filtros estilo pestañas */}
          <div className="bg-white border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setVista("chats")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  vista === "chats"
                    ? "border-green-500 text-green-500"
                    : "border-transparent text-gray-500"
                }`}
              >
                CONVERSACIONES
              </button>
              <button
                onClick={() => setVista("anuncios")}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  vista === "anuncios"
                    ? "border-green-500 text-green-500"
                    : "border-transparent text-gray-500"
                }`}
              >
                ANUNCIOS
              </button>
            </div>
          </div>

          {/* Lista de chats - Estilo WhatsApp */}
          <div className="flex-1 overflow-y-auto bg-white">
            {chats
              .filter(chat => vista === "anuncios" ? chat.tipo === "anuncios" : chat.tipo !== "anuncios")
              .map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => {
                    setChatActivo(chat);
                    marcarComoLeido(chat.id);
                  }}
                  className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full ${getColorChat(chat.color)} flex items-center justify-center text-white text-lg`}>
                      {chat.avatar}
                    </div>
                    {chat.enLinea && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">{chat.nombre}</h3>
                      <span className="text-xs text-gray-500">{chat.ultimaHora}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate flex-1 mr-2">
                        {chat.ultimoMensaje}
                      </p>
                      {chat.noLeidos > 0 && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full min-w-6 h-6 flex items-center justify-center">
                          {chat.noLeidos}
                        </span>
                      )}
                    </div>
                    
                    {chat.materia && chat.tipo === "profesor" && (
                      <span className="text-xs text-blue-600 font-medium">
                        {chat.materia}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Estado vacío */}
          {chats.filter(chat => vista === "anuncios" ? chat.tipo === "anuncios" : chat.tipo !== "anuncios").length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-500">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                {vista === "anuncios" ? "No hay anuncios" : "No hay conversaciones"}
              </h3>
              <p className="text-center text-sm">
                {vista === "anuncios" 
                  ? "Los anuncios del colegio aparecerán aquí" 
                  : "Inicia una conversación con tus profesores"
                }
              </p>
            </div>
          )}

          {/* Botón flotante de nuevo chat */}
          <div className="sticky bottom-4 right-4 flex justify-end p-4">
            <button className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110">
              ✏️
            </button>
          </div>
        </div>
      )}

      {/* Vista de Chat Activo - Estilo WhatsApp */}
      {chatActivo && (
        <div className="h-screen flex flex-col bg-gray-100">
          {/* Header del chat */}
          <div className="bg-green-500 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
            <button
              onClick={() => setChatActivo(null)}
              className="text-white text-lg"
            >
              ←
            </button>
            <div className={`w-10 h-10 rounded-full ${getColorChat(chatActivo.color)} flex items-center justify-center text-white`}>
              {chatActivo.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-white font-semibold">{chatActivo.nombre}</h2>
              <p className="text-green-100 text-sm">
                {chatActivo.tipo === "profesor" && chatActivo.materia}
                {chatActivo.tipo === "tutor" && "Grupo de tutoría"}
                {chatActivo.tipo === "anuncios" && "Anuncios oficiales"}
                {chatActivo.enLinea && " • en línea"}
              </p>
            </div>
            <div className="flex gap-4 text-white">
              <button>📹</button>
              <button>📞</button>
              <button>⋮</button>
            </div>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto bg-gray-100 bg-chat-pattern">
            <div className="p-2 space-y-1">
              {mensajes.map((mensaje) => (
                <div
                  key={mensaje.id}
                  className={`flex ${mensaje.remitente === "Tú" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] ${mensaje.remitente === "Tú" ? "ml-auto" : ""}`}>
                    {mensaje.tipo === "texto" ? (
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          mensaje.remitente === "Tú"
                            ? "bg-green-100 text-gray-800 rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                        }`}
                      >
                        <p className="text-sm">{mensaje.contenido}</p>
                        <div className={`text-xs mt-1 ${mensaje.remitente === "Tú" ? "text-gray-500 text-right" : "text-gray-400"}`}>
                          {mensaje.hora}
                          {mensaje.remitente === "Tú" && mensaje.leido && (
                            <span className="ml-1 text-green-500">✓✓</span>
                          )}
                        </div>
                      </div>
                    ) : mensaje.tipo === "archivo" && mensaje.archivo ? (
                      <div
                        className={`rounded-2xl p-3 ${
                          mensaje.remitente === "Tú"
                            ? "bg-green-100 text-gray-800 rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">
                            {getFileIcon(mensaje.archivo.tipo)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{mensaje.archivo.nombre}</p>
                            <p className="text-xs text-gray-500">{mensaje.archivo.tamaño}</p>
                          </div>
                          <button className="text-green-500 hover:text-green-600 p-2 rounded-full transition-colors">
                            ⬇️
                          </button>
                        </div>
                        <div className={`text-xs mt-2 ${mensaje.remitente === "Tú" ? "text-gray-500 text-right" : "text-gray-400"}`}>
                          {mensaje.hora}
                          {mensaje.remitente === "Tú" && mensaje.leido && (
                            <span className="ml-1 text-green-500">✓✓</span>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input de mensaje */}
          {chatActivo.tipo !== "anuncios" && (
            <div className="bg-white border-t border-gray-200 p-3">
              {/* Botones de adjunto */}
              {mostrarAdjuntos && (
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-1 bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-xl transition-colors min-w-20"
                  >
                    <span className="text-2xl">📷</span>
                    <span className="text-xs text-gray-600">Cámara</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-1 bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-xl transition-colors min-w-20"
                  >
                    <span className="text-2xl">🖼️</span>
                    <span className="text-xs text-gray-600">Galería</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-1 bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-xl transition-colors min-w-20"
                  >
                    <span className="text-2xl">📄</span>
                    <span className="text-xs text-gray-600">Documento</span>
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMostrarAdjuntos(!mostrarAdjuntos)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full transition-colors"
                >
                  <span className="text-2xl">➕</span>
                </button>
                
                <div className="flex-1 bg-gray-100 rounded-full">
                  <input
                    type="text"
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                    placeholder="Escribe un mensaje..."
                    className="w-full bg-transparent px-4 py-3 outline-none text-gray-800"
                  />
                </div>
                
                {nuevoMensaje.trim() ? (
                  <button
                    onClick={enviarMensaje}
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors"
                  >
                    <span className="text-lg">➤</span>
                  </button>
                ) : (
                  <button className="text-gray-500 hover:text-gray-700 p-3 rounded-full transition-colors">
                    <span className="text-xl">🎤</span>
                  </button>
                )}
              </div>

              {/* Input de archivo oculto */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="*/*"
              />
            </div>
          )}

          {/* Info para anuncios */}
          {chatActivo.tipo === "anuncios" && (
            <div className="bg-yellow-50 border-t border-yellow-200 p-4">
              <div className="text-center text-yellow-800 text-sm">
                <p className="font-medium">💡 Canal de solo lectura</p>
                <p className="text-yellow-600">Solo el colegio puede publicar anuncios aquí</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mensajes;