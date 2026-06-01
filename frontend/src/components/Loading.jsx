import { Loader2 } from "lucide-react";

function Loading({ label = "Loading", fullScreen = false }) {
  const content = (
    <div className="flex items-center justify-center gap-3 text-sm text-slate-300">
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
      <span>{label}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        {content}
      </div>
    );
  }

  return content;
}

export default Loading;
