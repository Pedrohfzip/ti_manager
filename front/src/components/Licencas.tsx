import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Key, AlertTriangle } from "lucide-react";

interface Licenca {
  id: number;
  software: string;
  fornecedor: string;
  tipo: "Mensal" | "Anual" | "Perpétua";
  quantidadeLicencas: number;
  licencasEmUso: number;
  dataAquisicao: string;
  dataVencimento?: string;
  valor: number;
  status: "Ativa" | "Próximo ao Vencimento" | "Vencida";
}

export function Licencas() {
  const [licencas, setLicencas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // const data = await fetchLicencas();
        // setLicencas(data);
      } catch (error) {
        console.error("Erro ao buscar licenças:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredLicencas = licencas.filter((lic) => {
    // const matchesSearch = Object.values(lic).some((value) =>
    //   value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // const matchesFilter = filterStatus === "Todas" || lic.status === filterStatus;
    // return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativa":
        return "bg-green-100 text-green-800";
      case "Próximo ao Vencimento":
        return "bg-yellow-100 text-yellow-800";
      case "Vencida":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const getUsagePercentage = (usado: number, total: number) => {
    return Math.round((usado / total) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const stats = {
    // total: licencas.length,
    // ativas: licencas.filter((l) => l.status === "Ativa").length,
    // proximoVencimento: licencas.filter((l) => l.status === "Próximo ao Vencimento").length,
    // vencidas: licencas.filter((l) => l.status === "Vencida").length,
  };

  return (
    <>
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Licenças</h1>
          <p className="text-gray-600 mt-2">Gerencie todas as licenças de software</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Licença
        </button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-gray-600 text-sm mb-1">Total de Licenças</div>
          <div className="text-2xl font-bold text-gray-800">{stats?.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-gray-600 text-sm mb-1">Ativas</div>
          <div className="text-2xl font-bold text-green-600">{stats?.ativas}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-gray-600 text-sm mb-1">Próximo ao Vencimento</div>
          <div className="text-2xl font-bold text-yellow-600">{stats?.proximoVencimento}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-gray-600 text-sm mb-1">Vencidas</div>
          <div className="text-2xl font-bold text-red-600">{stats?.vencidas}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar licenças..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {["Todas", "Ativa", "Próximo ao Vencimento", "Vencida"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Software
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Licenças
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLicencas.map((licenca) => {
                const usagePercentage = getUsagePercentage(
                  licenca.licencasEmUso,
                  licenca.quantidadeLicencas
                );
                return (
                  <tr key={licenca.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Key className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-gray-900 font-medium">{licenca.software}</div>
                          <div className="text-sm text-gray-500">{licenca.fornecedor}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {licenca.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {licenca.licencasEmUso}/{licenca.quantidadeLicencas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className={`h-2 rounded-full ${getUsageColor(usagePercentage)}`}
                            style={{ width: `${usagePercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{usagePercentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">
                        {licenca.dataVencimento || "Perpétua"}
                      </div>
                      {licenca.status === "Próximo ao Vencimento" && (
                        <div className="flex items-center gap-1 text-yellow-600 text-xs mt-1">
                          <AlertTriangle className="w-3 h-3" />
                          Atenção
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                      {formatCurrency(licenca.valor)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor(
                          licenca.status
                        )}`}
                      >
                        {licenca.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLicencas.length === 0 && (
          <div className="text-center py-12">
            <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma licença encontrada</p>
          </div>
        )}
      </div>

      {/* Modal Nova Licença */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Nova Licença</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Software</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Microsoft Office 365"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fornecedor</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Microsoft"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Mensal</option>
                    <option>Anual</option>
                    <option>Perpétua</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade de Licenças</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Licenças em Uso</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="45"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Aquisição</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data de Vencimento</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2500.00"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}