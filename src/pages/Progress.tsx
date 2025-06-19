import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrophyIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  getUserProfile,
  saveUserProfile,
  getAllExerciseProgress,
  getAllExerciseSessions,
  UserProfile,
  ExerciseProgress,
  ExerciseSession,
} from "../utils/db";

const Progress: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [storedUserName, setStoredUserName] = useState<string | undefined>(
    undefined
  );
  const [progress, setProgress] = useState<ExerciseProgress[]>([]);
  const [sessions, setSessions] = useState<ExerciseSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"sessions" | "details">(
    "sessions"
  );

  // Mock userId for now
  const userId = "defaultUser";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profile = await getUserProfile(userId);
        if (profile && profile.userName) {
          setStoredUserName(profile.userName);
          setUserName(profile.userName);
        }
        const allProgress = await getAllExerciseProgress();
        const allSessions = await getAllExerciseSessions();
        setProgress(allProgress);
        setSessions(
          allSessions.sort(
            (a, b) =>
              new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUserName = async () => {
    const profile: UserProfile = { userId, userName };
    try {
      await saveUserProfile(profile);
      setStoredUserName(userName);
      alert("Nombre de usuario guardado!");
    } catch (error) {
      console.error("Error saving user name:", error);
      alert("Error al guardar el nombre de usuario.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando progreso...</p>
      </div>
    );
  }

  const totalSessions = sessions.length;
  const completedSessions = sessions.filter((s) => s.isCompleted).length;
  const averageScore =
    sessions.length > 0
      ? Math.round(
          sessions.reduce(
            (acc, s) => acc + (s.correctAnswers / s.totalQuestions) * 100,
            0
          ) / sessions.length
        )
      : 0;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Mi Progreso</h1>
            <p className="text-blue-100 text-sm sm:text-base">
              Seguimiento de tu rendimiento en ejercicios
            </p>
          </div>
          <TrophyIcon className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-300 self-start sm:self-center" />
        </div>
      </div>

      {/* Perfil de Usuario */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Perfil de Usuario
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            placeholder="Ingresa tu nombre de usuario"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base min-h-[44px]"
          />
          <button
            onClick={handleSaveUserName}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors touch-manipulation min-h-[44px] whitespace-nowrap"
          >
            Guardar
          </button>
        </div>
        {storedUserName && (
          <p className="mt-3 text-sm text-gray-600">
            <span className="font-medium">Usuario actual:</span>{" "}
            {storedUserName}
          </p>
        )}
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sesiones Completadas</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {completedSessions}
              </p>
            </div>
            <CheckCircleIcon className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 flex-shrink-0" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Sesiones</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {totalSessions}
              </p>
            </div>
            <ChartBarIcon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500 flex-shrink-0" />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Promedio de Acierto</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                {averageScore}%
              </p>
            </div>
            <TrophyIcon className="h-10 w-10 sm:h-12 sm:w-12 text-purple-500 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex px-4 sm:px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("sessions")}
              className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === "sessions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Sesiones Completadas
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`py-4 px-2 sm:px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ml-6 sm:ml-8 ${
                activeTab === "details"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Detalles de Ejercicios
            </button>
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "sessions" ? (
            <div className="space-y-4">
              {sessions.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <ChartBarIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm sm:text-base">
                    No hay sesiones registradas aún.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Completa algunos ejercicios para ver tu progreso aquí.
                  </p>
                </div>
              ) : (
                sessions.map((session) => (
                  <motion.div
                    key={session.sessionId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full flex-shrink-0 ${
                            session.isCompleted
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                          Sesión del{" "}
                          {new Date(session.endTime).toLocaleDateString()}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                        <span>
                          {new Date(session.endTime).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-green-600">
                          {session.correctAnswers}
                        </p>
                        <p className="text-xs text-gray-600">Correctas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-red-600">
                          {session.incorrectAnswers}
                        </p>
                        <p className="text-xs text-gray-600">Incorrectas</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">
                          {Math.round(
                            (session.correctAnswers / session.totalQuestions) *
                              100
                          )}
                          %
                        </p>
                        <p className="text-xs text-gray-600">Acierto</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg sm:text-2xl font-bold text-purple-600">
                          {Math.floor(session.totalTimeSpent / 60)}:
                          {(session.totalTimeSpent % 60)
                            .toString()
                            .padStart(2, "0")}
                        </p>
                        <p className="text-xs text-gray-600">Tiempo</p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            (session.correctAnswers / session.totalQuestions) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
              {progress.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <XCircleIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm sm:text-base">
                    No hay ejercicios registrados.
                  </p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ejercicio
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resultado
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tiempo
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {progress.map((item) => (
                      <tr key={item.exerciseId} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">
                            Ejercicio #{item.exerciseId}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            Lapso {item.topicId}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              item.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.status === "completed"
                              ? "Completado"
                              : "Intentado"}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.isCorrect ? (
                              <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-1 sm:mr-2 flex-shrink-0" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-1 sm:mr-2 flex-shrink-0" />
                            )}
                            <span
                              className={`text-xs sm:text-sm font-medium ${
                                item.isCorrect
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {item.isCorrect ? "Correcto" : "Incorrecto"}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          <div className="flex items-center">
                            <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                            <span>
                              {item.timeSpent ? `${item.timeSpent}s` : "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;
