import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Equipamentos } from "./components/Equipamentos";
import { Colaboradores } from "./components/Colaboradores";
import { Licencas } from "./components/Licencas";
import { Dashboard } from "./components/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "equipamentos", Component: Equipamentos },
      { path: "colaboradores", Component: Colaboradores },
      { path: "licencas", Component: Licencas },
    ],
  },
]);
