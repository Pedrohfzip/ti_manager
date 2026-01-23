import { NavLink, Outlet } from "react-router";

import { Monitor, Users, Key, LayoutDashboard } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";

export function Layout() {
  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/equipamentos", label: "Equipamentos", icon: Monitor },
    { to: "/colaboradores", label: "Colaboradores", icon: Users },
    { to: "/licencas", label: "Licenças", icon: Key },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
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

        <div className="p-4 border-t border-gray-200 cursor-pointer">
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 rounded-lg" tabIndex={0} role="button">
                <div className="w-8 h-8 rounded-full bg-blue-600 cursor cursor-pointer flex items-center justify-center text-white font-medium">
                  A
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Admin</p>
                  <p className="text-xs text-gray-500">admin@empresa.com</p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dados do Usuário</DialogTitle>
                <DialogDescription>Veja as informações do usuário logado.</DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Login</label>
                  <Input value="Admin" readOnly />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <Input value="admin@empresa.com" readOnly />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Senha</label>
                  <Input value="********" type="password" readOnly />
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
