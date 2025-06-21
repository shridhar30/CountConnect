
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <input className="border p-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={login}>Login</button>
      <button className="bg-gray-500 text-white px-4 py-2" onClick={logout}>Logout</button>
    </div>
  );
}
