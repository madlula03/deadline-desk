import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Flame,
} from "lucide-react";

/**
 * Deadline Desk — Dashboard
 * Black-and-gold "ledger" aesthetic: deadlines read like entries in a
 * desk ledger, with a wax-seal-style completion stamp as the signature
 * element. Self-contained with mock state — swap `initialDeadlines`
 * for your API/Postgres data once the backend is wired up.
 */

const initialDeadlines = [
  { id: 1, title: "Exercise3Frame.java — GUI components", course: "AOP216D", due: addDays(-1), status: "overdue", priority: "high" },
  { id: 2, title: "CDR file I/O assignment", course: "AOP216D", due: addDays(0), status: "pending", priority: "high" },
  { id: 3, title: "Nmap scan types write-up", course: "Info Security", due: addDays(2), status: "pending", priority: "medium" },
  { id: 4, title: "Kaleidoscope ERD exercise", course: "DTP216D", due: addDays(4), status: "pending", priority: "medium" },
  { id: 5, title: "Linux shell scripting lab", course: "Operating Systems", due: addDays(6), status: "pending", priority: "low" },
  { id: 6, title: "Waterfall vs Agile case study", course: "SEF216D", due: addDays(-3), status: "completed", priority: "medium" },
  { id: 7, title: "Deadline Desk — signup flow demo", course: "Portfolio", due: addDays(9), status: "pending", priority: "low" },
];

function addDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(23, 59, 0, 0);
  return d;
}

function daysUntil(date) {
  const ms = date.setHours(23, 59, 0, 0) - new Date().setHours(0, 0, 0, 0);
  return Math.round(ms / 86400000);
}

function countdownLabel(date, status) {
  if (status === "completed") return "Filed";
  const d = daysUntil(new Date(date));
  if (d < 0) return `${Math.abs(d)}d overdue`;
  if (d === 0) return "Due today";
  if (d === 1) return "Due tomorrow";
  return `${d}d remaining`;
}

const TABS = ["All", "Overdue", "This week", "Completed"];

export default function Dashboard() {
  const [deadlines] = useState(initialDeadlines);
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const total = deadlines.length;
    const overdue = deadlines.filter((d) => d.status === "overdue").length;
    const dueSoon = deadlines.filter(
      (d) => d.status === "pending" && daysUntil(new Date(d.due)) <= 7 && daysUntil(new Date(d.due)) >= 0
    ).length;
    const completed = deadlines.filter((d) => d.status === "completed").length;
    return { total, overdue, dueSoon, completed };
  }, [deadlines]);

  const completionRate = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

  const focusItem = useMemo(() => {
    return [...deadlines]
      .filter((d) => d.status !== "completed")
      .sort((a, b) => new Date(a.due) - new Date(b.due))[0];
  }, [deadlines]);

  const filtered = useMemo(() => {
    let list = deadlines;
    if (tab === "Overdue") list = list.filter((d) => d.status === "overdue");
    if (tab === "This week")
      list = list.filter((d) => d.status === "pending" && daysUntil(new Date(d.due)) <= 7 && daysUntil(new Date(d.due)) >= 0);
    if (tab === "Completed") list = list.filter((d) => d.status === "completed");
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) => d.title.toLowerCase().includes(q) || d.course.toLowerCase().includes(q)
      );
    }
    return [...list].sort((a, b) => new Date(a.due) - new Date(b.due));
  }, [deadlines, tab, query]);

  return (
    <div className="min-h-screen w-full bg-[#0a0908] text-stone-200" style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-[#2a2417] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8c7328]">
              Ledger — {new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-[#D4AF37]">Deadline Desk</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search entries…"
                className="font-body w-52 rounded-sm border border-[#2a2417] bg-[#141210] py-2 pl-9 pr-3 text-sm text-stone-200 placeholder-stone-500 outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
            <button className="font-body flex items-center gap-1.5 rounded-sm bg-[#D4AF37] px-4 py-2 text-sm font-medium text-[#0a0908] transition hover:bg-[#e5c34c] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#0a0908]">
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              New entry
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Total entries" value={stats.total} icon={BookOpen} tone="neutral" />
          <StatCard label="Overdue" value={stats.overdue} icon={AlertTriangle} tone="danger" />
          <StatCard label="Due this week" value={stats.dueSoon} icon={Clock} tone="warn" />
          <StatCard label="Filed" value={stats.completed} icon={CheckCircle2} tone="good" />
        </div>

        {/* Main grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Ledger list */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-1 border-b border-[#2a2417]">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`font-body relative px-3 py-2.5 text-sm transition ${
                    tab === t ? "text-[#D4AF37]" : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  {t}
                  {tab === t && (
                    <span className="absolute inset-x-0 -bottom-px h-[2px] bg-[#D4AF37]" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 divide-y divide-[#211d14]">
              {filtered.length === 0 && (
                <p className="font-body py-10 text-center text-sm text-stone-500">
                  Nothing here — the desk is clear.
                </p>
              )}
              {filtered.map((d) => (
                <LedgerRow key={d.id} deadline={d} />
              ))}
            </div>
          </div>

          {/* Sidebar: seal + focus */}
          <div className="space-y-6">
            <div className="rounded-sm border border-[#2a2417] bg-[#141210] p-6">
              <p className="font-mono text-center text-[10px] uppercase tracking-[0.25em] text-stone-500">
                Filed this month
              </p>
              <Seal percent={completionRate} />
            </div>

            {focusItem && (
              <div className="rounded-sm border border-[#D4AF37]/40 bg-[#161208] p-5">
                <p className="font-mono flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                  <Flame className="h-3 w-3" />
                  Next up
                </p>
                <p className="font-body mt-2 text-sm font-medium text-stone-100">{focusItem.title}</p>
                <p className="font-body mt-1 text-xs text-stone-500">{focusItem.course}</p>
                <p className="font-mono mt-3 text-xs text-[#D4AF37]">
                  {countdownLabel(focusItem.due, focusItem.status)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, tone }) {
  const toneMap = {
    neutral: "text-stone-300",
    danger: "text-[#c15a4a]",
    warn: "text-[#D4AF37]",
    good: "text-[#8fae7a]",
  };
  return (
    <div className="rounded-sm border border-[#2a2417] bg-[#141210] p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">{label}</p>
        <Icon className={`h-3.5 w-3.5 ${toneMap[tone]}`} strokeWidth={2} />
      </div>
      <p className={`font-body mt-2 text-2xl font-semibold ${toneMap[tone]}`}>{value}</p>
    </div>
  );
}

function LedgerRow({ deadline }) {
  const isOverdue = deadline.status === "overdue";
  const isCompleted = deadline.status === "completed";
  const priorityDot = {
    high: "bg-[#c15a4a]",
    medium: "bg-[#D4AF37]",
    low: "bg-stone-600",
  }[deadline.priority];

  return (
    <div className="font-body flex items-center gap-4 py-3.5">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${priorityDot}`} />
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm ${isCompleted ? "text-stone-500 line-through" : "text-stone-200"}`}>
          {deadline.title}
        </p>
        <p className="mt-0.5 text-xs text-stone-500">{deadline.course}</p>
      </div>
      <span
        className={`font-mono shrink-0 text-xs ${
          isCompleted
            ? "text-stone-600"
            : isOverdue
            ? "text-[#c15a4a]"
            : "text-stone-400"
        }`}
      >
        {countdownLabel(deadline.due, deadline.status)}
      </span>
    </div>
  );
}

function Seal({ percent }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="relative mx-auto mt-4 h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#2a2417" strokeWidth="3" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * 2 * Math.PI;
          const x1 = 50 + 46 * Math.cos(angle);
          const y1 = 50 + 46 * Math.sin(angle);
          const x2 = 50 + 49 * Math.cos(angle);
          const y2 = 50 + 49 * Math.sin(angle);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3a331f" strokeWidth="1" />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-medium text-[#D4AF37]">{percent}%</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-500">certified</span>
      </div>
    </div>
  );
}
