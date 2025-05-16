export interface TheoryTopic {
  id: number;
  title: string;
  content: string;
  example?: string;
  formula?: string;
  lapso: number;
}

export const statisticsTopics: TheoryTopic[] = [
  // ================================= LAPSO 1 =================================
  {
    id: 1,
    title: "1.1.- Presentación e Historia de la Estadística en Salud",
    content: `La estadística aplicada a la salud surge formalmente en el siglo XIX con los trabajos de Florence Nightingale en epidemiología y control de infecciones. En el siglo XX se desarrollaron técnicas para ensayos clínicos y estudios epidemiológicos longitudinales. Actualmente es fundamental en:
    - Monitoreo de pandemias
    - Evaluación de políticas sanitarias
    - Investigación médica traslacional
    - Gestión de recursos hospitalarios`,
    example:
      "El estudio Framingham (1948) usó métodos estadísticos para identificar factores de riesgo cardiovascular",
    lapso: 1,
  },
  {
    id: 2,
    title: "1.2.- Estadística (Conceptos Básicos)",
    content: `Ciencia que permite transformar datos en conocimiento accionable:
    - Población: Conjunto completo de interés (ej. todos los pacientes con cáncer)
    - Muestra: Subgrupo representativo (ej. 1,000 pacientes oncológicos)
    - Parámetro: Medida poblacional (μ = media real)
    - Estadístico: Medida muestral (x̄ = media muestral)
    - Variable: Característica medible (ej. presión arterial)`,
    formula: "Error\\,estándar = \\frac{σ}{\\sqrt{n}}",
    example: "Población: 50,000 pacientes\nMuestra: 200 historias clínicas",
    lapso: 1,
  },
  {
    id: 3,
    title: "1.3.- Importancia",
    content: `Roles críticos en salud:
    1. Diagnóstico: Curvas ROC para evaluar pruebas médicas
    2. Pronóstico: Modelos de supervivencia (Kaplan-Meier)
    3. Prevención: Cálculo de riesgo poblacional
    4. Investigación: Diseño de ensayos controlados aleatorizados
    5. Gestión: Optimización de camas hospitalarias`,
    example:
      "Modelos estadísticos predicen brotes de malaria usando datos climáticos",
    lapso: 1,
  },
  {
    id: 4,
    title: "1.4.- Aplicaciones en Medicina",
    content: `Usos específicos:
    - Metaanálisis: Combinar resultados de múltiples estudios
    - Farmacovigilancia: Detectar reacciones adversas
    - Imagenología: Análisis cuantitativo de resonancias
    - Genómica: Identificación de genes asociados a enfermedades`,
    formula: "RR = \\frac{Incidencia\\,expuestos}{Incidencia\\,no\\,expuestos}",
    example: "RR=2.3: Los expuestos tienen 2.3 veces más riesgo",
    lapso: 1,
  },
  {
    id: 5,
    title: "1.5.- El Método Estadístico",
    content: `Proceso sistemático:
    1. Definir problema clínico/investigación
    2. Diseñar protocolo de recolección
    3. Validar calidad de datos
    4. Aplicar técnicas analíticas
    5. Interpretar resultados
    6. Comunicar hallazgos
    Ciclo iterativo con retroalimentación constante`,
    example: "Flujograma para estudio de efectividad de vacuna",
    lapso: 1,
  },
  {
    id: 6,
    title: "2.1.- Datos Estadísticos",
    content: `Materia prima del análisis:
    - Primarios: Recolectados directamente (encuestas)
    - Secundarios: Bases de datos existentes (registros hospitalarios)
    - Discretos: Valores enteros (número de cirugías)
    - Continuos: Infinitos decimales (nivel de glucosa)`,
    formula:
      "Datos\\,faltantes = \\frac{Valores\\,missing}{Total\\,datos} × 100",
    example: "Base de datos con 15% valores missing en colesterol LDL",
    lapso: 1,
  },
  {
    id: 7,
    title: "2.2.- Variables Estadísticas",
    content: `Clasificación fundamental:
    - Cualitativas: 
      • Nominales: Sin orden (grupo sanguíneo)
      • Ordinales: Jerarquía sin distancia (estadio cáncer)
    - Cuantitativas:
      • Discretas: Conteos (número de consultas)
      • Continuas: Mediciones precisas (temperatura corporal)`,
    example: "Variable ordinal: Escala de dolor (0-10)",
    lapso: 1,
  },
  {
    id: 8,
    title: "2.3.- Tipos de Variables",
    content: `Impacto en análisis:
    - Independientes: Predictoras/explicativas (edad, tratamiento)
    - Dependientes: Resultados (supervivencia, presión arterial)
    - Confusoras: Factores externos (IMC en estudio cardíaco)
    - Medición: Escala determina pruebas aplicables`,
    formula: "χ² = \\sum\\frac{(O-E)^2}{E} (prueba categóricas)",
    example: "Variable confusora: Tabaquismo en estudio de cáncer pulmonar",
    lapso: 1,
  },
  {
    id: 9,
    title: "2.4.- Escalas de Medición",
    content: `Jerarquía de medición:
    1. Nominal: Clasificación sin orden (género)
    2. Ordinal: Orden sin distancia (estado funcional)
    3. Intervalar: Orden + distancia, cero arbitrario (temperatura °C)
    4. Razón: Orden + distancia + cero absoluto (peso)`,
    formula: "Moda\\,nominal ≤ Mediana\\,ordinal ≤ Media\\,intervalar",
    example: "Escala Apgar neonatal: Ordinal (0-10 puntos)",
    lapso: 1,
  },
  {
    id: 10,
    title: "2.5.- Tipos de Escalas de Medición",
    content: `Operaciones permitidas por escala:
    - Nominal: = ≠
    - Ordinal: = ≠ > <
    - Intervalar: + -
    - Razón: × ÷
    Determina métodos estadísticos aplicables`,
    example: "TAC: Escala de razón (0 = ausencia de masa)",
    lapso: 1,
  },
  {
    id: 11,
    title: "3.1.- Tablas de Distribución Frecuencias",
    content: `Organización de datos en categorías:
    - Amplitud de clase: Límite superior - inferior
    - Marca de clase: Punto medio del intervalo
    - Frecuencia acumulada: Suma progresiva
    - Densidad: Frecuencia/amplitud`,
    formula: "Número\\,clases ≈ 1 + 3.322 log_{10}(n) (Regla Sturges)",
    example: "Edades: [20-30) 15%, [30-40) 22%, ...",
    lapso: 1,
  },
  {
    id: 12,
    title: "3.2.- Componentes y Construcción",
    content: `Pasos para crear tabla:
    1. Determinar rango (max - min)
    2. Calcular número de clases
    3. Definir amplitud
    4. Establecer límites
    5. Contar frecuencias
    Considerar sobreposición y exhaustividad`,
    formula: "Amplitud = \\frac{Rango}{Número\\,clases}",
    example: "Rango=50 años → 5 clases de 10 años",
    lapso: 1,
  },
  {
    id: 13,
    title: "3.3.- Representación Gráfica",
    content: `Visualización de distribuciones:
    - Histograma: Barras contiguas para datos continuos
    - Polígono: Línea que une marcas de clase
    - Diagrama caja: Resume cuartiles y outliers
    - Pirámide poblacional: Doble histograma para grupos`,
    formula: "Densidad = \\frac{Frecuencia}{Amplitud}",
    example: "Histograma de índice de masa corporal en adolescentes",
    lapso: 1,
  },
  {
    id: 14,
    title: "4.1.- Medidas de Tendencia Central",
    content: `Resumen de posición central:
    - Media: Sensible a outliers (ingresos hospitalarios)
    - Mediana: Punto medio (tiempo de espera)
    - Moda: Valor más frecuente (diagnóstico principal)
    Uso según tipo de distribución y datos`,
    formula: "Media\\,recortada = \\frac{1}{n-2k}\\sum_{i=k+1}^{n-k}x_i",
    example:
      "Media: 8.2 días estancia\nMediana: 6 días (distribución asimétrica)",
    lapso: 1,
  },
  {
    id: 15,
    title: "4.2.- Medidas de Posición",
    content: `Localización relativa en distribución:
    - Cuartiles (Q1=25%, Q2=50%, Q3=75%)
    - Deciles (D1-D9)
    - Percentiles (P1-P99)
    Esenciales para interpretar resultados clínicos`,
    formula: "Posición\\,percentil = \\frac{(n+1)P}{100}",
    example: "Percentil 95 de TSH: 4.5 mUI/L (umbral hipertiroidismo)",
    lapso: 1,
  },
  {
    id: 16,
    title: "4.3.- Medidas de Dispersión",
    content: `Cuantificación de variabilidad:
    - Rango: Max - min
    - Rango intercuartílico: Q3 - Q1
    - Varianza: Promedio desviaciones al cuadrado
    - CV: Dispersión relativa (% respecto media)`,
    formula: "IQR = Q_3 - Q_1\\\\CV = \\frac{\\sigma}{|\\bar{x}|} \\times 100\\%",
    example: "Presión arterial: σ=12 mmHg, CV=10% (baja variabilidad)",
    lapso: 1,
  },
  {
    id: 17,
    title: "5.1.- Diagramas de Regresión y Correlación",
    content: `Análisis de relaciones:
    - Diagrama dispersión: Puntos (X,Y)
    - Recta regresión: ŷ = a + bx
    - Correlación: Dirección y fuerza (-1 a 1)
    - Residuales: Diferencias entre valores reales y predichos`,
    formula: "Pendiente\\,(b) = r\\frac{s_y}{s_x}",
    example: "Relación dosis-efecto de analgésico",
    lapso: 1,
  },
  {
    id: 18,
    title: "5.2.- Coeficiente de Regresión",
    content: `Interpretación de parámetros:
    - b: Cambio en Y por unidad X (efecto dosis)
    - a: Valor basal cuando X=0
    - R²: % variabilidad explicada
    - IC 95%: Precisión estimación parámetros`,
    formula: "R² = \\frac{SSR}{SST} = 1 - \\frac{SSE}{SST}",
    example: "b=0.8: Cada mg aumenta efecto en 0.8 unidades (p<0.05)",
    lapso: 1,
  },
  {
    id: 19,
    title: "5.3.- Coeficiente de Correlación",
    content: `Medida estandarizada de asociación lineal:
    - r=1: Relación positiva perfecta
    - r=-1: Relación negativa perfecta
    - r=0: No correlación lineal
    Precaución con correlaciones espurias`,
    formula: "r = \\frac{\\sum z_x z_y}{n-1}",
    example: "Correlación edad-presión arterial: r=0.45 (p=0.01)",
    lapso: 1,
  },
  {
    id: 20,
    title: "5.4.- Interpretación",
    content: `Evaluación de resultados:
    - Significancia estadística vs importancia clínica
    - Tamaño del efecto (Cohen: d=0.2 pequeño, 0.5 medio, 0.8 grande)
    - Análisis de residuales para validar supuestos
    - Transformaciones para relaciones no lineales`,
    example: "r²=0.15 → 15% variabilidad explicada (efecto modesto)",
    lapso: 1,
  },

  // ================================= LAPSO 2-3 =================================
  {
    id: 21,
    title: "1.1.- Probabilidades: Conceptos Básicos",
    content: `Fundamento para diagnóstico médico y predicción:
    - Espacio muestral: Todos resultados posibles (ej. {sano, enfermo})
    - Evento: Subconjunto resultados (ej. pacientes con fiebre >39°C)
    - Probabilidad clásica: Casos favorables/posibles
    - Probabilidad subjetiva: Juicio experto (ej. pronóstico)`,
    formula: "P(A) = \\frac{n(A)}{n(Ω)}",
    example: "Probabilidad de sepsis en UCI: 18% (180/1000 casos)",
    lapso: 2,
  },
  {
    id: 22,
    title: "Experimento Aleatorio y Espacio Muestral",
    content: `Características:
    - Reproducible bajo mismas condiciones
    - Resultados inciertos
    - Espacio muestral definible
    Ejemplos médicos:
    - Resultado de tratamiento
    - Tiempo hasta recaída
    - Efectos adversos`,
    example: "Ω = {curación, mejora, sin cambio, empeoramiento}",
    lapso: 2,
  },
  {
    id: 23,
    title: "Sucesos o Eventos (Tipos)",
    content: `Clasificación:
    - Simples: Un solo resultado (ej. muerte)
    - Compuestos: Múltiples resultados (ej. complicación)
    - Compatibles: Pueden ocurrir juntos (diabetes e hipertensión)
    - Excluyentes: Muerte vs supervivencia`,
    formula: "P(A∪B) = P(A) + P(B) - P(A∩B)",
    example: "Eventos excluyentes: Embarazo vs género masculino",
    lapso: 2,
  },
  {
    id: 24,
    title: "Algebra de Sucesos",
    content: `Operaciones lógicas:
    - Unión (A∨B): Ocurre A o B
    - Intersección (A∧B): Ocurren ambos
    - Complemento (¬A): No ocurre A
    - Diferencia (A-B): A ocurre pero no B`,
    formula:
      "\\neg(A\\cup B) = \\neg A\\cap \\neg B\\\\\\neg(A\\cap B) = \\neg A\\cup \\neg B",
    example: "¬(Fiebre∧Tos) = ¬Fiebre∨¬Tos",
    lapso: 2,
  },
  {
    id: 25,
    title: "1.2.- Teoremas Básicos de Probabilidad",
    content: `Reglas fundamentales:
    1. 0 ≤ P(A) ≤ 1
    2. P(Ω) = 1
    3. Adición: P(A∪B) = P(A) + P(B) - P(A∩B)
    4. Complemento: P(¬A) = 1 - P(A)
    5. Condicional: P(A|B) = P(A∩B)/P(B)`,
    formula: "P(A|B) = \\frac{P(A∩B)}{P(B)}",
    example: "P(Infarto|Diabetes) = 0.25",
    lapso: 2,
  },
  {
    id: 26,
    title: "Teorema de Bayes",
    content: `Actualizar probabilidades con nueva evidencia:
    - Probabilidad a priori → a posteriori
    - Fundamental en diagnósticos médicos
    - Considera sensibilidad y especificidad`,
    formula: "P(A_i|B) = \\frac{P(B|A_i)P(A_i)}{\\sum_{j=1}^n P(B|A_j)P(A_j)}",
    example: "Probabilidad de cáncer dado test positivo: 7.8%",
    lapso: 2,
  },
  {
    id: 27,
    title: "2.1.- Métodos de Muestreo",
    content: `Técnicas de selección:
    - Aleatorio simple: Todos igual probabilidad
    - Estratificado: Subgrupos homogéneos (edad, sexo)
    - Conglomerados: Unidades naturales (hospitales)
    - Sistemático: Selección cada k elementos
    No aleatorios: Conveniencia, consecutivos`,
    formula: "k = \\frac{N}{n} (intervalo\\,muestreo)",
    example: "Muestreo estratificado por grupos etarios en estudio nutricional",
    lapso: 2,
  },
  {
    id: 28,
    title: "Tamaño de Muestra para Media",
    content: `Cálculo considerando:
    - Nivel confianza (Z_{α/2})
    - Varianza estimada (σ²)
    - Error máximo aceptable (e)
    - Tamaño poblacional (N)`,
    formula: "n = \\frac{Z^2 σ^2 N}{e^2 (N-1) + Z^2 σ^2} (población\\,finita)",
    example: "σ=15, e=3, Z=1.96 → n≈96",
    lapso: 2,
  },
  {
    id: 29,
    title: "Tamaño de Muestra para Proporción",
    content: `Usado en estudios de prevalencia:
    - Proporción esperada (p)
    - Error máximo (e)
    - Nivel confianza (Z)
    - Efecto diseño (para muestreo complejo)`,
    formula: "n = \\frac{Z^2 p(1-p)}{e^2}",
    example: "p=0.5, e=0.05, Z=1.96 → n≈385",
    lapso: 2,
  },
  {
    id: 30,
    title: "1.3.- Distribución Binomial",
    content: `Modela conteos de éxitos en n ensayos:
    - Ensayos independientes
    - Probabilidad constante (p)
    - Resultados binarios (éxito/fracaso)
    Media: μ = np
    Varianza: σ² = np(1-p)`,
    formula: "P(k) = C(n,k) p^k (1-p)^{n-k}",
    example:
      "Probabilidad de 3 reacciones adversas en 50 pacientes: P(3)=0.214",
    lapso: 2,
  },
  {
    id: 31,
    title: "1.4.- Distribución Poisson",
    content: `Eventos raros en intervalo fijo:
    - Tasa promedio (λ)
    - Independencia temporal
    - Media = Varianza = λ
    Aproxima binomial cuando n≥20 y p≤0.05`,
    formula: "P(k) = \\frac{e^{-λ} λ^k}{k!}",
    example: "Llegadas a urgencias: λ=4.2/hora → P(5)=0.163",
    lapso: 2,
  },
  {
    id: 32,
    title: "1.5.- Distribución Normal",
    content: `Distribución continua en forma de campana:
    - Simétrica alrededor de μ
    - Regla 68-95-99.7 (1-2-3 σ)
    - Estandarización: Z = (X-μ)/σ
    - Base para inferencia estadística`,
    formula:
      "f(x) = \\frac{1}{σ\\sqrt{2π}} e^{-\\frac{1}{2}(\\frac{x-μ}{σ})^2}",
    example: "Talla adultos: μ=170 cm, σ=10 cm → 95% entre 150-190 cm",
    lapso: 2,
  },

  // ================================= LAPSO 3 =================================
  {
    id: 33,
    title: "1.2.- Propiedades, aplicaciones y cálculos de Distribuciones de Probabilidades",
    content: `Características fundamentales:
    - Función de probabilidad/densidad
    - Función de distribución acumulada
    - Esperanza matemática (media)
    - Varianza y desviación estándar
    - Aplicaciones en diagnóstico y pronóstico`,
    formula: "E(X) = \\sum x_i \\cdot P(x_i) \\quad \\sigma^2 = E[(X-\\mu)^2]",
    example: "Distribución de niveles de colesterol en población sana",
    lapso: 3,
  },
  {
    id: 34,
    title: "1.3.- Distribución Binomial",
    content: `Modelo para eventos dicotómicos:
    - Ensayos independientes
    - Probabilidad constante p
    - Solo dos resultados (éxito/fracaso)
    - Número fijo de ensayos n
    - Media: np, Varianza: np(1-p)`,
    formula: "P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}",
    example: "Remisión en n=20 pacientes con p=0.3 de éxito por tratamiento",
    lapso: 3,
  },
  {
    id: 35,
    title: "1.4.- Distribución Poisson",
    content: `Para eventos raros en intervalo fijo:
    - Tasa media λ (lambda)
    - Eventos independientes
    - Probabilidad proporcional al intervalo
    - Media = Varianza = λ
    - Aproxima binomial cuando n grande, p pequeño`,
    formula: "P(X=k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}",
    example: "Llegadas a emergencias: λ=5 pacientes/hora",
    lapso: 3,
  },
  {
    id: 36,
    title: "1.5.- Distribución Normal",
    content: `Modelo continuo fundamental:
    - Forma de campana simétrica
    - Parámetros μ (media) y σ (desviación estándar)
    - Regla 68-95-99.7% (1σ-2σ-3σ)
    - Estandarización: Z = (X-μ)/σ
    - Teorema del límite central`,
    formula: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}",
    example: "Presión arterial: μ=120 mmHg, σ=10 mmHg → 95% entre 100-140 mmHg",
    lapso: 3,
  },

  // ================================= LAPSO 4-5 =================================
  {
    id: 37,
    title: "1.1.- Hipótesis Estadística",
    content: `Contraste de afirmaciones:
    - H₀: No efecto/diferencia (status quo)
    - H₁: Efecto/diferencia existente
    - Pruebas paramétricas (normalidad) vs no paramétricas
    - Unilateral (direccional) vs bilateral`,
    formula: "z = \\frac{\\bar{x} - μ_0}{σ/\\sqrt{n}}",
    example: "H₀: μ_glucosa=100 mg/dL vs H₁: μ>100 mg/dL",
    lapso: 4,
  },
  {
    id: 38,
    title: "2.1.- Pruebas Unilaterales/Bilaterales",
    content: `Elección según hipótesis:
    - Bilateral: H₁: μ≠μ0 (dos colas)
    - Unilateral: H₁: μ>μ0 o μ<μ0 (cola derecha/izquierda)
    - Valor p: Divide según dirección (pruebas unilaterales)`,
    formula: "Valor\\,p = P(Estadístico ≥ t_{obs} | H₀)",
    example: "Prueba unilateral derecha para aumento de peso medio",
    lapso: 4,
  },
  {
    id: 39,
    title: "2.2.- Errores Tipo I y II",
    content: `Riesgos en decisión:
    - α = P(Rechazar H₀ | H₀ verdadera) (Falso positivo)
    - β = P(Aceptar H₀ | H₁ verdadera) (Falso negativo)
    - Potencia = 1-β: Detectar efecto existente`,
    formula: "Potencia = P(Rechazar\\,H₀ | H₁\\,verdadera)",
    example: "α=0.05, β=0.20 → Potencia=80%",
    lapso: 4,
  },
  {
    id: 40,
    title: "2.3.- Pruebas para Muestras Pequeñas",
    content: `Uso de distribución t-Student:
    - n < 30
    - σ poblacional desconocida
    - Grados libertad = n - 1
    - Colas más pesadas que normal`,
    formula: "t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}",
    example: "n=15: t_{critico, 0.05, 14}=2.145 (unilateral)",
    lapso: 4,
  },
  {
    id: 41,
    title: "2.4.- Pruebas con Distribución t y Normal",
    content: `Comparación entre distribuciones:
    - t-Student: Muestras pequeñas (n < 30), σ desconocida
    - Normal (Z): Muestras grandes o σ conocida
    - Grados libertad (t): n - 1
    - Colas más pesadas en t → valores críticos mayores`,
    formula:
      "t_{gl} = \\frac{\\bar{x} - μ}{s/\\sqrt{n}} \\quad vs \\quad Z = \\frac{\\bar{x} - μ}{σ/\\sqrt{n}}",
    example: "n=20, s=5 → t_{19,0.05}=1.729 vs Z_{0.05}=1.645",
    lapso: 4,
  },
  {
    id: 42,
    title: "1.1.- Demografía: Conceptos",
    content: `Estudio cuantitativo de poblaciones:
    - Estructura por edad/sexo (pirámides poblacionales)
    - Movimientos naturales (natalidad, mortalidad)
    - Movimientos migratorios
    - Transición demográfica (etapas desarrollo)
    - Indicadores clave para políticas sanitarias`,
    formula:
      "Tasa\\,bruta\\,natalidad = \\frac{Nacidos\\,vivos}{Población\\,media} × 1000",
    example: "País en desarrollo: TBN=25‰, Esperanza vida=68 años",
    lapso: 5,
  },
  {
    id: 43,
    title: "2.1.- Indicadores Demográficos",
    content: `Medidas fundamentales:
    1. Tasa mortalidad infantil = (Defunciones <1 año/Nacidos vivos) × 1000
    2. Razón dependencia = (Población <15 + >65)/Población 15-64
    3. Tasa fertilidad = Nacidos vivos/Mujeres 15-49 años
    4. Crecimiento vegetativo = TBN - TBM`,
    formula:
      "Crecimiento\\,poblacional = (Nacimientos - Defunciones) + Migración\\,neta",
    example: "País A: TBN=18‰, TBM=7‰ → Crecimiento 1.1%",
    lapso: 5,
  },
  {
    id: 44,
    title: "2.2.- Tasas Demográficas",
    content: `Cálculo y ajuste de tasas:
    - Crudas: Sin ajustar por estructura poblacional
    - Específicas: Por edad/sexo/causa
    - Estandarizadas: Comparación entre poblaciones
    - Años de vida perdidos (AVP): Carga de enfermedad`,
    formula:
      "Tasa\\,Estandarizada = \\sum (Tasa\\,específica × Población\\,referencia)",
    example:
      "Tasa mortalidad por cáncer estandarizada por edad (población mundial)",
    lapso: 5,
  },
];
