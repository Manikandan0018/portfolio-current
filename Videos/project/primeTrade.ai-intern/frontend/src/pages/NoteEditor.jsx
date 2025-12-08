import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api";

export default function NoteEditor() {
  const { id } = useParams();
  const isNew = id === "new";

  const [form, setForm] = useState({
    title: "",
    content: "",
    folder: "",
    dueDate: "",
  });

  const [folders, setFolders] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api
      .get("/folders")
      .then((r) => setFolders(r.data.folders || []))
      .catch(() => {});

    if (!isNew) {
      api
        .get(`/tasks/${id}`)
        .then((r) => {
          const t = r.data.task;
          setForm({
            title: t.title || "",
            content: t.content || "",
            folder: t.folder || "",
            dueDate: t.dueDate
              ? new Date(t.dueDate).toISOString().slice(0, 10)
              : "",
          });
        })
        .catch(() => {});
    }
  }, [id, isNew]);

  const save = async (e) => {
    e.preventDefault();
    try {
      const foldersRes = await api.get("/folders");
      const allFolders = foldersRes.data.folders || [];

      // Ensure folder exists
      let folderId = form.folder;
      if (!allFolders.length) {
        const newFolder = await api.post("/folders", { title: "My Notes" });
        folderId = newFolder.data.folder._id;
      } else if (!folderId) {
        folderId = allFolders[0]._id;
      }

      const payload = {
        title: form.title,
        content: form.content,
        folder: folderId,
        dueDate: form.dueDate || null,
      };

      if (isNew) await api.post("/tasks", payload);
      else await api.put(`/tasks/${id}`, payload);

      nav("/dashboard");
    } catch (err) {
      console.error("SAVE ERR:", err);
      alert("Could not save note");
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-black">
      <Sidebar onSelectFolder={() => {}} />

      <div className="flex-1 p-5 sm:p-8 lg:p-10">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border">
          <h2 className="text-2xl font-semibold mb-6">
            {isNew ? "New Note" : "Edit Note"}
          </h2>

          <form onSubmit={save} className="space-y-6">
            {/* Title */}
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 border rounded-md bg-white text-black"
            />

            {/* Content */}
            <textarea
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={8}
              className="w-full p-3 border rounded-md bg-white text-black"
            />

            {/* Folder + Date */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={form.folder}
                onChange={(e) => setForm({ ...form, folder: e.target.value })}
                className="flex-1 p-3 border rounded-md bg-white text-black"
              >
                <option value="">Select folder</option>
                {folders.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.title}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="p-3 border rounded-md bg-white text-black"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="bg-[var(--accent)] text-white px-5 py-2 rounded-md">
                Save
              </button>

              <button
                type="button"
                onClick={() => nav("/dashboard")}
                className="px-5 py-2 border border-gray-400 rounded-md text-black"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
