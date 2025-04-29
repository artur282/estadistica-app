import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { exercises } from "../data/exercises";

// Obtener lapsos únicos ordenados
const uniqueLapsos = Array.from(
  new Set(exercises.map((ex) => ex.lapso))
).sort();

const Exercise: React.FC = () => {
  const [selectedLapso, setSelectedLapso] = useState<number>(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Filtrar ejercicios según el lapso seleccionado
  const filteredExercises = exercises.filter((ex) =>
    selectedLapso ? ex.lapso === selectedLapso : true
  );

  const currentExercise = filteredExercises[currentExerciseIndex];

  const handleFilterChange = () => {
    setCurrentExerciseIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const handleLapsoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLapso(Number(e.target.value));
    handleFilterChange();
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    setCurrentExerciseIndex((prevIndex) =>
      prevIndex < filteredExercises.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (!filteredExercises.length) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg text-center text-gray-600">
        No hay ejercicios disponibles para el lapso seleccionado
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-white rounded-xl shadow-lg">
      {/* Selector de Lapso */}
      <div className="w-full">
        <select
          value={selectedLapso}
          onChange={handleLapsoChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all cursor-pointer"
        >
          <option value={0} className="text-gray-400">
            Todos los lapsos
          </option>
          {uniqueLapsos.map((lapso) => (
            <option key={lapso} value={lapso} className="text-gray-700">
              Lapso {lapso}
            </option>
          ))}
        </select>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentExerciseIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Encabezado del Ejercicio */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold text-gray-900 font-display">
                {currentExercise.title}
              </h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Lapso {currentExercise.lapso}
              </span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentExercise.question}
            </p>
          </div>

          {/* Opciones de Respuesta */}
          <div className="space-y-4">
            {currentExercise.options.map((option, index) => (
              <motion.label
                key={index}
                whileHover={{ scale: 0.985 }}
                className={`flex items-center p-4 space-x-4 border-2 rounded-xl transition-all
                  ${
                    selectedOption === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }
                  ${showAnswer ? "cursor-default" : "cursor-pointer"}
                  ${showAnswer && "opacity-90"}`}
              >
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                  disabled={showAnswer}
                  className="h-6 w-6 text-blue-600 accent-blue-600"
                />
                <span className="text-gray-700 text-base">{option}</span>
              </motion.label>
            ))}
          </div>

          {/* Botones de Acción */}
          {!showAnswer ? (
            <motion.button
              onClick={handleSubmit}
              disabled={!selectedOption}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 px-6 rounded-xl font-medium transition-all
                ${
                  selectedOption
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
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
                className="space-y-6"
              >
                {/* Feedback de Respuesta */}
                <div
                  className={`p-5 rounded-xl border-2 ${
                    selectedOption === currentExercise.correctAnswer
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {selectedOption === currentExercise.correctAnswer ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-6 w-6 text-red-600" />
                    )}
                    <p className="font-semibold">
                      {selectedOption === currentExercise.correctAnswer
                        ? "¡Respuesta Correcta!"
                        : `Respuesta Incorrecta`}
                    </p>
                  </div>
                  {currentExercise.explanation && (
                    <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                      {currentExercise.explanation}
                    </p>
                  )}
                  <p className="mt-3 text-sm font-medium text-gray-600">
                    Correcto: {currentExercise.correctAnswer}
                  </p>
                </div>

                {/* Botón Siguiente */}
                <button
                  onClick={handleNext}
                  className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-200/50 transition-all"
                >
                  Siguiente ejercicio →
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Exercise;
