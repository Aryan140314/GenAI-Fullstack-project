import { ArrowRight, CalendarDays, Gauge } from "lucide-react";
import { Link } from "react-router-dom";

function scoreColor(score = 0) {
  if (score >= 90) return "text-emerald-300 bg-emerald-400/10 ring-emerald-400/20";
  if (score >= 70) return "text-amber-300 bg-amber-400/10 ring-amber-400/20";
  return "text-rose-300 bg-rose-400/10 ring-rose-400/20";
}

function InterviewCard({ report }) {
  const date = report.createdAt
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(report.createdAt))
    : "Recent";

  return (
    <article className="glass-card group p-5 transition hover:-translate-y-1 hover:border-primary/40">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-white">
            {report.title || "Untitled interview"}
          </h3>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <CalendarDays className="h-4 w-4" />
            {date}
          </div>
        </div>
        <div
          className={`flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-sm font-semibold ring-1 ${scoreColor(
            report.matchScore,
          )}`}
        >
          <Gauge className="h-4 w-4" />
          {report.matchScore ?? 0}%
        </div>
      </div>

      <Link
        to={`/interview/${report._id}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:text-indigo-300"
      >
        View Details
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

export default InterviewCard;
