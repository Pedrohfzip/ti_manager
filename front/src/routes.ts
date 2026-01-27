import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Equipamentos } from "./components/Equipamentos";
import { Colaboradores } from "./components/Colaboradores";
import { Licencas } from "./components/Licencas";
import { Dashboard } from "./components/Dashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: PrivateRoute,
    children: [
      { index: true, Component: Dashboard },
      { path: "equipamentos", Component: Equipamentos },
      { path: "colaboradores", Component: Colaboradores },
      { path: "licencas", Component: Licencas },
    ],
  },
]);
