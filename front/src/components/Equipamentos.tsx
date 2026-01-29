import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Search, Edit2, Trash2, Monitor, ArrowUp, ArrowDown } from "lucide-react";
import { getData, updateDevice } from "../providers/Devices.jsx";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setEquipamentos, setLoading } from '../store/equipamentos/equipamentosSlice';

export default function Equipamentos() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const equipamentos = useAppSelector(state => state.equipamentos.data);
  const loading = useAppSelector(state => state.equipamentos.loading);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof typeof form | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  useEffect(() => {
    const load = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getData();
        dispatch(setEquipamentos(data));
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    load();
  }, []);

  const sortedEquipamentos = [...equipamentos].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] || '';
    const bValue = b[sortConfig.key] || '';
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredEquipamentos = sortedEquipamentos
    .filter((eq) =>
      Object.values(eq).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      // Move linhas com todos os campos vazios para o final
      const aEmpty = Object.values(a).every(v => v === null || v === undefined || v === '');
      const bEmpty = Object.values(b).every(v => v === null || v === undefined || v === '');
      if (aEmpty && !bEmpty) return 1;
      if (!aEmpty && bEmpty) return -1;
      return 0;
    });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Equipamentos</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os equipamentos da empresa</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Novo Equipamento
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar equipamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                { [
                  { label: 'Name', key: 'name' },
                  { label: 'Tipo', key: 'type' },
                  { label: 'Colaborador', key: 'employee' },
                  { label: 'IP', key: 'ip' },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => {
                      setSortConfig((prev) => {
                        if (prev.key === col.key) {
                          return { key: col.key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
                        }
                        return { key: col.key as any, direction: 'asc' };
                      });
                    }}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {sortConfig.key === col.key && (
                        sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                      )}
                    </span>
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEquipamentos.map((equipamento) => (
                <tr key={equipamento.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Monitor className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-gray-900 font-medium">{equipamento.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{equipamento.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900 font-mono">{equipamento.employee}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900 font-mono">{equipamento.ip}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => {
                          navigate("/equipamentos/editar", { state: { equipamento } });
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEquipamentos.length === 0 && (
          <div className="text-center py-12">
            <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum equipamento encontrado</p>
          </div>
        )}
      </div>

    </div>
  );
}
