import { useState } from "react";
import { statisticsTopics, TheoryTopic } from "../data/theory"; // Import TheoryTopic
import "katex/dist/katex.min.css";
import katex from "katex";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Bar,
  Pie,
  Cell,
} from "recharts";

// Define some colors for pie chart slices
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919"];


export default function Theory() {
  const [selectedLapso, setSelectedLapso] = useState<number>(0);

  // Obtener lapsos únicos
  const lapsos = [
    ...new Set(statisticsTopics.map((topic) => topic.lapso)),
  ].sort();

  // Filtrar temas según lapso seleccionado
  const filteredTopics =
    selectedLapso === 0
      ? statisticsTopics
      : statisticsTopics.filter((topic) => topic.lapso === selectedLapso);

  return (
    // Añadir estilos responsivos para mejorar la visualización en dispositivos móviles
    <div className="prose max-w-none px-4 py-6 bg-white shadow-md rounded-lg md:px-6 md:py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-4 md:mb-0">
          Conceptos Estadísticos
        </h1>

        <select
          value={selectedLapso}
          onChange={(e) => setSelectedLapso(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded-md px-3 py-2 w-full md:w-64 text-sm md:text-base"
        >
          <option value={0}>Todos los lapsos</option>
          {lapsos.map((lapso) => (
            <option key={lapso} value={lapso}>
              Lapso {lapso}
            </option>
          ))}
        </select>
      </div>

      {filteredTopics.map((topic) => (
        <section
          key={topic.id}
          className="mb-8 md:mb-12 border-b border-gray-200 pb-6 md:pb-8 last:border-none"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
              {topic.title}
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full mt-2 md:mt-0">
              Lapso {topic.lapso}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
            {topic.content}
          </p>

          {topic.formula && (
            <p className="bg-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-sm md:text-base">
              <span
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(topic.formula, {
                    throwOnError: false,
                    strict: "warn", // Cambiar a "warn" para mostrar advertencias en lugar de ignorarlas
                    macros: {
                      "\\á": "\\'a", // Reemplazo para á
                      "\\é": "\\'e", // Reemplazo para é
                      "\\í": "\\'i", // Reemplazo para í
                      "\\ó": "\\'o", // Reemplazo para ó
                      "\\ú": "\\'u", // Reemplazo para ú
                      "\\sen": "\\operatorname{sen}", // Macro para seno
                      "\\cos": "\\operatorname{cos}", // Macro para coseno
                      "\\tan": "\\operatorname{tan}", // Macro para tangente
                      "\\IQR": "Q_3 - Q_1", // Macro para IQR
                      "\\CV": "\\frac{\\sigma}{|\\bar{x}|} \\times 100", // Macro para CV
                      "\\LeyesDeMorgan":
                        "\\begin{aligned} \\neg(A \\cup B) &= \\neg A \\cap \\neg B \\\\ \\neg(A \\cap B) &= \\neg A \\cup \\neg B \\end{aligned}", // Leyes de Morgan
                      "\\tTest": "\\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}", // Fórmula t-test
                    },
                  }),
                }}
              />
            </p>
          )}

          {topic.example && (
            <div className="bg-blue-50 p-3 md:p-4 rounded-lg mt-4 md:mt-6">
              <h3 className="font-medium text-blue-700 mb-2 text-sm md:text-base">
                Ejemplo:
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {topic.example}
              </p>
            </div>
          )}

          {topic.graphData && (
            <div className="mt-6 md:mt-8 p-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                {topic.graphData.options?.title || `Gráfico Ilustrativo: ${topic.title}`}
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                {topic.graphData.type === 'bar' && topic.graphData.options?.xAxisKey && topic.graphData.options.barKey && (
                  <BarChart data={topic.graphData.data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={topic.graphData.options.xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={topic.graphData.options.barKey} fill="#8884d8" />
                  </BarChart>
                )}
                {topic.graphData.type === 'line' && topic.graphData.options?.xAxisKey && topic.graphData.options.lineKey && (
                  <LineChart data={topic.graphData.data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={topic.graphData.options.xAxisKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={topic.graphData.options.lineKey} stroke="#82ca9d" activeDot={{ r: 8 }} />
                  </LineChart>
                )}
                {topic.graphData.type === 'pie' && topic.graphData.options?.dataKey && topic.graphData.options.nameKey && (
                  <PieChart>
                    <Pie
                      data={topic.graphData.data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey={topic.graphData.options.dataKey}
                      nameKey={topic.graphData.options.nameKey}
                    >
                      {topic.graphData.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
