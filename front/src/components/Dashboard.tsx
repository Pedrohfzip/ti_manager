import { useEffect, useState } from "react";
import { Monitor, Users, Key, AlertCircle } from "lucide-react";
import { getData as getDevicesData } from "../providers/Devices";
import userProvider from "../providers/User";

interface DashboardStats {
  equipamentos: number;
  colaboradores: number;
  licencasAtivas: number;
  alertas: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    equipamentos: 0,
    colaboradores: 0,
    licencasAtivas: 0,
    alertas: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDeviceCount = async () => {
    setLoading(true);
    try {
      const users = await userProvider.getUsersAD();
      setStats((prev) => ({
        ...prev,
        equipamentos: Array.isArray(users) ? users.length : 0,
      }));
    } catch (error) {
      console.error("Erro ao buscar total de computadores:", error);
    } finally {
      setLoading(false);
    }
  };

    const fetchUserCount = async () => {
    setLoading(true);
    try {
      const users = await userProvider.getUsersAD();
      setStats((prev) => ({
        ...prev,
        colaboradores: Array.isArray(users) ? users.length : 0,
      }));
    } catch (error) {
      console.error("Erro ao buscar total de colaboradores:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserCount();
    fetchDeviceCount();
  }, []);



  const statsCards = [
    {
      title: "Total de Computadores",
      value: loading ? "..." : stats.equipamentos,
      icon: Monitor,
      color: "bg-blue-500",
    },
    {
      title: "Colaboradores Ativos",
      value: stats.colaboradores,
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Licenças Ativas",
      value: stats.licencasAtivas,
      icon: Key,
      color: "bg-purple-500",
    },
    {
      title: "Alertas",
      value: stats.alertas,
      icon: AlertCircle,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Visão geral do sistema de gerenciamento de TI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Atividades Recentes</h2>
          <div className="space-y-4">
            {/* Substitua por dados dinâmicos de atividades */}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Licenças Próximas ao Vencimento</h2>
          <div className="space-y-4">
            {/* Substitua por dados dinâmicos de licenças */}
          </div>
        </div>
      </div>
    </div>
  );
}