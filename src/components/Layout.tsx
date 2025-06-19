import { useState, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Memoriza la función para evitar recreaciones innecesarias
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Detectar si es móvil y cerrar sidebar automáticamente
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cerrar sidebar al hacer clic en enlaces en móvil
  const closeSidebarOnMobile = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Botón para abrir/cerrar Sidebar - mejorado para móviles */}
      <button
        className="fixed top-4 right-4 z-50 p-3 bg-white text-blue-600 rounded-full lg:hidden hover:bg-blue-100 shadow-lg border border-gray-200 transition-all duration-200"
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={toggleSidebar}
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      {/* Overlay para cerrar sidebar en móvil */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static bg-white w-64 shadow-xl lg:shadow-lg`}
      >
        <Sidebar
          toggleSidebar={toggleSidebar}
          onLinkClick={closeSidebarOnMobile}
        />
      </div>

      {/* Contenido principal - mejorado para responsividad */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto min-h-screen lg:min-h-0">
        <div className="max-w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
