import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Memoriza la función para evitar recreaciones innecesarias
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    // Ajustar estilos para mejorar la visualización del Layout en dispositivos móviles
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Botón para abrir/cerrar Sidebar con atributos ARIA para accesibilidad */}
      <button
        className="absolute top-4 right-4 z-10 p-1 bg-transparent text-blue-600 rounded-full lg:hidden hover:bg-blue-100"
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={toggleSidebar}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      {/* Ajustar el z-index del menú lateral para que siempre se sobreponga al contenido */}
      <div
        className={`fixed inset-y-0 left-0 transform z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none bg-white w-64`}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Contenido principal */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
