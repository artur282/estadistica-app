// Configuración global para los gráficos de recharts
// Este archivo contiene configuraciones para evitar la superposición de texto en las gráficas

// Configuración de márgenes para diferentes tipos de gráficos
export const chartMargins = {
  default: {
    top: 20,
    right: 30,
    left: 40,
    bottom: 30,
  },
  vertical: {
    top: 20,
    right: 30,
    left: 80, // Mayor espacio para etiquetas verticales
    bottom: 20,
  },
  pie: {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20,
  },
};

// Configuración para ejes X
export const xAxisConfig = {
  default: {
    tick: { fontSize: 12 },
    height: 60,
    angle: -45,
    textAnchor: "end",
    dy: 10,
  },
  noAngle: {
    tick: { fontSize: 12 },
    height: 50,
    angle: 0,
    textAnchor: "middle",
    dy: 10,
  },
  rotated: {
    tick: { fontSize: 11 },
    height: 80,
    angle: -45,
    textAnchor: "end",
    dy: 15,
  },
  vertical: {
    tick: { fontSize: 10 },
    height: 100,
    angle: -90,
    textAnchor: "middle",
    dy: 5,
  },
};

// Configuración para ejes Y
export const yAxisConfig = {
  default: {
    tick: { fontSize: 12 },
    width: 50,
  },
  withLabel: {
    tick: { fontSize: 12 },
    width: 60,
    dx: -10,
  },
};

// Función para aplicar configuración de responsividad a los gráficos
export const getResponsiveConfig = (windowWidth: number) => {
  // Ajustar tamaños según el ancho de la ventana
  if (windowWidth < 576) {
    // Móviles pequeños
    return {
      chartWidth: Math.min(windowWidth - 40, 300),
      chartHeight: 300,
      fontSize: 10,
      margins: {
        ...chartMargins.default,
        left: 40,
        bottom: 80, // Más espacio para etiquetas rotadas
      },
    };
  } else if (windowWidth < 768) {
    // Tablets y móviles grandes
    return {
      chartWidth: Math.min(windowWidth - 60, 450),
      chartHeight: 350,
      fontSize: 11,
      margins: {
        ...chartMargins.default,
        bottom: 70,
      },
    };
  } else {
    // Pantallas grandes
    return {
      chartWidth: Math.min(windowWidth - 80, 500),
      chartHeight: 400,
      fontSize: 12,
      margins: {
        ...chartMargins.default,
        bottom: 60,
      },
    };
  }
};

// Función para determinar si se deben rotar las etiquetas basado en el número de elementos
export const shouldRotateLabels = (
  dataLength: number,
  windowWidth: number
): boolean => {
  if (windowWidth < 576) return dataLength > 4;
  if (windowWidth < 768) return dataLength > 6;
  return dataLength > 8;
};

// Función para obtener configuración de eje X basada en los datos
export const getXAxisConfig = (dataLength: number, windowWidth: number) => {
  if (shouldRotateLabels(dataLength, windowWidth)) {
    if (windowWidth < 576) {
      return xAxisConfig.vertical;
    }
    return xAxisConfig.rotated;
  }
  return xAxisConfig.noAngle;
};

// Configuración para evitar superposición en tooltips
export const tooltipConfig = {
  contentStyle: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "12px",
    padding: "8px",
  },
};
