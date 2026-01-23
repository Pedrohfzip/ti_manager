import { useEffect, useState } from "react";
import { Monitor, Users, Key, AlertCircle } from "lucide-react";

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [equipamentosRes, colaboradoresRes, licencasRes] = await Promise.all([
        fetch("http://localhost:8080/equipamentos"),
        fetch("http://localhost:8080/colaboradores"),
        fetch("http://localhost:8080/licencas"),
      ]);

      const equipamentos = await equipamentosRes.json();
      const colaboradores = await colaboradoresRes.json();
      const licencas = await licencasRes.json();

      const licencasProximasVencimento = licencas.filter(
        (l: any) => l.status === "Próximo ao Vencimento"
      ).length;

      setStats({
        equipamentos: equipamentos.length,
        colaboradores: colaboradores.filter((c: any) => c.status === "Ativo").length,
        licencasAtivas: licencas.filter((l: any) => l.status === "Ativa").length,
        alertas: licencasProximasVencimento,
      });
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total de Equipamentos",
      value: stats.equipamentos,
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
            {[
              { action: "Novo equipamento cadastrado", item: "Notebook Dell Latitude 5420", time: "Há 2 horas" },
              { action: "Licença renovada", item: "Microsoft Office 365", time: "Há 5 horas" },
              { action: "Colaborador adicionado", item: "Maria Silva - Desenvolvimento", time: "Há 1 dia" },
              { action: "Equipamento em manutenção", item: "Desktop HP EliteDesk 800", time: "Há 2 dias" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.item}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Licenças Próximas ao Vencimento</h2>
          <div className="space-y-4">
            {[
              { name: "Adobe Creative Cloud", expires: "15/02/2026", users: 12 },
              { name: "AutoCAD 2024", expires: "28/02/2026", users: 5 },
              { name: "Slack Premium", expires: "10/03/2026", users: 45 },
              { name: "Zoom Business", expires: "22/03/2026", users: 30 },
            ].map((license, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div>
                  <p className="text-gray-800 font-medium">{license.name}</p>
                  <p className="text-gray-500 text-sm">{license.users} usuários</p>
                </div>
                <div className="text-right">
                  <p className="text-orange-600 font-medium text-sm">{license.expires}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}