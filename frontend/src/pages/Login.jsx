import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BrainCircuit, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading";

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const { data } = await api.post("/api/auth/login", values);
    login(data.user);
    toast.success("Login Successful");
    navigate("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-white/10 bg-panel/50 shadow-glow backdrop-blur-xl lg:grid-cols-[1fr_0.95fr]">
        <div className="hidden min-h-[620px] flex-col justify-between bg-gradient-to-br from-primary/25 via-panel to-ink p-10 lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
              <BrainCircuit className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold">Interview AI</p>
              <p className="text-sm text-slate-300">Your preparation command center</p>
            </div>
          </div>
          <div>
            <p className="max-w-md text-4xl font-semibold leading-tight text-white">
              Turn resumes and job descriptions into focused interview plans.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["Resume", "Questions", "Plan"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-sm font-medium text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8 lg:hidden">
            <BrainCircuit className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to continue preparing.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  className="field pl-10"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <p className="mt-2 text-xs text-rose-300">{errors.email.message}</p>}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  className="field pl-10"
                  type="password"
                  placeholder="Your password"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-rose-300">{errors.password.message}</p>
              )}
            </label>

            <button disabled={isSubmitting} className="primary-button w-full">
              {isSubmitting ? <Loading label="Signing in" /> : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            New here?{" "}
            <Link to="/register" className="font-semibold text-primary hover:text-indigo-300">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
