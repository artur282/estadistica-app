import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { exercises } from "../data/exercises";
import {
  saveExerciseProgress,
  ExerciseProgress,
  saveExerciseSession,
  ExerciseSession,
} from "../utils/db"; // Import db utils

// Función para mezclar array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface ExerciseStats {
  correct: number;
  incorrect: number;
  total: number;
  current: number;
}

const Exercise: React.FC = () => {
  const [shuffledExercises, setShuffledExercises] = useState<typeof exercises>(
    []
  );
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stats, setStats] = useState<ExerciseStats>({
    correct: 0,
    incorrect: 0,
    total: exercises.length,
    current: 1,
  });
  const [hasStarted, setHasStarted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [sessionId] = useState<string>(
    () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [finalStats, setFinalStats] = useState<ExerciseStats | null>(null);

  // Inicializar ejercicios mezclados
  useEffect(() => {
    const shuffled = shuffleArray(exercises);
    setShuffledExercises(shuffled);
  }, []);

  const currentExercise = shuffledExercises[currentExerciseIndex];

  const handleOptionSelect = useCallback(
    (option: string) => {
      setSelectedOption(option);
      if (!hasStarted) {
        setHasStarted(true);
        setSessionStartTime(new Date());
      }
    },
    [hasStarted]
  );

  const completeSession = useCallback(
    async (currentStats: ExerciseStats) => {
      if (!sessionStartTime) return;

      const endTime = new Date();
      const totalTimeSpent = Math.round(
        (endTime.getTime() - sessionStartTime.getTime()) / 1000
      );
      const completionPercentage = Math.round(
        (currentStats.current / currentStats.total) * 100
      );

      const session: ExerciseSession = {
        sessionId,
        userId: "defaultUser", // En una app real, esto vendría del contexto de usuario
        totalQuestions: currentStats.total,
        correctAnswers: currentStats.correct,
        incorrectAnswers: currentStats.incorrect,
        totalTimeSpent,
        completionPercentage,
        startTime: sessionStartTime,
        endTime,
        isCompleted: currentStats.current >= currentStats.total,
      };

      try {
        await saveExerciseSession(session);
        console.log("Sesión de ejercicios guardada:", session);
        setShowCompletionModal(true);
      } catch (error) {
        console.error("Error al guardar la sesión:", error);
      }
    },
    [sessionStartTime, sessionId]
  );

  const handleSubmit = useCallback(async () => {
    setShowAnswer(true);

    // Actualizar estadísticas
    const isCorrect = selectedOption === currentExercise.correctAnswer;
    const newStats = {
      correct: isCorrect ? stats.correct + 1 : stats.correct,
      incorrect: !isCorrect ? stats.incorrect + 1 : stats.incorrect,
      total: stats.total,
      current: stats.current,
    };

    setStats(newStats);

    // Verificar si es el último ejercicio
    const isLastExercise =
      currentExerciseIndex === shuffledExercises.length - 1;

    if (isLastExercise) {
      // Guardar estadísticas finales para el modal
      const finalSessionStats = {
        ...newStats,
        current: stats.total, // Marcar como completado
      };
      setFinalStats(finalSessionStats);

      // Completar sesión
      setTimeout(() => {
        completeSession(finalSessionStats);
      }, 100); // Pequeño delay para asegurar que el estado se actualice
    }

    // Save exercise progress
    if (currentExercise && selectedOption && startTime) {
      const endTime = new Date();
      const calculatedTimeSpent = Math.round(
        (endTime.getTime() - startTime.getTime()) / 1000
      ); // in seconds

      const progressData: ExerciseProgress = {
        exerciseId: currentExercise.id, // Assuming 'id' is the exerciseId
        topicId: currentExercise.lapso, // Assuming 'lapso' is the topicId
        status: "attempted", // Or 'completed' based on your logic
        selectedAnswer: selectedOption,
        isCorrect: isCorrect,
        timestamp: new Date(),
        timeSpent: calculatedTimeSpent, // Add timeSpent
        // score can be added later
      };
      try {
        await saveExerciseProgress(progressData);
        console.log("Exercise progress saved:", progressData);
      } catch (error) {
        console.error("Failed to save exercise progress:", error);
      }
    }
  }, [
    selectedOption,
    currentExercise,
    stats,
    currentExerciseIndex,
    shuffledExercises.length,
    startTime,
    completeSession,
  ]);

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    setShowAnswer(false);
    setStartTime(new Date()); // Record start time on next exercise

    if (currentExerciseIndex < shuffledExercises.length - 1) {
      setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
      setStats((prevStats) => ({
        ...prevStats,
        current: prevStats.current + 1,
      }));
    } else {
      // Es el último ejercicio, reiniciar para nueva sesión
      setCurrentExerciseIndex(0);
      setStats({
        correct: 0,
        incorrect: 0,
        total: exercises.length,
        current: 1,
      });
      setHasStarted(false);
      setSessionStartTime(null);
    }
  }, [currentExerciseIndex, shuffledExercises.length]);

  // Effect to set initial start time
  useEffect(() => {
    setStartTime(new Date());
  }, [currentExerciseIndex]);

  // Effect for keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Solo procesar teclas si hay un ejercicio actual
      if (!currentExercise) return;

      // Prevenir acción por defecto para las teclas que manejamos
      if (["1", "2", "3", "4", "Enter"].includes(event.key)) {
        event.preventDefault();
      }

      // Seleccionar opciones con teclas 1, 2, 3, 4
      if (["1", "2", "3", "4"].includes(event.key)) {
        const optionIndex = parseInt(event.key) - 1;
        if (optionIndex < currentExercise.options.length && !showAnswer) {
          handleOptionSelect(currentExercise.options[optionIndex]);
        }
      }

      // Verificar respuesta o siguiente ejercicio con Enter
      if (event.key === "Enter") {
        if (!showAnswer && selectedOption) {
          // Si no se ha mostrado la respuesta y hay una opción seleccionada, verificar
          handleSubmit();
        } else if (showAnswer) {
          // Si ya se mostró la respuesta, ir al siguiente ejercicio
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    currentExercise,
    showAnswer,
    selectedOption,
    handleSubmit,
    handleNext,
    handleOptionSelect,
  ]);

  // Effect for beforeunload warning - mostrar alerta si hay progreso
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasStarted && (stats.correct > 0 || stats.incorrect > 0)) {
        event.preventDefault();
        event.returnValue =
          "¿Estás seguro de que quieres salir? Se perderá todo tu progreso en los ejercicios.";
        return event.returnValue;
      }
    };

    const handlePopState = () => {
      if (hasStarted && (stats.correct > 0 || stats.incorrect > 0)) {
        const confirmLeave = window.confirm(
          "¿Estás seguro de que quieres salir? Se perderá todo tu progreso en los ejercicios."
        );
        if (!confirmLeave) {
          window.history.pushState(null, "", window.location.href);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // Prevenir navegación hacia atrás si hay progreso
    if (hasStarted && (stats.correct > 0 || stats.incorrect > 0)) {
      window.history.pushState(null, "", window.location.href);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasStarted, stats.correct, stats.incorrect]);

  if (!shuffledExercises.length) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg text-center text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        Cargando ejercicios...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Contador de Estadísticas */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 border-b border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span>Progreso del Ejercicio</span>
            </h3>
            <span className="text-sm text-gray-600 font-medium">
              Pregunta {stats.current} de {stats.total}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {stats.correct}
              </div>
              <div className="text-xs text-gray-600">Correctas</div>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
              <div className="text-lg sm:text-2xl font-bold text-red-600">
                {stats.incorrect}
              </div>
              <div className="text-xs text-gray-600">Incorrectas</div>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">
                {stats.total - stats.current + 1}
              </div>
              <div className="text-xs text-gray-600">Restantes</div>
            </div>
          </div>

          {/* Barra de Progreso */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progreso</span>
              <span>
                {Math.round(((stats.current - 1) / stats.total) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((stats.current - 1) / stats.total) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Ayuda de Controles de Teclado */}
        <div className="bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
            <span className="text-sm font-medium text-blue-800">
              Controles de Teclado
            </span>
          </div>
          <div className="text-xs text-blue-700 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono bg-white px-2 py-1 rounded border text-xs">
                1-4
              </span>
              <span>Seleccionar respuesta</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono bg-white px-2 py-1 rounded border text-xs">
                Enter
              </span>
              <span>Verificar respuesta / Siguiente ejercicio</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentExerciseIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 space-y-6 sm:space-y-8"
          >
            {/* Encabezado del Ejercicio */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {currentExercise.title}
                </h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium self-start">
                  Lapso {currentExercise.lapso}
                </span>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {currentExercise.question}
              </p>
            </div>

            {/* Opciones de Respuesta */}
            <div className="space-y-3 sm:space-y-4">
              {currentExercise.options.map((option, index) => {
                const isSelected = selectedOption === option;
                const isCorrect =
                  showAnswer && option === currentExercise.correctAnswer;
                const isIncorrect = showAnswer && isSelected && !isCorrect;

                return (
                  <motion.label
                    key={index}
                    whileHover={{ scale: showAnswer ? 1 : 0.985 }}
                    whileTap={{ scale: showAnswer ? 1 : 0.98 }}
                    className={`flex items-center p-3 sm:p-4 space-x-3 sm:space-x-4 border-2 rounded-xl transition-all touch-manipulation
                      ${
                        showAnswer
                          ? isCorrect
                            ? "border-green-500 bg-green-50"
                            : isIncorrect
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 bg-gray-50"
                          : isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 active:border-blue-400"
                      }
                      ${showAnswer ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium flex-shrink-0 ${
                        showAnswer
                          ? isCorrect
                            ? "bg-green-200 text-green-800"
                            : isIncorrect
                            ? "bg-red-200 text-red-800"
                            : "bg-gray-200 text-gray-600"
                          : isSelected
                          ? "bg-blue-200 text-blue-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionSelect(option)}
                      disabled={showAnswer}
                      className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 accent-blue-600 flex-shrink-0"
                    />
                    <span
                      className={`text-sm sm:text-base flex-1 leading-relaxed ${
                        showAnswer
                          ? isCorrect
                            ? "text-green-800"
                            : isIncorrect
                            ? "text-red-800"
                            : "text-gray-600"
                          : "text-gray-700"
                      }`}
                    >
                      {option}
                    </span>
                    {showAnswer && isCorrect && (
                      <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                    )}
                    {showAnswer && isIncorrect && (
                      <XCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0" />
                    )}
                  </motion.label>
                );
              })}
            </div>

            {/* Botones de Acción */}
            {!showAnswer ? (
              <motion.button
                onClick={handleSubmit}
                disabled={!selectedOption}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 sm:py-3.5 px-6 rounded-xl font-medium transition-all touch-manipulation min-h-[44px]
                  ${
                    selectedOption
                      ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Verificar respuesta
              </motion.button>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Feedback de Respuesta */}
                  <div
                    className={`p-4 sm:p-5 rounded-xl border-2 ${
                      selectedOption === currentExercise.correctAnswer
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {selectedOption === currentExercise.correctAnswer ? (
                        <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0" />
                      )}
                      <p className="font-semibold text-sm sm:text-base">
                        {selectedOption === currentExercise.correctAnswer
                          ? "¡Respuesta Correcta!"
                          : `Respuesta Incorrecta`}
                      </p>
                    </div>
                    {currentExercise.explanation && (
                      <p className="mt-3 sm:mt-4 text-gray-700 text-sm leading-relaxed">
                        {currentExercise.explanation}
                      </p>
                    )}
                    <p className="mt-2 sm:mt-3 text-sm font-medium text-gray-600">
                      <span className="font-semibold">Respuesta correcta:</span>{" "}
                      {currentExercise.correctAnswer}
                    </p>
                  </div>

                  {/* Botón Siguiente */}
                  <button
                    onClick={handleNext}
                    className="w-full py-3 sm:py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-200/50 transition-all touch-manipulation min-h-[44px]"
                  >
                    Siguiente ejercicio →
                  </button>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Modal de Completación */}
        {showCompletionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
            >
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  ¡Felicitaciones!
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  Has completado todos los ejercicios. Tu progreso ha sido
                  registrado.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-lg sm:text-xl font-semibold text-green-600">
                        {finalStats?.correct || 0}
                      </div>
                      <div className="text-gray-600">Correctas</div>
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-semibold text-red-600">
                        {finalStats?.incorrect || 0}
                      </div>
                      <div className="text-gray-600">Incorrectas</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-lg sm:text-xl font-semibold text-blue-600">
                      {finalStats
                        ? Math.round(
                            (finalStats.correct / finalStats.total) * 100
                          )
                        : 0}
                      % de acierto
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowCompletionModal(false);
                    setFinalStats(null);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-colors touch-manipulation min-h-[44px]"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercise;
