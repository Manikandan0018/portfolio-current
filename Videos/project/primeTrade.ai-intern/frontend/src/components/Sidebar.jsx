import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Sidebar({ onSelectFolder }) {
  const [folders, setFolders] = useState([]);
  const [title, setTitle] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get("/folders");
        if (!cancelled) setFolders(data.folders || []);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => (cancelled = true);
  }, []);

  const create = async () => {
    if (!title.trim()) return;
    try {
      const { data } = await api.post("/folders", { title });
      setTitle("");
      setFolders((p) => [data.folder, ...p]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="w-72 p-5 bg-white dark:bg-slate-850 h-screen border-r hidden md:block">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-[var(--accent)] text-white flex items-center justify-center font-bold">
          ON
        </div>
        <div>
          <div className="font-semibold">OnNotes</div>
          <div className="text-sm text-slate-500 dark:text-slate-300">
            Your workspace
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New folder"
            className="flex-1 p-2 border rounded-md bg-transparent text-sm"
          />
          <button
            onClick={create}
            className="px-3 py-2 rounded-md bg-[var(--accent)] text-white text-sm"
          >
            Add
          </button>
        </div>
      </div>

      <div className="text-sm text-slate-500 dark:text-slate-300 mb-2">
        Folders
      </div>
      <div className="space-y-2">
        {folders.map((f) => (
          <div
            key={f._id}
            onClick={() => onSelectFolder(f)}
            className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer flex items-center justify-between"
          >
            <span>{f.title}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-slate-500 dark:text-slate-300">
        <button
          onClick={() => nav("/note/new")}
          className="w-full bg-[var(--accent)] text-white py-2 rounded-md"
        >
          + New Note
        </button>
      </div>
    </aside>
  );
}

export default React.memo(Sidebar);
