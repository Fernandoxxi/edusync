import React, { useState } from "react";
import { 
  FiUsers, FiUserPlus, FiDownload, FiUpload, FiSearch, 
  FiFilter,
  FiBarChart2, FiActivity, FiMail, FiUserCheck, FiUserX
} from "react-icons/fi";

// Componentes
import UserTable from "../../components/UserTable";
import UserModal from "../../components/UserModal";
import ImportModal from "../../components/ImportModal";
import StatisticsCard from "../../components/StatisticsCard";
import PermissionManager from "../../components/PermissionManager";

// Types
interface User {
  id: number;
  name: string;
  role: "Estudiante" | "Profesor" | "Padre" | "Administrador";
  email: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

interface UserStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  byRole: {
    Estudiante: number;
    Profesor: number;
    Padre: number;
    Administrador: number;
  };
}

const GestionUsuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Ana Torres", role: "Estudiante", email: "ana@edu.com", status: "active", lastLogin: "2024-01-15", createdAt: "2024-01-01", permissions: ["view_grades", "view_courses"] },
    { id: 2, name: "Carlos Ruiz", role: "Profesor", email: "carlos@edu.com", status: "active", lastLogin: "2024-01-14", createdAt: "2024-01-01", permissions: ["manage_grades", "manage_courses", "view_students"] },
    { id: 3, name: "María López", role: "Padre", email: "maria@edu.com", status: "pending", lastLogin: "2024-01-10", createdAt: "2024-01-05", permissions: ["view_grades"] },
    { id: 4, name: "Pedro García", role: "Administrador", email: "pedro@edu.com", status: "active", lastLogin: "2024-01-15", createdAt: "2024-01-01", permissions: ["all"] },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "stats">("list");

  // Estadísticas
  const stats: UserStats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length,
    pending: users.filter(u => u.status === "pending").length,
    byRole: {
      Estudiante: users.filter(u => u.role === "Estudiante").length,
      Profesor: users.filter(u => u.role === "Profesor").length,
      Padre: users.filter(u => u.role === "Padre").length,
      Administrador: users.filter(u => u.role === "Administrador").length,
    }
  };

  // Filtrado de usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // CRUD Operations
  const handleCreateUser = (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
    };
    setUsers([...users, newUser]);
    setIsUserModalOpen(false);
  };

  const handleUpdateUser = (userData: User) => {
    setUsers(users.map(u => u.id === userData.id ? userData : u));
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === "active" ? "inactive" : "active" }
        : u
    ));
  };

  const handleImportUsers = (importedUsers: Omit<User, "id">[]) => {
    const newUsers = importedUsers.map((user, index) => ({
      ...user,
      id: Math.max(...users.map(u => u.id)) + index + 1,
    }));
    setUsers([...users, ...newUsers]);
    setIsImportModalOpen(false);
  };

  const handleExportUsers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Nombre,Email,Rol,Estado,Último Acceso\n"
      + users.map(u => `"${u.name}","${u.email}","${u.role}","${u.status}","${u.lastLogin}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios_plataforma.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra usuarios, permisos y actividad de la plataforma</p>
        </div>
        
        <div className="flex gap-2 mt-4 lg:mt-0">
          <button 
            onClick={() => setViewMode(viewMode === "list" ? "stats" : "list")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <FiBarChart2 />
            {viewMode === "list" ? "Ver Estadísticas" : "Ver Lista"}
          </button>
          <button 
            onClick={handleExportUsers}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FiDownload />
            Exportar CSV
          </button>
          <button 
            onClick={() => setIsUserModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiUserPlus />
            Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      {viewMode === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatisticsCard
            title="Total Usuarios"
            value={stats.total.toString()}
            icon={<FiUsers />}
            color="bg-blue-100 text-blue-600"
            change={`${stats.active} activos`}
          />
          <StatisticsCard
            title="Profesores"
            value={stats.byRole.Profesor.toString()}
            icon={<FiUserCheck />}
            color="bg-green-100 text-green-600"
            change={`${Math.round((stats.byRole.Profesor / stats.total) * 100)}% del total`}
          />
          <StatisticsCard
            title="Estudiantes"
            value={stats.byRole.Estudiante.toString()}
            icon={<FiActivity />}
            color="bg-purple-100 text-purple-600"
            change={`${Math.round((stats.byRole.Estudiante / stats.total) * 100)}% del total`}
          />
          <StatisticsCard
            title="Pendientes"
            value={stats.pending.toString()}
            icon={<FiUserX />}
            color="bg-yellow-100 text-yellow-600"
            change={`${Math.round((stats.pending / stats.total) * 100)}% del total`}
          />
        </div>
      )}

      {/* Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los roles</option>
              <option value="Estudiante">Estudiantes</option>
              <option value="Profesor">Profesores</option>
              <option value="Padre">Padres</option>
              <option value="Administrador">Administradores</option>
            </select>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="pending">Pendientes</option>
            </select>
            
            <button 
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
                setStatusFilter("all");
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <FiFilter />
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      {viewMode === "list" && (
        <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
          <UserTable 
            users={filteredUsers}
            onEdit={(user) => {
              setSelectedUser(user);
              setIsUserModalOpen(true);
            }}
            onDelete={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
            onManagePermissions={(user) => {
              setSelectedUser(user);
              setIsPermissionModalOpen(true);
            }}
          />
        </div>
      )}

      {/* Panel de Importación Masiva */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FiUpload />
            Importación Masiva
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Carga archivos CSV para agregar múltiples usuarios. El archivo debe incluir: nombre, email, rol.
          </p>
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Importar CSV
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FiMail />
            Comunicación Masiva
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Envía notificaciones por email a grupos de usuarios seleccionados.
          </p>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Enviar Notificaciones
          </button>
        </div>
      </div>

      {/* Modales */}
      {isUserModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setIsUserModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        />
      )}

      {isImportModalOpen && (
        <ImportModal
          onClose={() => setIsImportModalOpen(false)}
          onImport={handleImportUsers}
        />
      )}

      {isPermissionModalOpen && selectedUser && (
        <PermissionManager
          user={selectedUser}
          onClose={() => {
            setIsPermissionModalOpen(false);
            setSelectedUser(null);
          }}
          onUpdate={(updatedUser) => {
            setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
            setIsPermissionModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default GestionUsuarios;