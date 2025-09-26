import React from "react";
import UserTable from "../../components/UserTable";

// Datos mock
const mockUsers = [
  { id: 1, name: "Ana Torres", role: "Estudiante", email: "ana@edu.com" },
  { id: 2, name: "Carlos Ruiz", role: "Profesor", email: "carlos@edu.com" },
  { id: 3, name: "María López", role: "Padre", email: "maria@edu.com" },
];

const GestionUsuarios: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Nuevo Usuario</button>
      </div>

      <UserTable users={mockUsers} />

      <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Importación Masiva</h2>
        <p className="text-sm text-gray-600">Carga archivos CSV para agregar múltiples usuarios a la plataforma.</p>
        <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Importar CSV</button>
      </div>
    </div>
  );
};

export default GestionUsuarios;
