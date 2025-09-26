import React from "react";
import { FiEdit, FiTrash2, FiLock, FiUnlock, FiKey } from "react-icons/fi";

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

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onToggleStatus: (userId: number) => void;
  onManagePermissions: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  onEdit, 
  onDelete, 
  onToggleStatus,
  onManagePermissions 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrador": return "bg-purple-100 text-purple-800";
      case "Profesor": return "bg-blue-100 text-blue-800";
      case "Estudiante": return "bg-green-100 text-green-800";
      case "Padre": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Último Acceso
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-4">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                  {user.status === "active" ? "Activo" : user.status === "inactive" ? "Inactivo" : "Pendiente"}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-500">
                {new Date(user.lastLogin).toLocaleDateString('es-ES')}
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onManagePermissions(user)}
                    className="p-1 text-blue-600 hover:text-blue-800 transition"
                    title="Gestionar permisos"
                  >
                    <FiKey size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1 text-green-600 hover:text-green-800 transition"
                    title="Editar usuario"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => onToggleStatus(user.id)}
                    className="p-1 text-orange-600 hover:text-orange-800 transition"
                    title={user.status === "active" ? "Desactivar" : "Activar"}
                  >
                    {user.status === "active" ? <FiLock size={16} /> : <FiUnlock size={16} />}
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-1 text-red-600 hover:text-red-800 transition"
                    title="Eliminar usuario"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron usuarios
        </div>
      )}
    </div>
  );
};

export default UserTable;