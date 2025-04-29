# Estadística App

Aplicación web interactiva para el aprendizaje de estadística, orientada a estudiantes de ciencias de la salud y áreas afines. Permite consultar teoría, practicar ejercicios y visualizar ejemplos interactivos.

## Características principales

- **Teoría**: Resumen de conceptos estadísticos organizados por lapsos/temas.
- **Ejercicios**: Preguntas de opción múltiple con retroalimentación inmediata.
- **Ejemplos**: Simulador visual de la distribución normal y otros conceptos clave.
- **Interfaz responsiva**: Adaptada para dispositivos móviles y escritorio.

## Tecnologías utilizadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/): Framework y bundler para aplicaciones web modernas.
- [TypeScript](https://www.typescriptlang.org/): Tipado estático para mayor robustez.
- [TailwindCSS](https://tailwindcss.com/): Utilidades CSS para estilos rápidos y responsivos.
- [Framer Motion](https://www.framer.com/motion/): Animaciones fluidas en la interfaz.
- [Recharts](https://recharts.org/): Gráficas y visualizaciones interactivas.
- [KaTeX](https://katex.org/): Renderizado de fórmulas matemáticas.

## Instalación y uso

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd estadistica-app
   ```
2. **Instala las dependencias:**
   ```bash
   npm install
   ```
3. **Ejecuta la aplicación en modo desarrollo:**

   ```bash
   npm run dev
   ```

   La app estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

4. **Compila para producción:**
   ```bash
   npm run build
   ```

## Estructura del proyecto

```
├── src/
│   ├── components/      # Componentes reutilizables (Sidebar, Layout, Exercise, etc.)
│   ├── data/            # Datos de teoría y ejercicios
│   ├── pages/           # Páginas principales (Theory)
│   ├── index.css        # Estilos globales (Tailwind)
│   └── main.tsx         # Punto de entrada de la app
├── public/              # Archivos estáticos
├── package.json         # Dependencias y scripts
├── vite.config.ts       # Configuración de Vite
└── README.md            # Documentación
```

## Scripts útiles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la app para producción.
- `npm run preview`: Previsualiza la app compilada.
- `npm run lint`: Ejecuta el linter para mantener la calidad del código.

## Licencia

Este proyecto es de uso educativo. Puedes adaptarlo y reutilizarlo citando la fuente.

## proximas implementacions

perfil de usuario y progreso con IndexedDB
