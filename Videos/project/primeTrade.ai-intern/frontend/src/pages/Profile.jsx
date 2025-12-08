import React, { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    api
      .get("/auth/me")
      .then((r) => setUser(r.data.user))
      .catch(() => {});
  }, []);
  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: user.name, email: user.email };
      if (pw) payload.password = pw;
      const { data } = await api.put("/auth/me", payload);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMsg("Saved");
      setPw("");
    } catch {
      setMsg("Failed");
    }
  };
  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="card p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        {msg && <div className="text-green-600 mb-3">{msg}</div>}
        <form onSubmit={save} className="space-y-3">
          <input
            className="w-full p-3 border rounded-md"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded-md"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="w-full p-3 border rounded-md"
            placeholder="New password (optional)"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <button className="w-full bg-[var(--accent)] text-white py-3 rounded-md">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
