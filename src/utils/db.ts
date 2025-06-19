import { openDB, DBSchema, IDBPDatabase } from "idb";

interface UserProfile {
  userId: string;
  userName?: string;
}

interface ExerciseProgress {
  exerciseId: number;
  topicId: number;
  status: "completed" | "attempted";
  selectedAnswer: string;
  isCorrect: boolean;
  score?: number;
  timeSpent?: number;
  timestamp: Date;
}

interface ExerciseSession {
  sessionId: string;
  userId: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalTimeSpent: number;
  completionPercentage: number;
  startTime: Date;
  endTime: Date;
  isCompleted: boolean;
}

interface MyDB extends DBSchema {
  userProfile: {
    key: string;
    value: UserProfile;
  };
  exerciseProgress: {
    key: number;
    value: ExerciseProgress;
  };
  exerciseSessions: {
    key: string;
    value: ExerciseSession;
  };
}

async function initDB(): Promise<IDBPDatabase<MyDB>> {
  const db = await openDB<MyDB>("EstadisticaAppDB", 2, {
    upgrade(db, oldVersion) {
      if (!db.objectStoreNames.contains("userProfile")) {
        db.createObjectStore("userProfile", { keyPath: "userId" });
      }
      if (!db.objectStoreNames.contains("exerciseProgress")) {
        db.createObjectStore("exerciseProgress", { keyPath: "exerciseId" });
      }
      if (oldVersion < 2 && !db.objectStoreNames.contains("exerciseSessions")) {
        db.createObjectStore("exerciseSessions", { keyPath: "sessionId" });
      }
    },
  });
  return db;
}

async function getUserProfile(
  userId: string
): Promise<UserProfile | undefined> {
  const db = await initDB();
  return db.get("userProfile", userId);
}

async function saveUserProfile(profile: UserProfile): Promise<void> {
  const db = await initDB();
  await db.put("userProfile", profile);
}

async function getExerciseProgress(
  exerciseId: number
): Promise<ExerciseProgress | undefined> {
  const db = await initDB();
  return db.get("exerciseProgress", exerciseId);
}

async function saveExerciseProgress(progress: ExerciseProgress): Promise<void> {
  const db = await initDB();
  await db.put("exerciseProgress", progress);
}

async function getAllExerciseProgress(): Promise<ExerciseProgress[]> {
  const db = await initDB();
  return db.getAll("exerciseProgress");
}

async function saveExerciseSession(session: ExerciseSession): Promise<void> {
  const db = await initDB();
  await db.put("exerciseSessions", session);
}

async function getAllExerciseSessions(): Promise<ExerciseSession[]> {
  const db = await initDB();
  return db.getAll("exerciseSessions");
}

async function getExerciseSession(
  sessionId: string
): Promise<ExerciseSession | undefined> {
  const db = await initDB();
  return db.get("exerciseSessions", sessionId);
}

export {
  initDB,
  getUserProfile,
  saveUserProfile,
  getExerciseProgress,
  saveExerciseProgress,
  getAllExerciseProgress,
  saveExerciseSession,
  getAllExerciseSessions,
  getExerciseSession,
};
export type { UserProfile, ExerciseProgress, ExerciseSession };
