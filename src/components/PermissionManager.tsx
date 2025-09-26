import React, { useState, useEffect } from "react";
import { FiX, FiCheck, } from "react-icons/fi";

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

interface PermissionManagerProps {
  user: User;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

const PermissionManager: React.FC<PermissionManagerProps> = ({ user, onClose, onUpdate }) => {
  const [permissions, setPermissions] = useState<string[]>(user.permissions);

  const allPermissions = {
    "Academicos": [
      { id: "view_grades", label: "Ver calificaciones", description: "Permite ver las calificaciones" },
      { id: "manage_grades", label: "Gestionar calificaciones", description: "Permite editar calificaciones" },
      { id: "view_courses", label: "Ver cursos", description: "Permite ver los cursos disponibles" },
      { id: "manage_courses", label: "Gestionar cursos", description: "Permite crear y editar cursos" },
    ],
    "Estudiantes": [
      { id: "view_students", label: "Ver estudiantes", description: "Permite ver lista de estudiantes" },
      { id: "manage_students", label: "Gestionar estudiantes", description: "Permite editar información de estudiantes" },
    ],
    "Sistema": [
      { id: "view_reports", label: "Ver reportes", description: "Permite acceder a reportes del sistema" },
      { id: "manage_users", label: "Gestionar usuarios", description: "Permite administrar otros usuarios" },
      { id: "system_config", label: "Configuración del sistema", description: "Permite modificar configuraciones" },
      { id: "all", label: "Todos los permisos", description: "Acceso completo al sistema" },
    ]
  };

  useEffect(() => {
    setPermissions(user.permissions);
  }, [user]);

  const togglePermission = (permissionId: string) => {
    if (permissionId === "all") {
      setPermissions(permissions.includes("all") ? [] : ["all"]);
    } else {
      setPermissions(prev => 
        prev.includes(permissionId) 
          ? prev.filter(p => p !== permissionId && p !== "all")
          : [...prev.filter(p => p !== "all"), permissionId]
      );
    }
  };

  const handleSave = () => {
    onUpdate({ ...user, permissions });
  };

  const getRolePermissions = (role: User["role"]): string[] => {
    const rolePermissions = {
      "Estudiante": ["view_grades", "view_courses"],
      "Profesor": ["view_grades", "manage_grades", "view_courses", "manage_courses", "view_students"],
      "Padre": ["view_grades"],
      "Administrador": ["all"]
    };
    return rolePermissions[role];
  };

  const resetToRoleDefault = () => {
    setPermissions(getRolePermissions(user.role));
  };

  const isPermissionEnabled = (permissionId: string) => {
    return permissions.includes("all") || permissions.includes(permissionId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gestión de Permisos</h2>
            <p className="text-sm text-gray-600">{user.name} - {user.role}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Resumen */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Permisos asignados: {permissions.length}</p>
                <p className="text-sm text-gray-600">
                  {permissions.includes("all") ? "Todos los permisos" : "Permisos personalizados"}
                </p>
              </div>
              <button
                onClick={resetToRoleDefault}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition"
              >
                Restablecer por rol
              </button>
            </div>
          </div>

          {/* Permisos */}
          <div className="space-y-6">
            {Object.entries(allPermissions).map(([category, perms]) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                <div className="grid gap-2">
                  {perms.map(permission => (
                    <div
                      key={permission.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${
                        isPermissionEnabled(permission.id)
                          ? "bg-green-50 border-green-200"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                      onClick={() => togglePermission(permission.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isPermissionEnabled(permission.id)
                              ? "bg-green-500 border-green-500"
                              : "bg-white border-gray-300"
                          }`}>
                            {isPermissionEnabled(permission.id) && (
                              <FiCheck className="text-white text-xs" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{permission.label}</p>
                            <p className="text-xs text-gray-600">{permission.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-6 mt-6 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Guardar Permisos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionManager;