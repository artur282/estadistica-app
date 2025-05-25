# 📊 Estadística App

<div align="center">

![Estadística App](https://img.shields.io/badge/Estadística-App-blue)
![Versión](https://img.shields.io/badge/versión-1.0.0-brightgreen)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)
![Licencia](https://img.shields.io/badge/licencia-Educativa-yellow)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-orange)

</div>

## 📋 Descripción

Aplicación web interactiva para el aprendizaje de estadística, orientada a estudiantes de **ciencias de la salud** y áreas afines. Permite consultar teoría, practicar ejercicios y visualizar ejemplos interactivos con una interfaz moderna y accesible.

<div align="center">
  <img src="https://artur282.github.io/estadistica-app/" alt="Vista previa de Estadística App" width="80%" />
</div>

## ✨ Características principales

- **📚 Teoría**: Resumen de conceptos estadísticos organizados por lapsos/temas
- **✏️ Ejercicios**: Preguntas de opción múltiple con retroalimentación inmediata
- **📈 Ejemplos**: Simulador visual de la distribución normal y otros conceptos clave
- **📱 Interfaz responsiva**: Adaptada para dispositivos móviles y escritorio
- **🔄 Interactividad**: Visualizaciones dinámicas y ejercicios interactivos
- **🌐 Accesible**: Diseñada para ser utilizada sin conexión una vez cargada

## 🛠️ Tecnologías utilizadas

<div align="center">

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

- [Recharts](https://recharts.org/): Biblioteca para crear gráficas y visualizaciones interactivas
- [KaTeX](https://katex.org/): Motor de renderizado de fórmulas matemáticas rápido y preciso

## 🚀 Demo

Puedes probar la versión en vivo de la aplicación en: [estadistica-app.ejemplo.com](https://estadistica-app.ejemplo.com)

## 💻 Instalación y uso

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/artur282/estadistica-app.git
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

## 📂 Estructura del proyecto

```
estadistica-app/
├── src/
│   ├── components/      # Componentes reutilizables de la UI
│   │   ├── examples.tsx     # Simulaciones interactivas
│   │   ├── Exercise.tsx     # Componente de ejercicios
│   │   ├── Layout.tsx       # Estructura principal de la aplicación
│   │   └── Sidebar.tsx      # Barra lateral de navegación
│   ├── data/            # Datos estructurados de la aplicación
│   │   ├── exercises.ts     # Base de ejercicios y problemas
│   │   └── theory.ts        # Contenido teórico por temas
│   ├── pages/           # Páginas principales de la aplicación
│   │   └── Theory.tsx       # Vista de teoría y conceptos
│   ├── index.css        # Estilos globales (Tailwind)
│   └── main.tsx         # Punto de entrada de la aplicación
├── public/              # Archivos estáticos y recursos
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración de TypeScript
├── vite.config.ts       # Configuración de Vite
└── README.md            # Esta documentación
```

## 📋 Scripts disponibles

| Comando           | Descripción                                           |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo                      |
| `npm run build`   | Compila la app para producción                        |
| `npm run preview` | Previsualiza la app compilada                         |
| `npm run lint`    | Ejecuta el linter para mantener la calidad del código |

## 🧪 Temas cubiertos

La aplicación abarca los siguientes temas estadísticos:

- **Estadística descriptiva**: Medidas de tendencia central, dispersión, posición
- **Probabilidad**: Conceptos básicos, distribuciones de probabilidad
- **Distribución normal**: Propiedades, cálculos y aplicaciones
- **Inferencia estadística**: Estimación, pruebas de hipótesis
- **Correlación y regresión**: Análisis de relación entre variables

## 🗺️ Roadmap

- [x] Implementación de teoría básica
- [x] Ejercicios interactivos
- [x] Visualizaciones de distribución normal
- [ ] Perfil de usuario y progreso con IndexedDB
- [ ] Animaciones con Motion
- [ ] Ejemplos para cada teoria

## 👥 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso educativo. Puedes adaptarlo y reutilizarlo citando la fuente.


---

<div align="center">
  <p>Desarrollado con ❤️ para estudiantes de ciencias de la salud</p>
  <p>© 2025 Estadística App</p>
</div>
