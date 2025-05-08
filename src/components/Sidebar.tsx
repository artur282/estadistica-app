import { NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  CalculatorIcon,
  ChartBarIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

// Eliminar el uso innecesario de useState
interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) {
  return (
    <>
      {/* Botón para alternar el sidebar en pantallas pequeñas */}
      <button
        className="absolute top-4 left-4 z-20 p-1 bg-transparent text-blue-600 rounded-full lg:hidden hover:bg-blue-100"
        onClick={toggleSidebar}
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 z-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:min-h-full`}
      >
        <h2 className="text-xl font-bold mb-6 text-gray-700">
          Estadística App
        </h2>
        <ul className="space-y-2">
          {[
            { to: "/", name: "Teoría", icon: BookOpenIcon },
            { to: "/ejemplos", name: "Ejemplo", icon: ChartBarIcon },
            { to: "/ejercicios", name: "Ejercicios", icon: CalculatorIcon },
            // { to: "/progreso", name: "Progreso", icon: Bars3Icon },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg ${
                    isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                  }`
                }
                onClick={toggleSidebar}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Fondo oscuro para cerrar el sidebar al hacer clic fuera de él */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
