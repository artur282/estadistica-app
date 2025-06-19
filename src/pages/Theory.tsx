// Force re-lint
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { statisticsTopics } from "../data/theory"; // Import statistics topics data
import "katex/dist/katex.min.css";
import katex from "katex";
import {
  BookOpenIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BeakerIcon,
  CalculatorIcon,
  LightBulbIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  ZAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Rectangle,
  Scatter,
} from "recharts";
import {
  chartMargins,
  xAxisConfig,
  yAxisConfig,
  tooltipConfig,
  getResponsiveConfig,
  getXAxisConfig,
  shouldRotateLabels,
} from "../components/ChartConfig";

// Define common base type for chart data items
type DataValue = string | number | undefined;

interface DataItem {
  [key: string]: DataValue;
}

// Define types to help TypeScript with type safety
interface BoxPlotItem extends DataItem {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  grupo: string;
}

// Define type for scatter chart data
interface ScatterDataItem extends DataItem {
  grupo?: string;
}

// Define type for grouped scatter data
interface GroupedScatterData {
  [groupName: string]: ScatterDataItem[];
}

// Define type for additional scatter data
interface AdditionalScatter {
  name: string;
  data: ScatterDataItem[];
}

// Define some colors for charts
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF1919",
];

export default function Theory() {
  const [selectedLapso, setSelectedLapso] = useState<number>(0);
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Función para alternar la expansión de un tema
  const toggleTopicExpansion = (topicId: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  // Actualizar el tamaño de la ventana cuando cambie
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Obtener configuración responsiva basada en el tamaño de la ventana
  const responsiveConfig = getResponsiveConfig(windowSize.width);

  // Obtener lapsos únicos
  const lapsos = [
    ...new Set(statisticsTopics.map((topic) => topic.lapso)),
  ].sort();

  // Filtrar temas según lapso seleccionado y término de búsqueda
  const filteredTopics = statisticsTopics.filter((topic) => {
    const matchesLapso = selectedLapso === 0 || topic.lapso === selectedLapso;
    const matchesSearch =
      searchTerm === "" ||
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLapso && matchesSearch;
  });

  // Función para obtener el icono según el tipo de tema
  const getTopicIcon = (title: string) => {
    if (
      title.toLowerCase().includes("distribución") ||
      title.toLowerCase().includes("probabilidad")
    ) {
      return <ChartBarIcon className="h-6 w-6" />;
    }
    if (
      title.toLowerCase().includes("regresión") ||
      title.toLowerCase().includes("correlación")
    ) {
      return <CalculatorIcon className="h-6 w-6" />;
    }
    if (
      title.toLowerCase().includes("muestra") ||
      title.toLowerCase().includes("estimación")
    ) {
      return <BeakerIcon className="h-6 w-6" />;
    }
    if (
      title.toLowerCase().includes("hipótesis") ||
      title.toLowerCase().includes("test")
    ) {
      return <AcademicCapIcon className="h-6 w-6" />;
    }
    return <BookOpenIcon className="h-6 w-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header mejorado */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BookOpenIcon className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  Teoría Estadística
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Conceptos fundamentales y aplicaciones prácticas
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:items-center">
              {/* Barra de búsqueda */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar conceptos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[44px]"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filtro por lapso */}
              <div className="relative">
                <select
                  value={selectedLapso}
                  onChange={(e) => setSelectedLapso(Number(e.target.value))}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base min-h-[44px] w-full sm:w-auto"
                >
                  <option value={0}>Todos los lapsos</option>
                  {lapsos.map((lapso) => (
                    <option key={lapso} value={lapso}>
                      Lapso {lapso}
                    </option>
                  ))}
                </select>
                <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpenIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm font-medium text-blue-600">
                    Total de Conceptos
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-900">
                    {filteredTopics.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 sm:p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AcademicCapIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm font-medium text-green-600">
                    Lapsos Disponibles
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-green-900">
                    {lapsos.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-3 sm:p-4 sm:col-span-3 lg:col-span-1">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChartBarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm font-medium text-purple-600">
                    Con Gráficos
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-900">
                    {filteredTopics.filter((topic) => topic.graphData).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {filteredTopics.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 sm:py-12"
          >
            <LightBulbIcon className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
            <h3 className="mt-2 text-sm sm:text-base font-medium text-gray-900">
              No se encontraron conceptos
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta ajustar los filtros o el término de búsqueda.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Header del tema */}
                <div
                  className="p-4 sm:p-6 cursor-pointer"
                  onClick={() => toggleTopicExpansion(topic.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                          {getTopicIcon(topic.title)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                          {topic.title}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                          {topic.content.substring(0, 120)}...
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Lapso {topic.lapso}
                        </span>

                        {topic.graphData && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <ChartBarIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="hidden sm:inline">Gráfico</span>
                            <span className="sm:hidden">Graf.</span>
                          </span>
                        )}

                        {topic.formula && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <CalculatorIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="hidden sm:inline">Fórmula</span>
                            <span className="sm:hidden">Form.</span>
                          </span>
                        )}
                      </div>

                      <div className="flex-shrink-0 self-end sm:self-center">
                        {expandedTopics.has(topic.id) ? (
                          <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido expandible */}
                <AnimatePresence>
                  {expandedTopics.has(topic.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                        {/* Contenido principal */}
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            {topic.content}
                          </p>
                        </div>

                        {/* Fórmula */}
                        {topic.formula && (
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
                            <h3 className="flex items-center text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                              <CalculatorIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600 flex-shrink-0" />
                              <span>Fórmula Matemática</span>
                            </h3>
                            <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: katex.renderToString(topic.formula, {
                                    throwOnError: false,
                                    strict: "ignore",
                                    macros: {
                                      "\\á": "\\'a",
                                      "\\é": "\\'e",
                                      "\\í": "\\'i",
                                      "\\ó": "\\'o",
                                      "\\ú": "\\'u",
                                      "\\sen": "\\operatorname{sen}",
                                      "\\cos": "\\operatorname{cos}",
                                      "\\tan": "\\operatorname{tan}",
                                      "\\IQR": "Q_3 - Q_1",
                                      "\\CV":
                                        "\\frac{\\sigma}{|\\bar{x}|} \\times 100",
                                      "\\LeyesDeMorgan":
                                        "\\begin{aligned} \\neg(A \\cup B) &= \\neg A \\cap \\neg B \\\\ \\neg(A \\cap B) &= \\neg A \\cup \\neg B \\end{aligned}",
                                      "\\tTest":
                                        "\\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}",
                                    },
                                  }),
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Ejemplo */}
                        {topic.example && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
                            <h3 className="flex items-center text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">
                              <LightBulbIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600 flex-shrink-0" />
                              <span>Ejemplo Práctico</span>
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                              {topic.example}
                            </p>
                          </div>
                        )}

                        {/* Gráficos */}
                        {topic.graphData && (
                          <div className="bg-gray-50 rounded-lg p-3 sm:p-6 border-l-4 border-green-500">
                            <h3 className="flex items-center text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                              <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600 flex-shrink-0" />
                              <span className="leading-tight">
                                {topic.graphData.options?.title ||
                                  `Visualización: ${topic.title}`}
                              </span>
                            </h3>

                            {topic.graphData.type === "bar" &&
                              topic.graphData.options?.xAxisKey &&
                              topic.graphData.options.barKey && (
                                <ResponsiveContainer
                                  width="100%"
                                  height={responsiveConfig.chartHeight}
                                >
                                  <BarChart
                                    data={topic.graphData.data}
                                    margin={responsiveConfig.margins}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey={topic.graphData.options.xAxisKey}
                                      tick={{
                                        ...getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).tick,
                                      }}
                                      height={
                                        getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).height
                                      }
                                      angle={
                                        getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).angle
                                      }
                                      textAnchor={
                                        getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).textAnchor
                                      }
                                      dy={
                                        getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).dy
                                      }
                                      interval={
                                        shouldRotateLabels(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        )
                                          ? 0
                                          : "preserveStartEnd"
                                      }
                                    />
                                    <YAxis
                                      tick={{ ...yAxisConfig.default.tick }}
                                      width={yAxisConfig.default.width}
                                    />
                                    <Tooltip
                                      contentStyle={tooltipConfig.contentStyle}
                                    />
                                    <Legend />
                                    <Bar
                                      dataKey={topic.graphData.options.barKey}
                                      fill="#8884d8"
                                    />
                                  </BarChart>
                                </ResponsiveContainer>
                              )}

                            {topic.graphData.type === "line" &&
                              topic.graphData.options?.xAxisKey &&
                              topic.graphData.options.lineKey && (
                                <ResponsiveContainer
                                  width="100%"
                                  height={responsiveConfig.chartHeight}
                                >
                                  <LineChart
                                    data={topic.graphData.data}
                                    margin={responsiveConfig.margins}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      dataKey={topic.graphData.options.xAxisKey}
                                      tick={{ ...xAxisConfig.default.tick }}
                                      height={xAxisConfig.default.height}
                                      angle={xAxisConfig.default.angle}
                                      textAnchor={
                                        xAxisConfig.default.textAnchor
                                      }
                                    />
                                    <YAxis
                                      tick={{ ...yAxisConfig.default.tick }}
                                      width={yAxisConfig.default.width}
                                    />
                                    <Tooltip
                                      contentStyle={tooltipConfig.contentStyle}
                                    />
                                    <Legend />
                                    <Line
                                      type="monotone"
                                      dataKey={topic.graphData.options.lineKey}
                                      stroke="#82ca9d"
                                      activeDot={{ r: 8 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              )}

                            {topic.graphData.type === "pie" &&
                              topic.graphData.options?.dataKey &&
                              topic.graphData.options.nameKey && (
                                <ResponsiveContainer
                                  width="100%"
                                  height={responsiveConfig.chartHeight}
                                >
                                  <PieChart margin={chartMargins.pie}>
                                    <Pie
                                      data={topic.graphData.data}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={false}
                                      label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(
                                          0
                                        )}%`
                                      }
                                      outerRadius={150}
                                      fill="#8884d8"
                                      dataKey={topic.graphData.options.dataKey}
                                      nameKey={topic.graphData.options.nameKey}
                                    >
                                      {topic.graphData.data.map((_, index) => (
                                        <Cell
                                          key={`cell-${index}`}
                                          fill={COLORS[index % COLORS.length]}
                                        />
                                      ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip
                                      contentStyle={tooltipConfig.contentStyle}
                                    />
                                  </PieChart>
                                </ResponsiveContainer>
                              )}

                            {topic.graphData?.type === "scatter" &&
                              topic.graphData.options?.xKey &&
                              topic.graphData.options?.yKey && (
                                <ResponsiveContainer
                                  width="100%"
                                  height={responsiveConfig.chartHeight}
                                >
                                  <ScatterChart
                                    margin={responsiveConfig.margins}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                      type="number"
                                      dataKey={topic.graphData.options.xKey}
                                      name={
                                        topic.graphData.options.xAxisName ||
                                        topic.graphData.options.xKey
                                      }
                                      domain={["dataMin - 1", "dataMax + 1"]}
                                      tick={{ ...xAxisConfig.default.tick }}
                                      label={{
                                        value:
                                          topic.graphData.options.xAxisName ||
                                          topic.graphData.options.xKey,
                                        position: "insideBottom",
                                        offset: 10,
                                        fontSize: responsiveConfig.fontSize,
                                      }}
                                    />
                                    <YAxis
                                      type="number"
                                      dataKey={topic.graphData.options.yKey}
                                      name={
                                        topic.graphData.options.yAxisName ||
                                        topic.graphData.options.yKey
                                      }
                                      tick={{ ...yAxisConfig.default.tick }}
                                      label={{
                                        value:
                                          topic.graphData.options.yAxisName ||
                                          topic.graphData.options.yKey,
                                        angle: -90,
                                        position: "insideLeft",
                                        fontSize: responsiveConfig.fontSize,
                                      }}
                                      width={yAxisConfig.default.width}
                                    />
                                    {topic.graphData.options?.zKey && (
                                      <ZAxis
                                        type="number"
                                        dataKey={topic.graphData.options.zKey}
                                        range={
                                          topic.graphData.options.zRange || [
                                            50, 400,
                                          ]
                                        }
                                        name={
                                          topic.graphData.options.zAxisName ||
                                          topic.graphData.options.zKey
                                        }
                                      />
                                    )}
                                    <Tooltip
                                      cursor={{ strokeDasharray: "3 3" }}
                                      contentStyle={tooltipConfig.contentStyle}
                                    />
                                    <Legend />

                                    {/* Agrupar los datos por la propiedad grupo si existe */}
                                    {(() => {
                                      // Verificar si los datos tienen una propiedad grupo
                                      const scatterData = topic.graphData
                                        .data as ScatterDataItem[];
                                      const hasGroupProperty = scatterData.some(
                                        (item: DataItem) => "grupo" in item
                                      );

                                      if (hasGroupProperty) {
                                        // Agrupar los datos por la propiedad grupo
                                        const groupedData =
                                          scatterData.reduce<GroupedScatterData>(
                                            (acc, item: DataItem) => {
                                              const groupName = String(
                                                item.grupo || "Sin grupo"
                                              );
                                              if (!acc[groupName]) {
                                                acc[groupName] = [];
                                              }
                                              acc[groupName].push(
                                                item as ScatterDataItem
                                              );
                                              return acc;
                                            },
                                            {}
                                          );

                                        // Renderizar un Scatter para cada grupo
                                        return Object.entries(groupedData).map(
                                          ([groupName, data], idx) => (
                                            <Scatter
                                              key={groupName}
                                              name={groupName}
                                              data={data}
                                              fill={COLORS[idx % COLORS.length]}
                                              shape="circle"
                                            />
                                          )
                                        );
                                      } else if (
                                        topic.graphData.options
                                          ?.additionalScatters
                                      ) {
                                        // Usar additionalScatters si está definido
                                        return topic.graphData.options.additionalScatters.map(
                                          (group: AdditionalScatter, idx) => (
                                            <Scatter
                                              key={idx}
                                              name={group.name}
                                              data={group.data}
                                              fill={COLORS[idx % COLORS.length]}
                                              shape="circle"
                                            />
                                          )
                                        );
                                      } else {
                                        // Si no hay grupos ni additionalScatters, mostrar todos los datos en un solo Scatter
                                        return (
                                          <Scatter
                                            name={
                                              topic.graphData.options
                                                ?.scatterName ||
                                              topic.graphData.options?.title ||
                                              "Datos"
                                            }
                                            data={topic.graphData.data}
                                            fill={COLORS[0]}
                                            shape="circle"
                                          />
                                        );
                                      }
                                    })()}

                                    {/* Renderizar la línea de regresión si existe */}
                                    {topic.graphData.options.regressionLine && (
                                      <Line
                                        type="monotone"
                                        dataKey="y"
                                        data={
                                          topic.graphData.options.regressionLine
                                        }
                                        stroke="#ff7300"
                                        dot={false}
                                        name="Línea de Regresión"
                                      />
                                    )}
                                  </ScatterChart>
                                </ResponsiveContainer>
                              )}

                            {topic.graphData.type === "boxplot" &&
                              topic.graphData.options?.layout && (
                                <ResponsiveContainer
                                  width="100%"
                                  height={responsiveConfig.chartHeight}
                                >
                                  <ComposedChart
                                    layout={
                                      topic.graphData.options.layout ||
                                      "horizontal"
                                    }
                                    data={topic.graphData.data}
                                    margin={responsiveConfig.margins}
                                  >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    {topic.graphData.options.layout ===
                                    "vertical" ? (
                                      <>
                                        <XAxis
                                          type="number"
                                          tick={{ ...xAxisConfig.default.tick }}
                                          label={{
                                            value: "Valor",
                                            position: "insideBottom",
                                            offset: 5,
                                            fontSize: responsiveConfig.fontSize,
                                          }}
                                          height={xAxisConfig.default.height}
                                        />
                                        <YAxis
                                          dataKey="grupo"
                                          type="category"
                                          tick={{ ...yAxisConfig.default.tick }}
                                          width={yAxisConfig.withLabel.width}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <XAxis
                                          dataKey="grupo"
                                          type="category"
                                          scale="band"
                                          tick={{ ...xAxisConfig.default.tick }}
                                          height={xAxisConfig.default.height}
                                          angle={xAxisConfig.default.angle}
                                          textAnchor={
                                            xAxisConfig.default.textAnchor
                                          }
                                          label={{
                                            value:
                                              topic.graphData.options
                                                ?.xAxisLabel || "",
                                            position: "bottom",
                                            offset: 5,
                                            fontSize: responsiveConfig.fontSize,
                                          }}
                                        />
                                        <YAxis
                                          type="number"
                                          domain={[
                                            "dataMin - 5",
                                            "dataMax + 5",
                                          ]}
                                          tick={{ ...yAxisConfig.default.tick }}
                                          width={yAxisConfig.withLabel.width}
                                          label={{
                                            value:
                                              topic.graphData.options
                                                ?.yAxisLabel || "",
                                            angle: -90,
                                            position: "insideLeft",
                                            fontSize: responsiveConfig.fontSize,
                                          }}
                                        />
                                      </>
                                    )}
                                    <Tooltip
                                      contentStyle={tooltipConfig.contentStyle}
                                    />
                                    <Legend />
                                    {(
                                      topic.graphData.data as BoxPlotItem[]
                                    ).map(
                                      (entry: BoxPlotItem, index: number) => {
                                        const boxPlotData = entry;

                                        // Verificar que el item tenga todos los datos necesarios para un boxplot
                                        if (
                                          !boxPlotData ||
                                          typeof boxPlotData.min !== "number" ||
                                          typeof boxPlotData.q1 !== "number" ||
                                          typeof boxPlotData.median !==
                                            "number" ||
                                          typeof boxPlotData.q3 !== "number" ||
                                          typeof boxPlotData.max !== "number" ||
                                          !boxPlotData.grupo
                                        ) {
                                          console.error(
                                            "Datos de boxplot incompletos:",
                                            boxPlotData
                                          );
                                          return null;
                                        }

                                        const boxWidth = 40;

                                        const layout =
                                          topic.graphData?.options?.layout ||
                                          "horizontal";
                                        const yPos = index * 60 + 30;
                                        const xPos = index * 60 + 30;

                                        return (
                                          <g key={`cell-${index}`}>
                                            {layout === "vertical" ? (
                                              <>
                                                {/* Caja (IQR) */}
                                                <Rectangle
                                                  fill={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  fillOpacity={0.6}
                                                  x={boxPlotData.q1}
                                                  y={yPos - boxWidth / 2}
                                                  width={
                                                    boxPlotData.q3 -
                                                    boxPlotData.q1
                                                  }
                                                  height={boxWidth}
                                                />
                                                {/* Línea de la mediana */}
                                                <line
                                                  x1={boxPlotData.median}
                                                  y1={yPos - boxWidth / 2}
                                                  x2={boxPlotData.median}
                                                  y2={yPos + boxWidth / 2}
                                                  stroke="#fff"
                                                  strokeWidth={2}
                                                />
                                                {/* Whisker izquierdo */}
                                                <line
                                                  x1={boxPlotData.min}
                                                  y1={yPos}
                                                  x2={boxPlotData.q1}
                                                  y2={yPos}
                                                  stroke={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  strokeWidth={1}
                                                />
                                                {/* Whisker derecho */}
                                                <line
                                                  x1={boxPlotData.q3}
                                                  y1={yPos}
                                                  x2={boxPlotData.max}
                                                  y2={yPos}
                                                  stroke={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  strokeWidth={1}
                                                />
                                                {/* Extremos de los whiskers */}
                                                <line
                                                  x1={boxPlotData.min}
                                                  y1={yPos - 10}
                                                  x2={boxPlotData.min}
                                                  y2={yPos + 10}
                                                  stroke={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  strokeWidth={1}
                                                />
                                                <line
                                                  x1={boxPlotData.max}
                                                  y1={yPos - 10}
                                                  x2={boxPlotData.max}
                                                  y2={yPos + 10}
                                                  stroke={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  strokeWidth={1}
                                                />
                                              </>
                                            ) : (
                                              <>
                                                {/* Caja (IQR) */}
                                                <Rectangle
                                                  fill={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  fillOpacity={0.6}
                                                  x={xPos - boxWidth / 2}
                                                  y={boxPlotData.q3}
                                                  width={boxWidth}
                                                  height={
                                                    boxPlotData.q1 -
                                                    boxPlotData.q3
                                                  }
                                                />
                                                {/* Línea de la mediana */}
                                                <line
                                                  x1={xPos - boxWidth / 2}
                                                  y1={boxPlotData.median}
                                                  x2={xPos + boxWidth / 2}
                                                  y2={boxPlotData.median}
                                                  stroke="#fff"
                                                  strokeWidth={2}
                                                />
                                                {/* Whisker superior */}
                                                <line
                                                  x1={xPos}
                                                  y1={boxPlotData.min}
                                                  x2={xPos}
                                                  y2={boxPlotData.q1}
                                                  stroke={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  strokeWidth={1}
                                                />
                                                {/* Whisker inferior */}
                                                <line
                                                  x1={xPos}
                                                  y1={boxPlotData.q3}
                                                  x2={xPos}
                                                  y2={boxPlotData.max}
                                                  stroke={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  strokeWidth={1}
                                                />
                                                {/* Extremos de los whiskers */}
                                                <line
                                                  x1={xPos - 10}
                                                  y1={boxPlotData.min}
                                                  x2={xPos + 10}
                                                  y2={boxPlotData.min}
                                                  stroke={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  strokeWidth={1}
                                                />
                                                <line
                                                  x1={xPos - 10}
                                                  y1={boxPlotData.max}
                                                  x2={xPos + 10}
                                                  y2={boxPlotData.max}
                                                  stroke={
                                                    COLORS[
                                                      index % COLORS.length
                                                    ]
                                                  }
                                                  strokeWidth={1}
                                                />
                                              </>
                                            )}
                                          </g>
                                        );
                                      }
                                    )}
                                  </ComposedChart>
                                </ResponsiveContainer>
                              )}

                            {topic.graphData?.type === "histogram" &&
                              topic.graphData.options?.barKey && (
                                <ResponsiveContainer
                                  width="100%"
                                  height={responsiveConfig.chartHeight}
                                >
                                  <BarChart
                                    data={topic.graphData.data}
                                    margin={responsiveConfig.margins}
                                  >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis
                                      dataKey="name"
                                      tick={{
                                        ...getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).tick,
                                      }}
                                      height={
                                        getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).height
                                      }
                                      angle={
                                        getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).angle
                                      }
                                      textAnchor={
                                        getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).textAnchor
                                      }
                                      dy={
                                        getXAxisConfig(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        ).dy
                                      }
                                      interval={
                                        shouldRotateLabels(
                                          topic.graphData.data.length,
                                          windowSize.width
                                        )
                                          ? 0
                                          : "preserveStartEnd"
                                      }
                                      label={{
                                        value: "Intervalos",
                                        position: "insideBottom",
                                        offset: -5,
                                        fontSize: responsiveConfig.fontSize,
                                      }}
                                    />
                                    <YAxis
                                      type="number"
                                      label={{
                                        value:
                                          topic.graphData.options?.yAxisLabel ||
                                          topic.graphData.options.barKey,
                                        angle: -90,
                                        position: "insideLeft",
                                        fontSize: responsiveConfig.fontSize,
                                      }}
                                      tick={{ ...yAxisConfig.default.tick }}
                                      width={yAxisConfig.withLabel.width}
                                    />
                                    <Tooltip
                                      formatter={(value) => [
                                        `${value}`,
                                        topic.graphData?.options
                                          ?.tooltipLabel || "Frecuencia",
                                      ]}
                                    />
                                    <Legend />
                                    <Bar
                                      dataKey={topic.graphData?.options?.barKey}
                                      fill="#8884d8"
                                      barSize={
                                        topic.graphData?.options?.barSize || 30
                                      }
                                    >
                                      {topic.graphData?.options
                                        ?.colorByFrequency &&
                                        topic.graphData?.data?.map(
                                          (
                                            entry: Record<
                                              string,
                                              string | number | object
                                            >,
                                            index: number
                                          ) => {
                                            const barKey =
                                              topic.graphData?.options?.barKey;

                                            const value =
                                              barKey &&
                                              entry[barKey] !== undefined
                                                ? Number(entry[barKey])
                                                : 0;
                                            return (
                                              <Cell
                                                key={`cell-${index}`}
                                                fill={`rgb(${Math.min(
                                                  255,
                                                  value * 10
                                                )}, 100, 200)`}
                                              />
                                            );
                                          }
                                        )}
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              )}

                            {topic.graphData?.type === "boxplot" && (
                              <ResponsiveContainer width="100%" height={400}>
                                <ComposedChart
                                  layout={
                                    topic.graphData.options?.layout ||
                                    "vertical"
                                  }
                                  margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 20,
                                    left: 20,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  {topic.graphData.options?.layout ===
                                  "vertical" ? (
                                    <>
                                      <XAxis
                                        type="number"
                                        domain={["dataMin - 5", "dataMax + 5"]}
                                        label={{
                                          value:
                                            topic.graphData.options
                                              ?.xAxisLabel || "",
                                          position: "bottom",
                                        }}
                                      />
                                      <YAxis
                                        type="category"
                                        dataKey="grupo"
                                        scale="band"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <XAxis
                                        type="category"
                                        dataKey="grupo"
                                        scale="band"
                                        label={{
                                          value:
                                            topic.graphData.options
                                              ?.xAxisLabel || "",
                                          position: "bottom",
                                        }}
                                      />
                                      <YAxis
                                        type="number"
                                        domain={["dataMin - 5", "dataMax + 5"]}
                                        label={{
                                          value:
                                            topic.graphData.options
                                              ?.yAxisLabel || "",
                                          angle: -90,
                                          position: "insideLeft",
                                        }}
                                      />
                                    </>
                                  )}
                                  <Tooltip />
                                  <Legend />
                                  {(topic.graphData.data as BoxPlotItem[]).map(
                                    (entry: BoxPlotItem, index: number) => {
                                      const boxPlotData = entry;

                                      // Verificar que el item tenga todos los datos necesarios para un boxplot
                                      if (
                                        !boxPlotData ||
                                        typeof boxPlotData.min !== "number" ||
                                        typeof boxPlotData.q1 !== "number" ||
                                        typeof boxPlotData.median !==
                                          "number" ||
                                        typeof boxPlotData.q3 !== "number" ||
                                        typeof boxPlotData.max !== "number" ||
                                        !boxPlotData.grupo
                                      ) {
                                        console.error(
                                          "Datos de boxplot incompletos:",
                                          boxPlotData
                                        );
                                        return null;
                                      }

                                      const layout =
                                        topic.graphData?.options?.layout ||
                                        "vertical";
                                      const boxWidth = 40; // Ancho fijo para las cajas
                                      const boxHeight = 40; // Alto fijo para las cajas

                                      // Calcular posiciones según el layout
                                      let xPos: number, yPos: number;
                                      if (layout === "vertical") {
                                        // En layout vertical, el eje Y es categórico (grupos) y el eje X es numérico (valores)
                                        xPos = boxPlotData.q1;
                                        yPos = index * 60 + 30; // Espaciado vertical entre boxplots
                                      } else {
                                        // En layout horizontal, el eje X es categórico (grupos) y el eje Y es numérico (valores)
                                        xPos = index * 60 + 30; // Espaciado horizontal entre boxplots
                                        yPos = boxPlotData.q3;
                                      }

                                      return (
                                        <g key={`boxplot-${index}`}>
                                          {/* Caja IQR */}
                                          {layout === "vertical" ? (
                                            <>
                                              {/* Caja (IQR) */}
                                              <Rectangle
                                                fill={
                                                  COLORS[index % COLORS.length]
                                                }
                                                fillOpacity={0.6}
                                                x={boxPlotData.q1}
                                                y={yPos - boxHeight / 2}
                                                width={
                                                  boxPlotData.q3 -
                                                  boxPlotData.q1
                                                }
                                                height={boxHeight}
                                              />
                                              {/* Línea de la mediana */}
                                              <line
                                                x1={boxPlotData.median}
                                                y1={yPos - boxHeight / 2}
                                                x2={boxPlotData.median}
                                                y2={yPos + boxHeight / 2}
                                                stroke="#fff"
                                                strokeWidth={2}
                                              />
                                              {/* Whisker izquierdo */}
                                              <line
                                                x1={boxPlotData.min}
                                                y1={yPos}
                                                x2={boxPlotData.q1}
                                                y2={yPos}
                                                stroke={
                                                  COLORS[index % COLORS.length]
                                                }
                                                strokeWidth={1}
                                              />
                                              {/* Whisker derecho */}
                                              <line
                                                x1={boxPlotData.q3}
                                                y1={yPos}
                                                x2={boxPlotData.max}
                                                y2={yPos}
                                                stroke={
                                                  COLORS[index % COLORS.length]
                                                }
                                                strokeWidth={1}
                                              />
                                              {/* Extremos de los whiskers */}
                                              <line
                                                x1={boxPlotData.min}
                                                y1={yPos - 10}
                                                x2={boxPlotData.min}
                                                y2={yPos + 10}
                                                stroke={
                                                  COLORS[index % COLORS.length]
                                                }
                                                strokeWidth={1}
                                              />
                                              <line
                                                x1={boxPlotData.max}
                                                y1={yPos - 10}
                                                x2={boxPlotData.max}
                                                y2={yPos + 10}
                                                stroke={
                                                  COLORS[index % COLORS.length]
                                                }
                                                strokeWidth={1}
                                              />
                                            </>
                                          ) : (
                                            <>
                                              {/* Caja (IQR) */}
                                              <Rectangle
                                                fill={
                                                  COLORS[index % COLORS.length]
                                                }
                                                fillOpacity={0.6}
                                                x={xPos - boxWidth / 2}
                                                y={boxPlotData.q3}
                                                width={boxWidth}
                                                height={
                                                  boxPlotData.q1 -
                                                  boxPlotData.q3
                                                }
                                              />
                                              {/* Línea de la mediana */}
                                              <line
                                                x1={xPos - boxWidth / 2}
                                                y1={boxPlotData.median}
                                                x2={xPos + boxWidth / 2}
                                                y2={boxPlotData.median}
                                                stroke="#fff"
                                                strokeWidth={2}
                                              />
                                              {/* Whisker superior */}
                                              <line
                                                x1={xPos}
                                                y1={boxPlotData.min}
                                                x2={xPos}
                                                y2={boxPlotData.q1}
                                                stroke={
                                                  COLORS[index % COLORS.length]
                                                }
                                                strokeWidth={1}
                                              />
                                              {/* Whisker inferior */}
                                              <line
                                                x1={xPos}
                                                y1={boxPlotData.q3}
                                                x2={xPos}
                                                y2={boxPlotData.max}
                                                stroke={
                                                  COLORS[index % COLORS.length]
                                                }
                                                strokeWidth={1}
                                              />
                                              {/* Extremos de los whiskers */}
                                              <line
                                                x1={xPos - 10}
                                                y1={boxPlotData.min}
                                                x2={xPos + 10}
                                                y2={boxPlotData.min}
                                                stroke={
                                                  COLORS[index % COLORS.length]
                                                }
                                                strokeWidth={1}
                                              />
                                              <line
                                                x1={xPos - 10}
                                                y1={boxPlotData.max}
                                                x2={xPos + 10}
                                                y2={boxPlotData.max}
                                                stroke={
                                                  COLORS[index % COLORS.length]
                                                }
                                                strokeWidth={1}
                                              />
                                            </>
                                          )}
                                        </g>
                                      );
                                    }
                                  )}
                                </ComposedChart>
                              </ResponsiveContainer>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
