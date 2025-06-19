import { NavLink } from "react-router-dom";
import {
  BookOpenIcon,
  CalculatorIcon,
  ChartBarIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

// Eliminar el uso innecesario de useState
interface SidebarProps {
  toggleSidebar: () => void;
  onLinkClick?: () => void;
}

export default function Sidebar({ toggleSidebar, onLinkClick }: SidebarProps) {
  const handleLinkClick = () => {
    onLinkClick?.();
  };

  return (
    <nav className="h-full bg-white flex flex-col">
      {/* Header del sidebar - mejorado para móviles */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src={logo}
            alt="MediStats logo"
            className="h-8 w-8 mr-2 flex-shrink-0"
          />
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 truncate">
            MediStats
          </h2>
        </div>
        {/* Botón para cerrar en móviles */}
        <button
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={toggleSidebar}
          aria-label="Cerrar menú"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
      </div>

      {/* Navegación principal */}
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {[
            { to: "/", name: "Teoría", icon: BookOpenIcon },
            { to: "/ejemplos", name: "Ejemplo", icon: ChartBarIcon },
            { to: "/ejercicios", name: "Ejercicios", icon: CalculatorIcon },
            { to: "/progreso", name: "Progreso", icon: Bars3Icon },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
                onClick={handleLinkClick}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>Estadística App</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </nav>
  );
}
