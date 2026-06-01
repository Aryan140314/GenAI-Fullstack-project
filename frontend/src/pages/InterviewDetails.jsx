import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import Loading from "../components/Loading";

function scoreClass(score = 0) {
  if (score >= 90) return "text-emerald-300 stroke-emerald-400";
  if (score >= 70) return "text-amber-300 stroke-amber-400";
  return "text-rose-300 stroke-rose-400";
}

function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item.question}-${index}`} className="rounded-lg border border-white/10 bg-white/[0.03]">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left"
          >
            <span className="text-sm font-semibold text-white">{item.question}</span>
            <span className="text-primary">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <div className="space-y-3 border-t border-white/10 px-4 py-4 text-sm leading-6 text-slate-300">
              <p>
                <span className="font-semibold text-slate-100">Intention:</span> {item.intention}
              </p>
              <p>
                <span className="font-semibold text-slate-100">Answer:</span> {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function InterviewDetails() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/interview/report/${id}`);
        setReport(data.interviewReport);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const circumference = 2 * Math.PI * 48;
  const dashOffset = useMemo(() => {
    const score = report?.matchScore || 0;
    return circumference - (score / 100) * circumference;
  }, [circumference, report?.matchScore]);

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const response = await api.post(`/api/interview/resume/pdf/${id}`, null, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `resume_${id}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
      toast.success("PDF Download Started");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-8">
        <Loading label="Loading interview details" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="glass-card p-8">
        <p className="text-slate-300">Interview report not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="ghost-button w-fit">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <button onClick={downloadPdf} disabled={downloading} className="primary-button w-full sm:w-auto">
          {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Generate Optimized Resume
        </button>
      </div>

      <section className="glass-card grid gap-6 p-5 sm:p-6 lg:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] p-6">
          <div className="relative h-36 w-36">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className={scoreClass(report.matchScore)}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-3xl font-bold ${scoreClass(report.matchScore).split(" ")[0]}`}>
                {report.matchScore || 0}%
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400">Match Score</p>
        </div>

        <div className="min-w-0">
          <p className="text-sm uppercase tracking-[0.22em] text-primary">Interview Report</p>
          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            {report.title || "Untitled interview"}
          </h1>
          <p className="mt-4 line-clamp-5 text-sm leading-6 text-slate-300">{report.jobDescription}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="glass-card p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Technical Questions</h2>
          <Accordion items={report.technicalQuestions || []} />
        </div>

        <div className="glass-card p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Behavioral Questions</h2>
          <Accordion items={report.behavioralQuestions || []} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="glass-card p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Skill Gaps</h2>
          <div className="flex flex-wrap gap-2">
            {(report.skillGaps || []).map((gap) => (
              <span
                key={gap.skill}
                className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-slate-200"
              >
                {gap.skill} <span className="text-slate-500">/</span> {gap.severity}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-white">Preparation Plan</h2>
          <div className="space-y-5">
            {(report.preparationPlan || []).map((plan) => (
              <div key={plan.day} className="relative border-l border-primary/30 pl-5">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary shadow-lg shadow-primary/40" />
                <p className="text-sm font-semibold text-white">Day {plan.day}: {plan.focus}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {(plan.tasks || []).map((task) => (
                    <li key={task}>• {task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default InterviewDetails;
