import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — DayPass" },
      { name: "description", content: "Sign in to your DayPass account to book gym day passes." },
      { property: "og:title", content: "Login — DayPass" },
      { property: "og:description", content: "Sign in to your DayPass account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-primary/40 -top-40 -left-20" />
      <div className="glow-orb w-[500px] h-[500px] bg-accent/40 -bottom-40 -right-20" />

      <div className="relative w-full max-w-md glass-strong rounded-3xl p-10 animate-reveal">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="mb-8">
          <div className="text-2xl font-display font-bold text-gradient">DayPass</div>
          <h1 className="mt-4 text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-muted-foreground text-sm">Sign in to book your next day pass.</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <input type="email" placeholder="you@example.com" className="mt-1 w-full glass rounded-xl px-4 py-3 bg-transparent outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <input type="password" placeholder="••••••••" className="mt-1 w-full glass rounded-xl px-4 py-3 bg-transparent outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <button type="button" className="btn-primary-glow w-full rounded-xl py-3 font-semibold mt-2">
            Sign in
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-muted-foreground">
          New here? <span className="text-primary hover:underline cursor-pointer">Create account</span>
        </p>
      </div>
    </div>
  );
}
