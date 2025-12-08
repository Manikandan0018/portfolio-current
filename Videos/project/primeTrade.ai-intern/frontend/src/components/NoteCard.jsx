import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function NoteCard({ note, refresh }) {
  const nav = useNavigate();

  const toggleCompleted = async () => {
    try {
      await api.put(`/tasks/${note._id}`, { completed: !note.completed });
      refresh && refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async () => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/tasks/${note._id}`);
      refresh && refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <h3
            className={`font-semibold ${
              note.completed ? "line-through text-slate-400" : ""
            }`}
          >
            {note.title}
          </h3>
          {note.completed && <span className="text-green-600 text-sm">✔</span>}
        </div>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">
          {(note.content || "").slice(0, 150)}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-3">
          <button
            onClick={() => nav(`/note/${note._id}`)}
            className="text-blue-500 text-sm"
          >
            Edit
          </button>
          <button onClick={deleteNote} className="text-red-500 text-sm">
            Delete
          </button>
        </div>

        <button
          onClick={toggleCompleted}
          className={`px-3 py-1 rounded-md text-sm ${
            note.completed
              ? "bg-yellow-500 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {note.completed ? "Mark Pending" : "Mark Completed"}
        </button>
      </div>
    </div>
  );
}
