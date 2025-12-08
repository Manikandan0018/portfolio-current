import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const nav = useNavigate();
  const loc = useLocation();

  const items = [
    { key: "home", label: "Home", to: "/dashboard", icon: HomeIcon },
    { key: "folders", label: "Folders", to: "/dashboard", icon: FolderIcon },
    { key: "profile", label: "Profile", to: "/profile", icon: UserIcon },
  ];

  return (
    <nav className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-1 flex justify-between items-center">
      <div className="flex gap-6 px-3">
        {items.slice(0, 1).map((it) => {
          const Icon = it.icon;
          const isActive = loc.pathname === it.to;
          return (
            <button
              key={it.key}
              onClick={() => nav(it.to)}
              className={`flex flex-col items-center text-xs ${
                isActive
                  ? "text-[var(--accent)]"
                  : "text-gray-500 dark:text-gray-300"
              }`}
            >
              <Icon />
              <span className="mt-1">{it.label}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => nav("/note/new")}
        className="absolute left-1/2 -translate-x-1/2 -top-5 bg-[var(--accent)] text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl"
      >
        +
      </button>

      <div className="flex gap-6 px-3 ml-auto">
        {items.slice(1).map((it) => {
          const Icon = it.icon;
          const isActive = loc.pathname === it.to;
          return (
            <button
              key={it.key}
              onClick={() => nav(it.to)}
              className={`flex flex-col items-center text-xs ${
                isActive
                  ? "text-[var(--accent)]"
                  : "text-gray-500 dark:text-gray-300"
              }`}
            >
              <Icon />
              <span className="mt-1">{it.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* icons */
function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
