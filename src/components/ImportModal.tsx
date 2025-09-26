import React, { useState } from "react";
import { FiX, FiUpload, FiDownload } from "react-icons/fi";

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

interface ImportModalProps {
  onClose: () => void;
  onImport: (users: Omit<User, "id">[]) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onClose, onImport }) => {
  const [, setCsvData] = useState<string>("");
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCsvData(content);
      parseCSV(content);
    };
    reader.readAsText(file);
  };

  const parseCSV = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const errors: string[] = [];
    const preview: any[] = [];

    lines.slice(1).forEach((line, index) => {
      const [name, email, role] = line.split(',').map(field => field.replace(/"/g, '').trim());
      
      if (!name || !email || !role) {
        errors.push(`Línea ${index + 2}: Campos incompletos`);
        return;
      }

      if (!email.includes('@')) {
        errors.push(`Línea ${index + 2}: Email inválido`);
        return;
      }

      const validRoles = ["Estudiante", "Profesor", "Padre", "Administrador"];
      if (!validRoles.includes(role)) {
        errors.push(`Línea ${index + 2}: Rol inválido (${role})`);
        return;
      }

      preview.push({
        name,
        email,
        role,
        status: "active",
        lastLogin: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0],
        permissions: getDefaultPermissions(role as any)
      });
    });

    setPreviewData(preview);
    setErrors(errors);
  };

  const getDefaultPermissions = (role: User["role"]): string[] => {
    const permissionsMap = {
      "Estudiante": ["view_grades", "view_courses"],
      "Profesor": ["manage_grades", "manage_courses", "view_students"],
      "Padre": ["view_grades"],
      "Administrador": ["all"]
    };
    return permissionsMap[role];
  };

  const handleImport = () => {
    if (errors.length === 0 && previewData.length > 0) {
      onImport(previewData);
    }
  };

  const downloadTemplate = () => {
    const template = "name,email,role\n\"Ana Torres\",\"ana@edu.com\",\"Estudiante\"\n\"Carlos Ruiz\",\"carlos@edu.com\",\"Profesor\"";
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_usuarios.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Importar Usuarios</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Descargar Plantilla */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Plantilla CSV</h3>
                <p className="text-blue-700 text-sm">Descarga la plantilla para formato correcto</p>
              </div>
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FiDownload />
                Descargar Plantilla
              </button>
            </div>
          </div>

          {/* Subir Archivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subir archivo CSV
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FiUpload className="mx-auto text-gray-400 mb-2" size={32} />
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-800 font-medium">
                  Haz clic para subir
                </span>
                <span className="text-gray-600"> o arrastra el archivo aquí</span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Formato requerido: nombre, email, rol
              </p>
            </div>
          </div>

          {/* Vista Previa */}
          {previewData.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Vista previa ({previewData.length} usuarios)
              </h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Nombre</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(0, 5).map((user, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.role}</td>
                      </tr>
                    ))}
                    {previewData.length > 5 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                          ... y {previewData.length - 5} más
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Errores */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Errores encontrados:</h3>
              <ul className="text-red-700 text-sm space-y-1">
                {errors.slice(0, 5).map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
                {errors.length > 5 && (
                  <li>... y {errors.length - 5} errores más</li>
                )}
              </ul>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleImport}
              disabled={errors.length > 0 || previewData.length === 0}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Importar {previewData.length > 0 ? `(${previewData.length})` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;