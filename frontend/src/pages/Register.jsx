import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BrainCircuit, Lock, Mail, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading";

function Register() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const { data } = await api.post("/api/auth/register", values);
    login(data.user);
    toast.success("Registration Successful");
    navigate("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-10">
      <section className="w-full max-w-xl rounded-lg border border-white/10 bg-panel/70 p-6 shadow-glow backdrop-blur-xl sm:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
            <BrainCircuit className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Interview AI</p>
            <p className="text-sm text-slate-400">Create your workspace</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Username</span>
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
              <input
                className="field pl-10"
                placeholder="aryan"
                {...register("username", { required: "Username is required" })}
              />
            </div>
            {errors.username && (
              <p className="mt-2 text-xs text-rose-300">{errors.username.message}</p>
            )}
          </label>

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
                placeholder="At least 6 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Use at least 6 characters" },
                })}
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-xs text-rose-300">{errors.password.message}</p>
            )}
          </label>

          <button disabled={isSubmitting} className="primary-button w-full">
            {isSubmitting ? <Loading label="Creating account" /> : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:text-indigo-300">
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
