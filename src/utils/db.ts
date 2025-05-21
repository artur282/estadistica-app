import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface UserProfile {
  userId: string;
  userName?: string;
}

interface ExerciseProgress {
  exerciseId: number;
  topicId: number;
  status: 'completed' | 'attempted';
  selectedAnswer: string;
  isCorrect: boolean;
  score?: number;
  timeSpent?: number;
  timestamp: Date;
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
}

async function initDB(): Promise<IDBPDatabase<MyDB>> {
  const db = await openDB<MyDB>('EstadisticaAppDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('userProfile')) {
        db.createObjectStore('userProfile', { keyPath: 'userId' });
      }
      if (!db.objectStoreNames.contains('exerciseProgress')) {
        db.createObjectStore('exerciseProgress', { keyPath: 'exerciseId' });
      }
    },
  });
  return db;
}

async function getUserProfile(userId: string): Promise<UserProfile | undefined> {
  const db = await initDB();
  return db.get('userProfile', userId);
}

async function saveUserProfile(profile: UserProfile): Promise<void> {
  const db = await initDB();
  await db.put('userProfile', profile);
}

async function getExerciseProgress(exerciseId: number): Promise<ExerciseProgress | undefined> {
  const db = await initDB();
  return db.get('exerciseProgress', exerciseId);
}

async function saveExerciseProgress(progress: ExerciseProgress): Promise<void> {
  const db = await initDB();
  await db.put('exerciseProgress', progress);
}

async function getAllExerciseProgress(): Promise<ExerciseProgress[]> {
  const db = await initDB();
  return db.getAll('exerciseProgress');
}

export { initDB, getUserProfile, saveUserProfile, getExerciseProgress, saveExerciseProgress, getAllExerciseProgress };
export type { UserProfile, ExerciseProgress };
