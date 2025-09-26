import React, { useState } from "react";
import { 
  FiBook, FiCalendar, FiUsers, FiBarChart2, FiPlus, 
  FiSearch, FiEdit, FiTrash2, FiX, FiTrendingUp,
  FiPieChart, FiActivity, FiClock, FiMapPin
} from "react-icons/fi";

// Types
interface Course {
  id: number;
  name: string;
  grade: string;
  section: string;
  subject: string;
  professor: string;
  professorId: number;
  classroom: string;
  studentCount: number;
  status: "active" | "inactive";
  performance: number;
  attendance: number;
  passingRate: number;
}

interface Professor {
  id: number;
  name: string;
  email: string;
  subjects: string[];
  assignedCourses: number;
  maxCourses: number;
}

interface AcademicEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  type: "curricular" | "evaluation" | "event" | "administrative";
  status: "pending" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  time?: string;
  location?: string;
}

const ControlAcademico: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"courses" | "analytics" | "planning">("courses");
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<AcademicEvent | null>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Datos mock mejorados
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Matemáticas 3ro A",
      grade: "3ro",
      section: "A",
      subject: "Matemáticas",
      professor: "Carlos Ruiz",
      professorId: 1,
      classroom: "Aula 301",
      studentCount: 32,
      status: "active",
      performance: 85,
      attendance: 92,
      passingRate: 88
    },
    {
      id: 2,
      name: "Ciencias 4to B",
      grade: "4to",
      section: "B",
      subject: "Ciencias",
      professor: "María González",
      professorId: 2,
      classroom: "Laboratorio 2",
      studentCount: 28,
      status: "active",
      performance: 78,
      attendance: 85,
      passingRate: 82
    },
    {
      id: 3,
      name: "Lenguaje 2do C",
      grade: "2do",
      section: "C",
      subject: "Lenguaje",
      professor: "Ana Torres",
      professorId: 3,
      classroom: "Aula 205",
      studentCount: 30,
      status: "active",
      performance: 92,
      attendance: 95,
      passingRate: 94
    },
    {
      id: 4,
      name: "Historia 5to A",
      grade: "5to",
      section: "A",
      subject: "Historia",
      professor: "Roberto Sánchez",
      professorId: 4,
      classroom: "Aula 401",
      studentCount: 25,
      status: "active",
      performance: 65,
      attendance: 78,
      passingRate: 70
    }
  ]);

  const [professors, setProfessors] = useState<Professor[]>([
    {
      id: 1,
      name: "Carlos Ruiz",
      email: "carlos@edu.com",
      subjects: ["Matemáticas", "Física"],
      assignedCourses: 1,
      maxCourses: 5
    },
    {
      id: 2,
      name: "María González",
      email: "maria@edu.com",
      subjects: ["Ciencias", "Biología"],
      assignedCourses: 1,
      maxCourses: 4
    },
    {
      id: 3,
      name: "Ana Torres",
      email: "ana@edu.com",
      subjects: ["Lenguaje", "Literatura"],
      assignedCourses: 1,
      maxCourses: 6
    },
    {
      id: 4,
      name: "Roberto Sánchez",
      email: "roberto@edu.com",
      subjects: ["Historia", "Geografía"],
      assignedCourses: 1,
      maxCourses: 4
    }
  ]);

  const [academicEvents, setAcademicEvents] = useState<AcademicEvent[]>([
    {
      id: 1,
      title: "Inicio de Clases",
      description: "Inicio del año académico 2024",
      date: "2024-01-15",
      type: "curricular",
      status: "completed",
      priority: "high"
    },
    {
      id: 2,
      title: "Evaluación Parcial 1",
      description: "Primera evaluación parcial de todos los cursos",
      date: "2024-03-15",
      type: "evaluation",
      status: "pending",
      priority: "high",
      time: "08:00 - 12:00"
    },
    {
      id: 3,
      title: "Jornada de Puertas Abiertas",
      description: "Evento para padres y nuevos estudiantes",
      date: "2024-05-20",
      type: "event",
      status: "pending",
      priority: "medium",
      location: "Auditorio Principal"
    },
    {
      id: 4,
      title: "Reunión de Consejo Académico",
      description: "Reunión mensual del consejo académico",
      date: "2024-04-10",
      type: "administrative",
      status: "in-progress",
      priority: "high",
      time: "14:00 - 16:00",
      location: "Sala de Conferencias"
    },
    {
      id: 5,
      title: "Vacaciones de Medio Año",
      description: "Periodo de vacaciones para estudiantes y profesores",
      date: "2024-07-01",
      type: "curricular",
      status: "pending",
      priority: "medium"
    },
    {
      id: 6,
      title: "Evaluación Final",
      description: "Evaluación final del año académico",
      date: "2024-11-25",
      type: "evaluation",
      status: "pending",
      priority: "high",
      time: "08:00 - 13:00"
    }
  ]);

  // Funcionalidades CRUD para cursos
  const handleCreateCourse = (courseData: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...courseData,
      id: Math.max(0, ...courses.map(c => c.id)) + 1,
    };
    setCourses([...courses, newCourse]);
    
    setProfessors(professors.map(p => 
      p.id === courseData.professorId 
        ? { ...p, assignedCourses: p.assignedCourses + 1 }
        : p
    ));
    
    setIsCourseModalOpen(false);
  };

  const handleUpdateCourse = (courseData: Course) => {
    const oldProfessorId = courses.find(c => c.id === courseData.id)?.professorId;
    
    setCourses(courses.map(c => c.id === courseData.id ? courseData : c));
    
    if (oldProfessorId && oldProfessorId !== courseData.professorId) {
      setProfessors(professors.map(p => {
        if (p.id === oldProfessorId) {
          return { ...p, assignedCourses: p.assignedCourses - 1 };
        }
        if (p.id === courseData.professorId) {
          return { ...p, assignedCourses: p.assignedCourses + 1 };
        }
        return p;
      }));
    }
    
    setIsCourseModalOpen(false);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (courseId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este curso?")) {
      const course = courses.find(c => c.id === courseId);
      setCourses(courses.filter(c => c.id !== courseId));
      
      if (course) {
        setProfessors(professors.map(p => 
          p.id === course.professorId 
            ? { ...p, assignedCourses: p.assignedCourses - 1 }
            : p
        ));
      }
    }
  };

  // Funcionalidades CRUD para eventos del calendario
  const handleCreateEvent = (eventData: Omit<AcademicEvent, "id">) => {
    const newEvent: AcademicEvent = {
      ...eventData,
      id: Math.max(0, ...academicEvents.map(e => e.id)) + 1,
    };
    setAcademicEvents([...academicEvents, newEvent]);
    setIsEventModalOpen(false);
  };

  const handleUpdateEvent = (eventData: AcademicEvent) => {
    setAcademicEvents(academicEvents.map(e => e.id === eventData.id ? eventData : e));
    setIsEventModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      setAcademicEvents(academicEvents.filter(e => e.id !== eventId));
      setIsEventModalOpen(false);
      setSelectedEvent(null);
    }
  };

  // Componente Modal de Curso
  const CourseModal: React.FC<{
    course?: Course | null;
    professors: Professor[];
    onClose: () => void;
    onSubmit: (courseData: any) => void;
  }> = ({ course, professors, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: "",
      grade: "3ro",
      section: "A",
      subject: "Matemáticas",
      professorId: "",
      classroom: "",
      studentCount: 0,
      status: "active" as Course["status"]
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const courseName = `${formData.subject} ${formData.grade} ${formData.section}`;
      onSubmit({ ...formData, name: courseName });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">{course ? "Editar Curso" : "Nuevo Curso"}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Grado</label>
                <select 
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  {["1ro", "2do", "3ro", "4to", "5to"].map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sección</label>
                <select 
                  value={formData.section}
                  onChange={(e) => setFormData({...formData, section: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  {["A", "B", "C", "D"].map(section => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Materia</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full p-2 border rounded-lg"
              >
                {["Matemáticas", "Ciencias", "Lenguaje", "Inglés", "Historia", "Geografía", "Física", "Química"].map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Profesor</label>
              <select 
                value={formData.professorId}
                onChange={(e) => setFormData({...formData, professorId: e.target.value})}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Seleccionar profesor</option>
                {professors.map(prof => (
                  <option key={prof.id} value={prof.id}>
                    {prof.name} ({prof.assignedCourses}/{prof.maxCourses} cursos)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Aula</label>
                <input 
                  type="text"
                  value={formData.classroom}
                  onChange={(e) => setFormData({...formData, classroom: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Ej: Aula 301"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Estudiantes</label>
                <input 
                  type="number"
                  value={formData.studentCount}
                  onChange={(e) => setFormData({...formData, studentCount: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 p-2 bg-gray-100 rounded-lg">
                Cancelar
              </button>
              <button type="submit" className="flex-1 p-2 bg-blue-600 text-white rounded-lg">
                {course ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Componente Modal de Evento del Calendario
  const EventModal: React.FC<{
    event?: AcademicEvent | null;
    onClose: () => void;
    onSubmit: (eventData: any) => void;
    onDelete?: (eventId: number) => void;
  }> = ({ event, onClose, onSubmit, onDelete }) => {
    const [formData, setFormData] = useState({
      title: event?.title || "",
      description: event?.description || "",
      date: event?.date || "",
      type: event?.type || "curricular" as AcademicEvent["type"],
      status: event?.status || "pending" as AcademicEvent["status"],
      priority: event?.priority || "medium" as AcademicEvent["priority"],
      time: event?.time || "",
      location: event?.location || ""
    });

    React.useEffect(() => {
      if (event) {
        setFormData({
          title: event.title,
          description: event.description,
          date: event.date,
          type: event.type,
          status: event.status,
          priority: event.priority,
          time: event.time || "",
          location: event.location || ""
        });
      }
    }, [event]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const eventData = event ? { ...formData, id: event.id } : formData;
      onSubmit(eventData);
    };

    const handleDelete = () => {
      if (event && onDelete) {
        onDelete(event.id);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">{event ? "Editar Evento" : "Nuevo Evento"}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título del Evento</label>
              <input 
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border rounded-lg"
                placeholder="Ej: Evaluación Parcial de Matemáticas"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Descripción detallada del evento..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hora (opcional)</label>
                <input 
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Ej: 08:00 - 10:00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ubicación (opcional)</label>
              <input 
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-2 border rounded-lg"
                placeholder="Ej: Aula 301, Auditorio Principal"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as AcademicEvent["type"]})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="curricular">Curricular</option>
                  <option value="evaluation">Evaluación</option>
                  <option value="event">Evento</option>
                  <option value="administrative">Administrativo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as AcademicEvent["status"]})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="pending">Pendiente</option>
                  <option value="in-progress">En Progreso</option>
                  <option value="completed">Completado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prioridad</label>
                <select 
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value as AcademicEvent["priority"]})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {event && onDelete && (
                <button 
                  type="button" 
                  onClick={handleDelete}
                  className="flex-1 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              )}
              <button type="button" onClick={onClose} className="flex-1 p-2 bg-gray-100 rounded-lg">
                Cancelar
              </button>
              <button type="submit" className="flex-1 p-2 bg-green-600 text-white rounded-lg">
                {event ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Componente de Calendario Anual Interactivo
  const AcademicCalendar: React.FC = () => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const getEventsForMonth = (monthIndex: number) => {
      return academicEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === monthIndex && eventDate.getFullYear() === currentYear;
      });
    };

    const getEventColor = (type: AcademicEvent["type"]) => {
      switch (type) {
        case "curricular": return "bg-blue-100 border-blue-300 text-blue-800";
        case "evaluation": return "bg-red-100 border-red-300 text-red-800";
        case "event": return "bg-green-100 border-green-300 text-green-800";
        case "administrative": return "bg-purple-100 border-purple-300 text-purple-800";
        default: return "bg-gray-100 border-gray-300 text-gray-800";
      }
    };

    const getPriorityIcon = (priority: AcademicEvent["priority"]) => {
      switch (priority) {
        case "high": return "🔴";
        case "medium": return "🟡";
        case "low": return "🟢";
        default: return "⚪";
      }
    };

    return (
      <div className="space-y-6">
        {/* Controles del Calendario */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Calendario Académico {currentYear}</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentYear(currentYear - 1)}
              className="px-3 py-1 border rounded-lg hover:bg-gray-50 transition"
            >
              ← Año Anterior
            </button>
            <button 
              onClick={() => setCurrentYear(currentYear + 1)}
              className="px-3 py-1 border rounded-lg hover:bg-gray-50 transition"
            >
              Año Siguiente →
            </button>
          </div>
        </div>

        {/* Grid de Meses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.map((month, monthIndex) => {
            const monthEvents = getEventsForMonth(monthIndex);
            return (
              <div key={month} className="bg-white border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900">{month}</h4>
                  <span className="text-sm text-gray-500">{monthEvents.length} eventos</span>
                </div>
                
                <div className="space-y-2">
                  {monthEvents.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No hay eventos programados</p>
                  ) : (
                    monthEvents.map(event => (
                      <div 
                        key={event.id}
                        className={`p-2 border-l-4 rounded-r cursor-pointer hover:shadow-sm transition ${getEventColor(event.type)}`}
                        onClick={() => {
                          setSelectedEvent(event);
                          setIsEventModalOpen(true);
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-xs">{getPriorityIcon(event.priority)}</span>
                              <span className="font-medium text-sm">{event.title}</span>
                            </div>
                            <div className="text-xs opacity-75">
                              {new Date(event.date).getDate()} {month} • {event.type}
                            </div>
                            {event.time && (
                              <div className="text-xs opacity-75 flex items-center gap-1">
                                <FiClock size={10} /> {event.time}
                              </div>
                            )}
                            {event.location && (
                              <div className="text-xs opacity-75 flex items-center gap-1">
                                <FiMapPin size={10} /> {event.location}
                              </div>
                            )}
                          </div>
                          <span className={`text-xs px-1 rounded ${
                            event.status === "completed" ? "bg-green-200 text-green-800" :
                            event.status === "in-progress" ? "bg-blue-200 text-blue-800" :
                            "bg-gray-200 text-gray-800"
                          }`}>
                            {event.status === "completed" ? "✓" : event.status === "in-progress" ? "⏳" : "📅"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Leyenda del Calendario */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Leyenda del Calendario</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Curricular</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Evaluación</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Evento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span>Administrativo</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filtrado y estadísticas
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === "all" || course.grade === gradeFilter;
    const matchesSubject = subjectFilter === "all" || course.subject === subjectFilter;
    return matchesSearch && matchesGrade && matchesSubject;
  });

  // Estadísticas avanzadas
  const stats = {
    totalCourses: courses.length,
    activeCourses: courses.filter(c => c.status === "active").length,
    totalStudents: courses.reduce((sum, course) => sum + course.studentCount, 0),
    averagePerformance: courses.length > 0 ? 
      courses.reduce((sum, course) => sum + course.performance, 0) / courses.length : 0,
    averageAttendance: courses.length > 0 ? 
      courses.reduce((sum, course) => sum + course.attendance, 0) / courses.length : 0,
    averagePassingRate: courses.length > 0 ? 
      courses.reduce((sum, course) => sum + course.passingRate, 0) / courses.length : 0
  };

  // Datos para gráficos
  const performanceBySubject = courses.reduce((acc, course) => {
    acc[course.subject] = (acc[course.subject] || 0) + course.performance;
    return acc;
  }, {} as Record<string, number>);

  const subjectCounts = courses.reduce((acc, course) => {
    acc[course.subject] = (acc[course.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageBySubject = Object.keys(performanceBySubject).map(subject => ({
    subject,
    average: performanceBySubject[subject] / subjectCounts[subject]
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Control Académico</h1>
          <p className="text-gray-600">Gestión integral de cursos, analytics y planificación académica</p>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="bg-white rounded-xl shadow border border-gray-100">
        <div className="flex overflow-x-auto">
          {[
            { id: "courses", label: "📚 Cursos y Materias", icon: <FiBook /> },
            { id: "analytics", label: "📊 Analytics", icon: <FiBarChart2 /> },
            { id: "planning", label: "📅 Calendario Académico", icon: <FiCalendar /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition whitespace-nowrap ${
                activeTab === tab.id
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

      {/* Contenido de las pestañas */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          {/* Filtros y Búsqueda */}
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar curso, materia o profesor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select 
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos los grados</option>
                  {["1ro", "2do", "3ro", "4to", "5to"].map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                
                <select 
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas las materias</option>
                  {["Matemáticas", "Ciencias", "Lenguaje", "Inglés", "Historia", "Geografía", "Física", "Química"].map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                
          <button 
            onClick={() => setIsCourseModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiPlus />
            Nuevo Curso
          </button>
       
              </div>
            </div>
          </div>

          {/* Tabla de Cursos */}
          <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Curso</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profesor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aula</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estudiantes</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rendimiento</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCourses.map(course => (
                    <tr key={course.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{course.name}</p>
                          <p className="text-sm text-gray-500">{course.grade} {course.section}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium">{course.professor}</p>
                        <p className="text-sm text-gray-500">{course.subject}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {course.classroom}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {course.studentCount} estudiantes
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                course.performance >= 80 ? "bg-green-500" :
                                course.performance >= 60 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${course.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{course.performance}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedCourse(course);
                              setIsCourseModalOpen(true);
                            }}
                            className="p-1 text-blue-600 hover:text-blue-800 transition"
                            title="Editar curso"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="p-1 text-red-600 hover:text-red-800 transition"
                            title="Eliminar curso"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* Estadísticas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalCourses}</div>
                  <div className="text-sm text-gray-600">Total Cursos</div>
                </div>
                <FiBook className="text-blue-400 text-xl" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.totalStudents}</div>
                  <div className="text-sm text-gray-600">Total Estudiantes</div>
                </div>
                <FiUsers className="text-green-400 text-xl" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.averagePerformance.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Rendimiento Promedio</div>
                </div>
                <FiTrendingUp className="text-purple-400 text-xl" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{stats.averageAttendance.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">Asistencia Promedio</div>
                </div>
                <FiActivity className="text-orange-400 text-xl" />
              </div>
            </div>
          </div>

          {/* Gráficos y Análisis Detallados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rendimiento por Materia */}
            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiPieChart />
                Rendimiento por Materia
              </h3>
              <div className="space-y-4">
                {averageBySubject.map((item) => (
                  <div key={item.subject} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.subject}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.average >= 80 ? "bg-green-500" :
                            item.average >= 60 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${item.average}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12">{item.average.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Cursos por Rendimiento */}
            <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiTrendingUp />
                Top Cursos por Rendimiento
              </h3>
              <div className="space-y-3">
                {[...courses]
                  .sort((a, b) => b.performance - a.performance)
                  .slice(0, 5)
                  .map((course, index) => (
                    <div key={course.id} className="flex items-center justify-between p-2 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{course.name}</div>
                        <div className="text-xs text-gray-600">{course.professor}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {index === 0 && <FiTrendingUp className="text-green-500" />}
                        <span className={`font-medium ${
                          course.performance >= 80 ? "text-green-600" :
                          course.performance >= 60 ? "text-yellow-600" : "text-red-600"
                        }`}>
                          {course.performance}%
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Análisis Detallado */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Métricas Detalladas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.averagePassingRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Tasa de Aprobación</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {courses.filter(c => c.performance >= 70).length}
                </div>
                <div className="text-sm text-gray-600">Cursos con Buen Rendimiento</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {courses.filter(c => c.performance < 60).length}
                </div>
                <div className="text-sm text-gray-600">Cursos que Necesitan Atención</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "planning" && (
        <div className="space-y-6">
          {/* Header del Calendario */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Calendario Académico Anual</h3>
            <button 
              onClick={() => {
                setSelectedEvent(null);
                setIsEventModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FiPlus />
              Nuevo Evento
            </button>
          </div>

          {/* Calendario Académico Interactivo */}
          <AcademicCalendar />
        </div>
      )}

      {/* Modales */}
      {isCourseModalOpen && (
        <CourseModal
          course={selectedCourse}
          professors={professors}
          onClose={() => {
            setIsCourseModalOpen(false);
            setSelectedCourse(null);
          }}
          onSubmit={selectedCourse ? handleUpdateCourse : handleCreateCourse}
        />
      )}

      {isEventModalOpen && (
        <EventModal
          event={selectedEvent}
          onClose={() => {
            setIsEventModalOpen(false);
            setSelectedEvent(null);
          }}
          onSubmit={selectedEvent ? handleUpdateEvent : handleCreateEvent}
          onDelete={selectedEvent ? handleDeleteEvent : undefined}
        />
      )}
    </div>
  );
};

export default ControlAcademico;