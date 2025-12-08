import React, { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="w-14 h-7 rounded-full p-1 bg-black/10 dark:bg-white/10 flex items-center"
    >
      <span
        className={`w-5 h-5 rounded-full bg-white dark:bg-gray-900 shadow transform transition ${
          dark ? "translate-x-7" : "translate-x-0"
        } flex items-center justify-center text-xs`}
      >
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
