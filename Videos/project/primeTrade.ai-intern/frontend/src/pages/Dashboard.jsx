import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import api from "../api";
import NoteCard from "../components/NoteCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selFolder, setSelFolder] = useState(null);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({ pending: 0, completed: 0 });
  const [byDate, setByDate] = useState([]);

  const [dateSelected, setDateSelected] = useState(new Date());
  const [tasksByDate, setTasksByDate] = useState([]);

  const nav = useNavigate();

  /** LOAD TASKS */
  const load = async (folderId) => {
    setLoading(true);
    try {
      const q = folderId ? `?folder=${folderId}` : "";
      const res = await api.get(`/tasks${q}`);
      setNotes(res.data.tasks || []);
    } catch (err) {
      console.error("LOAD ERR:", err);
    } finally {
      setLoading(false);
    }
  };

  /** LOAD STATS */
  const loadStats = async () => {
    try {
      const res = await api.get("/tasks/stats/summary");
      const agg = { pending: 0, completed: 0 };
      (res.data.agg || []).forEach((x) => {
        agg[x._id] = x.count;
      });
      setStats(agg);
      setByDate(res.data.byDate || []);
    } catch (err) {
      console.error("STATS ERR:", err);
    }
  };

  /** LOAD TASKS BY DATE */
  const loadDateTasks = async (dateObj = dateSelected) => {
    try {
      const dateStr = dateObj.toISOString().slice(0, 10);
      const res = await api.get(`/tasks?date=${dateStr}`);
      setTasksByDate(res.data.tasks || []);
    } catch (err) {
      console.error("DATE ERR:", err);
    }
  };

  /** INITIAL LOAD */
  useEffect(() => {
    load();
    loadStats();
    loadDateTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** DATE CHANGE */
  useEffect(() => {
    loadDateTasks(dateSelected);
  }, [dateSelected]);

  /** REFRESH AFTER UPDATE (pass to NoteCard) */
  const refreshAll = () => {
    load(selFolder?._id);
    loadStats();
    loadDateTasks();
  };

  /** FOLDER SELECT */
  const onSelectFolder = useCallback((f) => {
    setSelFolder(f);
    load(f._id);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="flex">
        {/* Sidebar visible on md+ */}
        <div className="hidden md:block">
          <Sidebar onSelectFolder={onSelectFolder} showHeaderMobile={true} />
        </div>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          {/* Mobile header */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <button
              onClick={() => nav("/note/new")}
              className="bg-[var(--accent)] text-white px-3 py-1 rounded-md text-sm"
            >
              + New
            </button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-300">
                Pending
              </div>
              <div className="text-2xl font-semibold">{stats.pending}</div>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-300">
                Completed
              </div>
              <div className="text-2xl font-semibold">{stats.completed}</div>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-300">
                Total
              </div>
              <div className="text-2xl font-semibold">
                {stats.pending + stats.completed}
              </div>
            </div>
          </div>

          {/* Chart + Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-3">Activity (by date)</h4>
              <div style={{ height: 260 }}>
                <Bar
                  data={{
                    labels: byDate.map((b) => b._id),
                    datasets: [
                      {
                        label: "Total",
                        data: byDate.map((b) => b.total),
                        backgroundColor: "rgba(249,115,22,0.8)",
                      },
                      {
                        label: "Completed",
                        data: byDate.map((b) => b.completed),
                        backgroundColor: "rgba(59,130,246,0.8)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: "top" } },
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-3">Calendar</h4>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                  value={dateSelected}
                  onChange={(value) => setDateSelected(value)}
                  sx={{
                    width: "100%",
                    bgcolor: "transparent",
                    borderRadius: "12px",
                    "& .MuiPickersCalendarHeader-label": {
                      color: "var(--text-color, #111) !important",
                      fontWeight: 600,
                    },
                    "& .MuiPickersArrowSwitcher-button": {
                      color: "var(--text-color, #111) !important",
                    },
                    "& .MuiPickersDay-root": {
                      color: "var(--text-color, #111) !important",
                      fontWeight: 500,
                    },
                    "& .Mui-selected.MuiPickersDay-root": {
                      backgroundColor: "var(--accent) !important",
                      color: "#fff !important",
                    },

                    /* Year view override */
                    "& .MuiYearCalendar-root": {
                      background: "transparent !important",
                    },
                    "& .MuiYearCalendar-root .MuiPickersYear-yearButton": {
                      color: "var(--text-color, #111) !important",
                      fontWeight: 600,
                    },
                    "& .MuiYearCalendar-root .MuiPickersYear-yearButton.Mui-selected":
                      {
                        backgroundColor: "var(--accent) !important",
                        color: "#fff !important",
                      },
                  }}
                />
              </LocalizationProvider>

              <div className="mt-3">
                <h5 className="font-medium">
                  Tasks on {dateSelected.toDateString()}
                </h5>
                {tasksByDate.length === 0 ? (
                  <div className="text-sm text-slate-500 dark:text-slate-300 mt-2">
                    No tasks
                  </div>
                ) : (
                  <div className="space-y-2 mt-2">
                    {tasksByDate.map((t) => (
                      <div
                        key={t._1d}
                        className="p-2 border rounded-md dark:border-slate-700"
                      >
                        <div className="flex justify-between">
                          <div className="font-semibold">{t.title}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-300">
                            {t.completed ? "Completed" : "Pending"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes list */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">
                {selFolder ? selFolder.title : "All Notes"}
              </h3>
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => nav("/note/new")}
                  className="bg-[var(--accent)] text-white text-sm px-3 py-1 rounded-md"
                >
                  + New Note
                </button>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : notes.length === 0 ? (
              <EmptyState message="No tasks yet" />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((n) => (
                  <NoteCard key={n._id} note={n} refresh={refreshAll} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Center floating FAB for mobile is inside BottomNav, but keep an extra FAB for convenience */}

      {/* Mobile bottom nav */}
      <div className="fixed bottom-3 left-0 right-0 px-4 md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
