
import { VercelRequest, VercelResponse } from "@vercel/node";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfgUFTXX6UgsInUi7nuPS6G4KpRl476RQ",
  authDomain: "count-connect.firebaseapp.com",
  projectId: "count-connect",
  storageBucket: "count-connect.appspot.com",
  messagingSenderId: "454765278480",
  appId: "1:454765278480:web:a635874b3ae166a7122195"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const snapshot = await getDocs(collection(db, "jobs"));
    const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(jobs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
