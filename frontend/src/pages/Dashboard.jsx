import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FileUp, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import Loading from "../components/Loading";
import InterviewCard from "../components/InterviewCard";

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const { data } = await api.get("/api/interview/");
      setReports(data.interviewReports || []);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const onSubmit = async (values) => {
    const file = values.resume?.[0];
    if (!file) {
      toast.error("Resume PDF is required");
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("Resume must be a PDF");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Resume must be under 3MB");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("selfDescription", values.selfDescription);
    formData.append("jobDescription", values.jobDescription);

    await api.post("/api/interview/", formData);

    toast.success("Report Generated");
    reset();
    await fetchReports();
  };

  const visibleReports = useMemo(() => {
    return [...reports]
      .filter((report) => (report.title || "").toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const aTime = new Date(a.createdAt || 0).getTime();
        const bTime = new Date(b.createdAt || 0).getTime();
        return sort === "newest" ? bTime - aTime : aTime - bTime;
      });
  }, [reports, search, sort]);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Reports", reports.length],
          ["Average Score", reports.length ? Math.round(reports.reduce((sum, item) => sum + (item.matchScore || 0), 0) / reports.length) : 0],
          ["Ready Plans", reports.length],
        ].map(([label, value]) => (
          <div key={label} className="glass-card p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}{label === "Average Score" ? "%" : ""}</p>
          </div>
        ))}
      </section>

      <section className="glass-card overflow-hidden">
        <div className="border-b border-white/10 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Create Interview Report</h2>
              <p className="text-sm text-slate-400">Upload a resume and match it against a role.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 p-5 sm:p-6 lg:grid-cols-2">
          <label className="lg:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-200">Resume Upload</span>
            <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-5">
              <div className="flex flex-col items-center justify-center text-center">
                <FileUp className="h-8 w-8 text-primary" />
                <p className="mt-3 text-sm text-slate-300">PDF only, max 3MB</p>
                <input
                  className="mt-4 block w-full max-w-sm text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500"
                  type="file"
                  accept="application/pdf"
                  {...register("resume", { required: "Resume PDF is required" })}
                />
              </div>
            </div>
            {errors.resume && <p className="mt-2 text-xs text-rose-300">{errors.resume.message}</p>}
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-200">Self Description</span>
            <textarea
              className="field min-h-44 resize-y"
              placeholder="Your background, strengths, experience, and target role."
              {...register("selfDescription", { required: "Self description is required" })}
            />
            {errors.selfDescription && (
              <p className="mt-2 text-xs text-rose-300">{errors.selfDescription.message}</p>
            )}
          </label>

          <label>
            <span className="mb-2 block text-sm font-medium text-slate-200">Job Description</span>
            <textarea
              className="field min-h-44 resize-y"
              placeholder="Paste the job description here."
              {...register("jobDescription", { required: "Job description is required" })}
            />
            {errors.jobDescription && (
              <p className="mt-2 text-xs text-rose-300">{errors.jobDescription.message}</p>
            )}
          </label>

          <div className="lg:col-span-2">
            <button disabled={isSubmitting} className="primary-button w-full sm:w-auto">
              {isSubmitting ? <Loading label="Generating Report" /> : "Generate Report"}
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Interview Reports</h2>
            <p className="text-sm text-slate-400">Review your generated preparation plans.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <input
                className="field min-w-64 pl-10"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reports"
              />
            </div>
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <select className="field min-w-36 pl-10" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option className="bg-panel" value="newest">Newest</option>
                <option className="bg-panel" value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {loadingReports ? (
          <div className="glass-card p-8">
            <Loading label="Fetch Reports" />
          </div>
        ) : visibleReports.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleReports.map((report) => (
              <InterviewCard key={report._id} report={report} />
            ))}
          </div>
        ) : (
          <div className="glass-card flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <Sparkles className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-lg font-semibold text-white">No reports yet</h3>
            <p className="mt-2 max-w-md text-sm text-slate-400">
              Generate your first interview report to see match scores, question sets, and a preparation timeline.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
