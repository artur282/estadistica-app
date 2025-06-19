import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  xAxisConfig,
  yAxisConfig,
  tooltipConfig,
  getResponsiveConfig,
  getXAxisConfig,
  shouldRotateLabels,
} from "./ChartConfig";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const NormalDistributionSimulator = () => {
  const [mean, setMean] = useState<number>(0);
  const [stdDev, setStdDev] = useState<number>(1);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 500,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

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

  // Generar datos para la curva normal
  const data = useMemo(() => {
    const points = [];
    const start = mean - 4 * stdDev;
    const end = mean + 4 * stdDev;
    const step = (end - start) / 200;

    for (let x = start; x <= end; x += step) {
      const y =
        (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
        Math.exp(-0.5 * ((x - mean) / stdDev) ** 2);
      points.push({ x, y });
    }

    return points;
  }, [mean, stdDev]);

  // Calcular probabilidades
  const probabilities = useMemo(() => {
    const empiricalRule = [
      { sigma: 1, probability: 68.27 },
      { sigma: 2, probability: 95.45 },
      { sigma: 3, probability: 99.73 },
    ];

    return empiricalRule.map((rule) => ({
      ...rule,
      start: mean - rule.sigma * stdDev,
      end: mean + rule.sigma * stdDev,
    }));
  }, [mean, stdDev]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Simulador de Distribución Normal
      </h1>

      {/* Explicación teórica */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
      >
        <h2 className="text-xl font-semibold mb-3 text-blue-800">
          ¿Qué es la Distribución Normal?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          La distribución normal o gaussiana es una función de probabilidad
          continua caracterizada por:
          <br />
          • Simetría alrededor de la media (μ)
          <br />
          • Forma de campana (campana de Gauss)
          <br />
          • El 68.27% de datos dentro de μ ± σ<br />
          • El 95.45% dentro de μ ± 2σ
          <br />
          • El 99.73% dentro de μ ± 3σ
          <br />
          Su fórmula es: f(x) = (1/σ√(2π)) • e^(-½((x-μ)/σ)²)
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controles */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="block mb-5">
              <span className="text-lg font-semibold text-gray-700">
                Media (μ): {mean.toFixed(1)}
              </span>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={mean}
                onChange={(e) => setMean(Number(e.target.value))}
                className="w-full mt-3 range-lg accent-blue-600"
              />
            </label>

            <label className="block">
              <span className="text-lg font-semibold text-gray-700">
                Desviación Estándar (σ): {stdDev.toFixed(1)}
              </span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={stdDev}
                onChange={(e) => setStdDev(Number(e.target.value))}
                className="w-full mt-3 range-lg accent-blue-600"
              />
            </label>
          </div>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {probabilities.map((rule) => (
              <div
                key={rule.sigma}
                className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-blue-500"
              >
                <h3 className="font-bold text-blue-700 mb-1">
                  μ ± {rule.sigma}σ
                </h3>
                <p className="text-gray-600">
                  {rule.probability}% de los datos entre{" "}
                  <span className="font-medium">{rule.start.toFixed(1)}</span> y{" "}
                  <span className="font-medium">{rule.end.toFixed(1)}</span>
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gráfico */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm"
          style={{ width: "100%", maxWidth: "81vw" }}
        >
          {/* Ajustar el diseño para dispositivos móviles y vistas normales */}
          <div className="w-full h-auto p-3 sm:p-6 md:p-8 lg:p-10">
            <ResponsiveContainer
              width="100%"
              height={responsiveConfig.chartHeight}
            >
              <AreaChart data={data} margin={responsiveConfig.margins}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis
                  dataKey="x"
                  tickFormatter={(value) => value.toFixed(1)}
                  tick={{ ...xAxisConfig.default.tick, fill: "#333" }}
                  label={{
                    value: "Valores (x)",
                    position: "insideBottom",
                    offset: 15,
                    fill: "#333",
                    fontSize: responsiveConfig.fontSize + 2,
                  }}
                  dy={xAxisConfig.default.dy}
                  height={xAxisConfig.default.height}
                />
                <YAxis
                  tick={{ ...yAxisConfig.withLabel.tick, fill: "#333" }}
                  label={{
                    value: "Densidad",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#333",
                    fontSize: responsiveConfig.fontSize + 2,
                    dx: -15,
                  }}
                  tickFormatter={(value) => value.toFixed(2)}
                  width={yAxisConfig.withLabel.width}
                />
                <Tooltip
                  formatter={(value: number) => [
                    <span key="1" className="font-bold">
                      {value.toFixed(4)}
                    </span>,
                    "Densidad",
                  ]}
                  labelFormatter={(label: number) =>
                    `Valor: ${label.toFixed(2)}`
                  }
                  contentStyle={tooltipConfig.contentStyle}
                />
                <Area
                  type="monotone"
                  dataKey="y"
                  stroke="#2563eb"
                  fill="#93c5fd"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Simulador de Distribución Binomial
const BinomialDistributionSimulator = () => {
  const [n, setN] = useState<number>(20);
  const [p, setP] = useState<number>(0.3);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 500,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

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

  const responsiveConfig = getResponsiveConfig(windowSize.width);

  // Función para calcular combinaciones
  const combination = (n: number, k: number): number => {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;

    let result = 1;
    for (let i = 1; i <= k; i++) {
      result = (result * (n - i + 1)) / i;
    }
    return result;
  };

  // Generar datos para la distribución binomial
  const data = useMemo(() => {
    const points = [];
    for (let k = 0; k <= n; k++) {
      const probability =
        combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
      points.push({ k, probability: probability });
    }
    return points;
  }, [n, p]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const mean = n * p;
    const variance = n * p * (1 - p);
    const stdDev = Math.sqrt(variance);
    return { mean, variance, stdDev };
  }, [n, p]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Simulador de Distribución Binomial
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-green-50 rounded-lg border border-green-200"
      >
        <h2 className="text-xl font-semibold mb-3 text-green-800">
          ¿Qué es la Distribución Binomial?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          La distribución binomial modela el número de éxitos en n ensayos
          independientes:
          <br />
          • Cada ensayo tiene solo dos resultados posibles (éxito/fracaso)
          <br />
          • La probabilidad de éxito (p) es constante
          <br />
          • Los ensayos son independientes
          <br />
          • Media: μ = np, Varianza: σ² = np(1-p)
          <br />
          Su fórmula es: P(X=k) = C(n,k) × p^k × (1-p)^(n-k)
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="block mb-5">
              <span className="text-lg font-semibold text-gray-700">
                Número de ensayos (n): {n}
              </span>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="w-full mt-3 range-lg accent-green-600"
              />
            </label>

            <label className="block">
              <span className="text-lg font-semibold text-gray-700">
                Probabilidad de éxito (p): {p.toFixed(2)}
              </span>
              <input
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value={p}
                onChange={(e) => setP(Number(e.target.value))}
                className="w-full mt-3 range-lg accent-green-600"
              />
            </label>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-500">
              <h3 className="font-bold text-green-700 mb-1">Estadísticas</h3>
              <p className="text-gray-600">
                Media (μ):{" "}
                <span className="font-medium">{stats.mean.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Varianza (σ²):{" "}
                <span className="font-medium">{stats.variance.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Desviación estándar (σ):{" "}
                <span className="font-medium">{stats.stdDev.toFixed(2)}</span>
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <ResponsiveContainer
            width="100%"
            height={responsiveConfig.chartHeight}
          >
            <BarChart data={data} margin={responsiveConfig.margins}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="k"
                tick={{
                  ...getXAxisConfig(data.length, windowSize.width).tick,
                  fill: "#333",
                }}
                height={getXAxisConfig(data.length, windowSize.width).height}
                angle={getXAxisConfig(data.length, windowSize.width).angle}
                textAnchor={
                  getXAxisConfig(data.length, windowSize.width).textAnchor
                }
                dy={getXAxisConfig(data.length, windowSize.width).dy}
                label={{
                  value: "Número de éxitos (k)",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#333",
                }}
                interval={
                  shouldRotateLabels(data.length, windowSize.width)
                    ? 0
                    : "preserveStartEnd"
                }
              />
              <YAxis
                tick={{ ...yAxisConfig.default.tick, fill: "#333" }}
                label={{
                  value: "Probabilidad",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#333",
                }}
                tickFormatter={(value) => value.toFixed(3)}
              />
              <Tooltip
                formatter={(value: number) => [
                  value.toFixed(4),
                  "Probabilidad",
                ]}
                labelFormatter={(label: number) => `k = ${label}`}
                contentStyle={tooltipConfig.contentStyle}
              />
              <Bar dataKey="probability" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

// Simulador de Distribución de Poisson
const PoissonDistributionSimulator = () => {
  const [lambda, setLambda] = useState<number>(4.2);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 500,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

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

  const responsiveConfig = getResponsiveConfig(windowSize.width);

  // Función factorial
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  // Generar datos para la distribución de Poisson
  const data = useMemo(() => {
    const points = [];
    const maxK = Math.min(20, lambda + 4 * Math.sqrt(lambda));

    for (let k = 0; k <= maxK; k++) {
      const probability =
        (Math.pow(Math.E, -lambda) * Math.pow(lambda, k)) / factorial(k);
      points.push({ k, probability });
    }
    return points;
  }, [lambda]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const mean = lambda;
    const variance = lambda;
    const stdDev = Math.sqrt(lambda);
    return { mean, variance, stdDev };
  }, [lambda]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Simulador de Distribución de Poisson
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-purple-50 rounded-lg border border-purple-200"
      >
        <h2 className="text-xl font-semibold mb-3 text-purple-800">
          ¿Qué es la Distribución de Poisson?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          La distribución de Poisson modela eventos raros en un intervalo fijo:
          <br />
          • Eventos independientes en el tiempo/espacio
          <br />
          • Tasa promedio constante (λ)
          <br />
          • Probabilidad proporcional al intervalo
          <br />
          • Media = Varianza = λ
          <br />
          Su fórmula es: P(X=k) = (e^(-λ) × λ^k) / k!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="block mb-5">
              <span className="text-lg font-semibold text-gray-700">
                Tasa promedio (λ): {lambda.toFixed(1)}
              </span>
              <input
                type="range"
                min="0.5"
                max="15"
                step="0.1"
                value={lambda}
                onChange={(e) => setLambda(Number(e.target.value))}
                className="w-full mt-3 range-lg accent-purple-600"
              />
            </label>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-700 mb-1">Estadísticas</h3>
              <p className="text-gray-600">
                Media (μ):{" "}
                <span className="font-medium">{stats.mean.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Varianza (σ²):{" "}
                <span className="font-medium">{stats.variance.toFixed(2)}</span>
              </p>
              <p className="text-gray-600">
                Desviación estándar (σ):{" "}
                <span className="font-medium">{stats.stdDev.toFixed(2)}</span>
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-bold text-purple-700 mb-2">Ejemplo Médico</h3>
              <p className="text-gray-600 text-sm">
                Llegadas a urgencias: λ={lambda.toFixed(1)} pacientes/hora
                <br />
                Probabilidad de exactamente 5 llegadas:{" "}
                {data.find((d) => d.k === 5)?.probability.toFixed(4) || "N/A"}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <ResponsiveContainer
            width="100%"
            height={responsiveConfig.chartHeight}
          >
            <BarChart data={data} margin={responsiveConfig.margins}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="k"
                tick={{
                  ...getXAxisConfig(data.length, windowSize.width).tick,
                  fill: "#333",
                }}
                height={getXAxisConfig(data.length, windowSize.width).height}
                angle={getXAxisConfig(data.length, windowSize.width).angle}
                textAnchor={
                  getXAxisConfig(data.length, windowSize.width).textAnchor
                }
                dy={getXAxisConfig(data.length, windowSize.width).dy}
                label={{
                  value: "Número de eventos (k)",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#333",
                }}
                interval={
                  shouldRotateLabels(data.length, windowSize.width)
                    ? 0
                    : "preserveStartEnd"
                }
              />
              <YAxis
                tick={{ ...yAxisConfig.default.tick, fill: "#333" }}
                label={{
                  value: "Probabilidad",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#333",
                }}
                tickFormatter={(value) => value.toFixed(3)}
              />
              <Tooltip
                formatter={(value: number) => [
                  value.toFixed(4),
                  "Probabilidad",
                ]}
                labelFormatter={(label: number) => `k = ${label}`}
                contentStyle={tooltipConfig.contentStyle}
              />
              <Bar dataKey="probability" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

// Simulador de Correlación y Regresión
const CorrelationRegressionSimulator = () => {
  const [correlation, setCorrelation] = useState<number>(0.7);
  const [sampleSize, setSampleSize] = useState<number>(50);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== "undefined" ? window.innerWidth : 500,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

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

  const responsiveConfig = getResponsiveConfig(windowSize.width);

  // Generar datos correlacionados
  const data = useMemo(() => {
    const points = [];
    const meanX = 50;
    const meanY = 120;
    const stdX = 10;
    const stdY = 15;

    for (let i = 0; i < sampleSize; i++) {
      // Generar valores X normales
      const u1 = Math.random();
      const u2 = Math.random();
      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

      const x = meanX + stdX * z1;
      const y =
        meanY +
        stdY *
          (correlation * z1 + Math.sqrt(1 - correlation * correlation) * z2);

      points.push({
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        edad: Math.round(x),
        presion: Math.round(y),
      });
    }
    return points;
  }, [correlation, sampleSize]);

  // Calcular estadísticas de regresión
  const regressionStats = useMemo(() => {
    const n = data.length;
    const sumX = data.reduce((sum, point) => sum + point.x, 0);
    const sumY = data.reduce((sum, point) => sum + point.y, 0);
    const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumX2 = data.reduce((sum, point) => sum + point.x * point.x, 0);
    const sumY2 = data.reduce((sum, point) => sum + point.y * point.y, 0);

    const meanX = sumX / n;
    const meanY = sumY / n;

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = meanY - slope * meanX;

    const r =
      (n * sumXY - sumX * sumY) /
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    const r2 = r * r;

    return { slope, intercept, r, r2, meanX, meanY };
  }, [data]);

  // Generar línea de regresión
  const regressionLine = useMemo(() => {
    const minX = Math.min(...data.map((d) => d.x));
    const maxX = Math.max(...data.map((d) => d.x));

    return [
      {
        x: minX,
        y: regressionStats.intercept + regressionStats.slope * minX,
        regression: regressionStats.intercept + regressionStats.slope * minX,
      },
      {
        x: maxX,
        y: regressionStats.intercept + regressionStats.slope * maxX,
        regression: regressionStats.intercept + regressionStats.slope * maxX,
      },
    ];
  }, [data, regressionStats]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Simulador de Correlación y Regresión
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-orange-50 rounded-lg border border-orange-200"
      >
        <h2 className="text-xl font-semibold mb-3 text-orange-800">
          Correlación y Regresión Lineal
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Análisis de la relación entre dos variables cuantitativas:
          <br />
          • Correlación (r): Mide la fuerza y dirección de la relación (-1 a 1)
          <br />
          • Regresión: ŷ = a + bx (línea que mejor ajusta los datos)
          <br />
          • R²: Porcentaje de variabilidad explicada por el modelo
          <br />
          Ejemplo: Relación entre edad y presión arterial
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="block mb-5">
              <span className="text-lg font-semibold text-gray-700">
                Correlación (r): {correlation.toFixed(2)}
              </span>
              <input
                type="range"
                min="-0.95"
                max="0.95"
                step="0.05"
                value={correlation}
                onChange={(e) => setCorrelation(Number(e.target.value))}
                className="w-full mt-3 range-lg accent-orange-600"
              />
            </label>

            <label className="block">
              <span className="text-lg font-semibold text-gray-700">
                Tamaño de muestra: {sampleSize}
              </span>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="w-full mt-3 range-lg accent-orange-600"
              />
            </label>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="p-4 bg-white rounded-lg shadow-sm border-l-4 border-orange-500">
              <h3 className="font-bold text-orange-700 mb-1">
                Estadísticas de Regresión
              </h3>
              <p className="text-gray-600">
                Correlación (r):{" "}
                <span className="font-medium">
                  {regressionStats.r.toFixed(3)}
                </span>
              </p>
              <p className="text-gray-600">
                R² (variabilidad explicada):{" "}
                <span className="font-medium">
                  {(regressionStats.r2 * 100).toFixed(1)}%
                </span>
              </p>
              <p className="text-gray-600">
                Pendiente (b):{" "}
                <span className="font-medium">
                  {regressionStats.slope.toFixed(3)}
                </span>
              </p>
              <p className="text-gray-600">
                Intercepto (a):{" "}
                <span className="font-medium">
                  {regressionStats.intercept.toFixed(1)}
                </span>
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-bold text-orange-700 mb-2">
                Interpretación Clínica
              </h3>
              <p className="text-gray-600 text-sm">
                Ecuación: Presión = {regressionStats.intercept.toFixed(1)} +{" "}
                {regressionStats.slope.toFixed(3)} × Edad
                <br />
                Por cada año de edad, la presión arterial aumenta{" "}
                {regressionStats.slope.toFixed(2)} mmHg
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <ResponsiveContainer
            width="100%"
            height={responsiveConfig.chartHeight}
          >
            <ScatterChart margin={responsiveConfig.margins}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="x"
                type="number"
                domain={["dataMin - 5", "dataMax + 5"]}
                tick={{ ...xAxisConfig.default.tick, fill: "#333" }}
                label={{
                  value: "Edad (años)",
                  position: "insideBottom",
                  offset: 15,
                  fill: "#333",
                }}
              />
              <YAxis
                dataKey="y"
                type="number"
                domain={["dataMin - 10", "dataMax + 10"]}
                tick={{ ...yAxisConfig.default.tick, fill: "#333" }}
                label={{
                  value: "Presión Arterial (mmHg)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#333",
                }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  value.toFixed(1),
                  name === "y" ? "Presión Arterial" : "Edad",
                ]}
                contentStyle={tooltipConfig.contentStyle}
              />
              <Scatter name="Datos" data={data} fill="#f97316" />
              <Line
                type="monotone"
                dataKey="regression"
                data={regressionLine}
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
                name="Línea de Regresión"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

// Simulador de Tamaño de Muestra
const SampleSizeSimulator = () => {
  const [confidenceLevel, setConfidenceLevel] = useState<number>(95);
  const [marginError, setMarginError] = useState<number>(5);
  const [proportion, setProportion] = useState<number>(0.5);
  const [populationSize, setPopulationSize] = useState<number>(10000);
  const [isFinitePopulation, setIsFinitePopulation] = useState<boolean>(false);

  // Calcular Z crítico
  const getZCritical = (confidence: number): number => {
    const alpha = (100 - confidence) / 100;
    const zValues: { [key: number]: number } = {
      90: 1.645,
      95: 1.96,
      99: 2.576,
    };
    return zValues[confidence] || 1.96;
  };

  // Calcular tamaño de muestra
  const sampleSize = useMemo(() => {
    const z = getZCritical(confidenceLevel);
    const e = marginError / 100;
    const p = proportion;

    // Fórmula para población infinita
    const nInfinite = (z * z * p * (1 - p)) / (e * e);

    if (!isFinitePopulation) {
      return Math.ceil(nInfinite);
    }

    // Fórmula para población finita
    const nFinite =
      (nInfinite * populationSize) / (nInfinite + populationSize - 1);
    return Math.ceil(nFinite);
  }, [
    confidenceLevel,
    marginError,
    proportion,
    populationSize,
    isFinitePopulation,
  ]);

  // Datos para visualización
  const data = useMemo(() => {
    const points = [];
    for (let error = 1; error <= 10; error++) {
      const z = getZCritical(confidenceLevel);
      const e = error / 100;
      const p = proportion;
      const n = Math.ceil((z * z * p * (1 - p)) / (e * e));
      points.push({ error, sampleSize: n });
    }
    return points;
  }, [confidenceLevel, proportion]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Calculadora de Tamaño de Muestra
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-red-50 rounded-lg border border-red-200"
      >
        <h2 className="text-xl font-semibold mb-3 text-red-800">
          Cálculo de Tamaño de Muestra
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Determina el número mínimo de sujetos necesarios para un estudio:
          <br />
          • Nivel de confianza: Probabilidad de que el intervalo contenga el
          parámetro
          <br />
          • Error máximo: Diferencia aceptable entre estimación y valor real
          <br />
          • Proporción esperada: Estimación previa del parámetro de interés
          <br />
          Fórmula: n = Z²p(1-p)/e² (población infinita)
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <label className="block mb-4">
              <span className="text-lg font-semibold text-gray-700">
                Nivel de Confianza: {confidenceLevel}%
              </span>
              <select
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(Number(e.target.value))}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
              >
                <option value={90}>90%</option>
                <option value={95}>95%</option>
                <option value={99}>99%</option>
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-lg font-semibold text-gray-700">
                Error Máximo: {marginError}%
              </span>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={marginError}
                onChange={(e) => setMarginError(Number(e.target.value))}
                className="w-full mt-3 range-lg accent-red-600"
              />
            </label>

            <label className="block mb-4">
              <span className="text-lg font-semibold text-gray-700">
                Proporción Esperada: {proportion.toFixed(2)}
              </span>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={proportion}
                onChange={(e) => setProportion(Number(e.target.value))}
                className="w-full mt-3 range-lg accent-red-600"
              />
            </label>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="finitePopulation"
                checked={isFinitePopulation}
                onChange={(e) => setIsFinitePopulation(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="finitePopulation" className="text-gray-700">
                Población finita
              </label>
            </div>

            {isFinitePopulation && (
              <label className="block">
                <span className="text-lg font-semibold text-gray-700">
                  Tamaño Poblacional: {populationSize}
                </span>
                <input
                  type="range"
                  min="100"
                  max="50000"
                  step="100"
                  value={populationSize}
                  onChange={(e) => setPopulationSize(Number(e.target.value))}
                  className="w-full mt-3 range-lg accent-red-600"
                />
              </label>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-red-500">
              <h3 className="font-bold text-red-700 mb-3 text-xl">Resultado</h3>
              <p className="text-3xl font-bold text-red-600 mb-2">
                n = {sampleSize}
              </p>
              <p className="text-gray-600">Tamaño de muestra requerido</p>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-bold text-red-700 mb-2">Interpretación</h3>
              <p className="text-gray-600 text-sm">
                Con {sampleSize} sujetos, tendrás {confidenceLevel}% de
                confianza de que tu estimación estará dentro de ±{marginError}%
                del valor real.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-4 text-center">
            Tamaño de Muestra vs. Error Máximo
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="error"
                tick={{ fill: "#333" }}
                label={{
                  value: "Error Máximo (%)",
                  position: "insideBottom",
                  offset: -10,
                  fill: "#333",
                }}
              />
              <YAxis
                tick={{ fill: "#333" }}
                label={{
                  value: "Tamaño de Muestra",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#333",
                }}
              />
              <Tooltip
                formatter={(value: number) => [value, "Tamaño de Muestra"]}
                labelFormatter={(label: number) => `Error: ${label}%`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="sampleSize"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ fill: "#dc2626", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

// Componente principal de Ejemplos Interactivos
const InteractiveExamples = () => {
  const [currentExample, setCurrentExample] = useState<number>(0);

  const examples = [
    {
      id: 0,
      title: "Distribución Normal",
      description: "Explora la distribución normal y sus propiedades",
      component: <NormalDistributionSimulator />,
      color: "blue",
    },
    {
      id: 1,
      title: "Distribución Binomial",
      description: "Simula eventos con dos resultados posibles",
      component: <BinomialDistributionSimulator />,
      color: "green",
    },
    {
      id: 2,
      title: "Distribución de Poisson",
      description: "Modela eventos raros en intervalos fijos",
      component: <PoissonDistributionSimulator />,
      color: "purple",
    },
    {
      id: 3,
      title: "Correlación y Regresión",
      description: "Analiza relaciones entre variables",
      component: <CorrelationRegressionSimulator />,
      color: "orange",
    },
    {
      id: 4,
      title: "Tamaño de Muestra",
      description: "Calcula el tamaño de muestra necesario",
      component: <SampleSizeSimulator />,
      color: "red",
    },
  ];

  const currentExampleData = examples[currentExample];

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % examples.length);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + examples.length) % examples.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de navegación */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Ejemplos Interactivos de Estadística
              </h1>
              <p className="text-gray-600 mt-1">
                Explora conceptos estadísticos con simulaciones interactivas
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={prevExample}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={currentExample === 0}
              >
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Anterior
              </button>

              <span className="text-sm text-gray-500">
                {currentExample + 1} de {examples.length}
              </span>

              <button
                onClick={nextExample}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={currentExample === examples.length - 1}
              >
                Siguiente
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selector de ejemplos */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {examples.map((example, index) => (
              <button
                key={example.id}
                onClick={() => setCurrentExample(index)}
                className={`p-3 rounded-lg text-xs font-medium transition-all text-center ${
                  currentExample === index
                    ? `bg-${example.color}-100 text-${example.color}-700 border-2 border-${example.color}-300`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
                }`}
              >
                <div className="font-semibold mb-1 leading-tight">
                  {example.title}
                </div>
                <div className="text-xs opacity-75 leading-tight hidden sm:block">
                  {example.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido del ejemplo actual */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExample}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentExampleData.component}
        </motion.div>
      </AnimatePresence>

      {/* Footer con información adicional */}
      <div className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Ejemplo {currentExample + 1}:</strong>{" "}
              {currentExampleData.title}
            </p>
            <p className="text-sm">{currentExampleData.description}</p>
            <div className="mt-4 text-xs text-gray-500">
              Usa los controles interactivos para explorar diferentes parámetros
              y observar cómo cambian las distribuciones y cálculos.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveExamples;
