import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import type { Session } from './types';

const SESSIONS_COLLECTION = 'sessions';

// Add a new session to Firestore for a specific user
export const addSession = async (userId: string, sessionData: Omit<Session, 'id' | 'userId'>) => {
  try {
    await addDoc(collection(db, SESSIONS_COLLECTION), {
      ...sessionData,
      userId,
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error("Could not save session.");
  }
};

// Get all sessions for a specific user
export const getSessions = async (userId: string): Promise<Session[]> => {
  try {
    const q = query(collection(db, SESSIONS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const sessions: Session[] = [];
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() } as Session);
    });
    // Sort sessions by date, most recent first
    return sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Could not retrieve sessions.");
  }
};
