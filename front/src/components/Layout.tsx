import { NavLink, Outlet } from "react-router";

import { Monitor, Users, Key, LayoutDashboard, NetworkIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import Login from "./Login";

export function Layout() {
  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/equipamentos", label: "Equipamentos", icon: Monitor },
    { to: "/network", label: "Redes", icon: NetworkIcon },
    { to: "/colaboradores", label: "Colaboradores", icon: Users },
  ];


  // Removido handleLoginClick, não é mais necessário

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="cursor-pointer w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="font-bold text-xl text-gray-800">Sistema TI</h1>
          <p className="text-sm text-gray-500 mt-1">Gerenciamento</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
