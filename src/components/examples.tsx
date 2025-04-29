import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const NormalDistributionSimulator = () => {
  const [mean, setMean] = useState<number>(0);
  const [stdDev, setStdDev] = useState<number>(1);

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
            <AreaChart
              width={Math.min(window.innerWidth - 40, 500)} // Ajustar el ancho dinámicamente con un máximo de 700px
              height={Math.min(window.innerHeight / 2, 600)} // Ajustar la altura dinámicamente con un máximo de 400px
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 17 }}
              style={{ maxWidth: "100%", height: "auto" }} // Asegurar que el gráfico se ajuste al contenedor
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis
                dataKey="x"
                tickFormatter={(value) => value.toFixed(1)}
                tick={{ fill: "#333" }}
                label={{
                  value: "Valores (x)",
                  position: "bottom",
                  fill: "#333",
                  fontSize: 14,
                }}
              />
              <YAxis
                tick={{ fill: "#333" }}
                label={{
                  value: "Densidad",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#333",
                  fontSize: 14,
                }}
              />
              <Tooltip
                formatter={(value: number) => [
                  <span key="1" className="font-bold">
                    {value.toFixed(4)}
                  </span>,
                  "Densidad",
                ]}
                labelFormatter={(label: number) => `Valor: ${label.toFixed(2)}`}
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NormalDistributionSimulator;
