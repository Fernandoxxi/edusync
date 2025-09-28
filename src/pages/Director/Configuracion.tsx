import React, { useState } from "react";
import { 
  FiSettings, FiBell, FiMail, FiLock, 
  FiSave, FiRefreshCw, FiShield, 
  FiMessageSquare, FiCalendar
} from "react-icons/fi";

// 🔹 Tipos de props
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface ToggleSettingProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 🔹 Subcomponentes reutilizables
const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = "text", ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      {...props}
    />
  </div>
);

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, value, onChange, placeholder, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder={placeholder}
      {...props}
    />
  </div>
);

const ToggleSetting: React.FC<ToggleSettingProps> = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div>
      <div className="font-semibold">{label}</div>
      {description && <div className="text-sm text-gray-600">{description}</div>}
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full 
        peer peer-checked:after:translate-x-full peer-checked:after:border-white 
        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
        after:transition-all peer-checked:bg-blue-600">
      </div>
    </label>
  </div>
);

const defaultSettings = {
  platformName: "EduSync",
  institutionName: "Institución Educativa",
  academicYear: "2025",
  timezone: "America/Lima", // 🔹 Perú
  language: "es",
  maintenanceMode: false,
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  lowGradesAlert: true,
  attendanceAlerts: true,
  systemUpdates: true,
  welcomeEmail: "Bienvenido a nuestra plataforma educativa...",
  gradeNotification: "Se ha actualizado su calificación...",
  attendanceAlert: "Se ha registrado una falta de asistencia...",
  passwordMinLength: 8,
  requireSpecialChars: true,
  sessionTimeout: 30,
  twoFactorAuth: false,
  loginAttempts: 5,
  dataRetention: 365
};

const Configuracion: React.FC = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState(defaultSettings);

  const handleSaveSettings = () => {
    console.log("Configuración guardada:", settings);
    alert("✅ Configuración guardada exitosamente");
  };

  const handleResetSettings = () => {
    if (confirm("¿Restaurar configuración por defecto?")) {
      setSettings(defaultSettings);
      alert("⚠️ Configuración restaurada a los valores iniciales");
    }
  };

  const sections = [
    { id: "general", name: "⚙️ General", icon: <FiSettings /> },
    { id: "notifications", name: "🔔 Notificaciones", icon: <FiBell /> },
    { id: "templates", name: "📋 Plantillas", icon: <FiMail /> },
    { id: "security", name: "🔒 Seguridad", icon: <FiLock /> }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuración del Sistema</h1>
          <p className="text-gray-600">Administra la configuración general de la plataforma EduSync</p>
        </div>
        <div className="flex gap-2 mt-4 lg:mt-0">
          <button 
            onClick={handleResetSettings} 
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <FiRefreshCw /> Restaurar
          </button>
          <button 
            onClick={handleSaveSettings} 
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FiSave /> Guardar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow border">
        <div className="flex overflow-x-auto">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition whitespace-nowrap ${
                activeSection === section.id
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {section.icon} {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Secciones */}
      {activeSection === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FiSettings /> Información</h3>
            <div className="space-y-4">
              <InputField label="Nombre de la Plataforma" value={settings.platformName} onChange={e => setSettings({...settings, platformName: e.target.value})}/>
              <InputField label="Nombre de la Institución" value={settings.institutionName} onChange={e => setSettings({...settings, institutionName: e.target.value})}/>
              <InputField label="Año Académico" value={settings.academicYear} onChange={e => setSettings({...settings, academicYear: e.target.value})}/>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FiCalendar /> Regional</h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-2">Zona Horaria</label>
              <select 
                value={settings.timezone} 
                onChange={e => setSettings({...settings, timezone: e.target.value})} 
                className="w-full p-3 border rounded-lg"
              >
                <option value="America/Lima">Lima (Perú)</option>
                <option value="America/Bogota">Bogotá</option>
                <option value="America/Mexico_City">Ciudad de México</option>
                <option value="Europe/Madrid">Madrid</option>
              </select>
              <label className="block text-sm font-medium mb-2">Idioma</label>
              <select 
                value={settings.language} 
                onChange={e => setSettings({...settings, language: e.target.value})} 
                className="w-full p-3 border rounded-lg"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
              <ToggleSetting 
                label="Modo Mantenimiento" 
                description="La plataforma no estará disponible" 
                checked={settings.maintenanceMode} 
                onChange={e => setSettings({...settings, maintenanceMode: e.target.checked})}
              />
            </div>
          </div>
        </div>
      )}

      {activeSection === "notifications" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FiBell /> Canales</h3>
            {[
              { key: "emailNotifications", label: "Email", description: "Notificaciones vía correo" },
              { key: "pushNotifications", label: "Push", description: "Notificaciones en la plataforma" },
              { key: "smsNotifications", label: "SMS", description: "Mensajes de texto (costo adicional)" }
            ].map(n => (
              <ToggleSetting 
                key={n.key} 
                label={n.label} 
                description={n.description} 
                checked={settings[n.key as keyof typeof settings] as boolean} 
                onChange={e => setSettings({...settings, [n.key]: e.target.checked})}
              />
            ))}
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FiMessageSquare /> Alertas</h3>
            {[
              { key: "lowGradesAlert", label: "Bajo Rendimiento", description: "Alertar calificaciones bajas" },
              { key: "attendanceAlerts", label: "Asistencia", description: "Alertar faltas de asistencia" },
              { key: "systemUpdates", label: "Sistema", description: "Notificar actualizaciones" }
            ].map(a => (
              <ToggleSetting 
                key={a.key} 
                label={a.label} 
                description={a.description} 
                checked={settings[a.key as keyof typeof settings] as boolean} 
                onChange={e => setSettings({...settings, [a.key]: e.target.checked})}
              />
            ))}
          </div>
        </div>
      )}

      {activeSection === "templates" && (
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><FiMail /> Plantillas</h3>
          <div className="space-y-6">
            <TextAreaField label="Email de Bienvenida" value={settings.welcomeEmail} onChange={e => setSettings({...settings, welcomeEmail: e.target.value})} placeholder="Plantilla para emails de bienvenida..."/>
            <TextAreaField label="Notificación de Calificaciones" value={settings.gradeNotification} onChange={e => setSettings({...settings, gradeNotification: e.target.value})} placeholder="Plantilla para calificaciones..."/>
            <TextAreaField label="Alerta de Asistencia" value={settings.attendanceAlert} onChange={e => setSettings({...settings, attendanceAlert: e.target.value})} placeholder="Plantilla para alertas de asistencia..."/>
          </div>
        </div>
      )}

      {activeSection === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FiShield /> Contraseñas</h3>
            <InputField label="Longitud mínima" type="number" value={settings.passwordMinLength} onChange={e => setSettings({...settings, passwordMinLength: +e.target.value})} min="6" max="20"/>
            <ToggleSetting label="Caracteres especiales" description="Requerir caracteres especiales" checked={settings.requireSpecialChars} onChange={e => setSettings({...settings, requireSpecialChars: e.target.checked})}/>
            <InputField label="Intentos de login permitidos" type="number" value={settings.loginAttempts} onChange={e => setSettings({...settings, loginAttempts: +e.target.value})} min="3" max="10"/>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><FiLock /> Seguridad</h3>
            <InputField label="Expiración de sesión (minutos)" type="number" value={settings.sessionTimeout} onChange={e => setSettings({...settings, sessionTimeout: +e.target.value})} min="15" max="120"/>
            <ToggleSetting label="Autenticación 2FA" description="Requerir 2FA para admins" checked={settings.twoFactorAuth} onChange={e => setSettings({...settings, twoFactorAuth: e.target.checked})}/>
            <InputField label="Retención de datos (días)" type="number" value={settings.dataRetention} onChange={e => setSettings({...settings, dataRetention: +e.target.value})} min="30" max="730"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuracion;
