import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — DayPass" },
      { name: "description", content: "Create a new DayPass account to book gym day passes." },
      { property: "og:title", content: "Register — DayPass" },
      { property: "og:description", content: "Create a new DayPass account." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="clay-blob w-[420px] h-[420px] -top-40 -left-20 opacity-60" />
      <div className="clay-blob w-[360px] h-[360px] -bottom-40 -right-20 opacity-50" />

      <div className="relative w-full max-w-md clay-lg p-10 animate-reveal my-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-foreground grid place-items-center">
              <div className="w-3 h-3 rounded-md bg-background" />
            </div>
            <span className="font-display font-bold text-lg">DayPass</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold">Create account.</h1>
          <p className="mt-2 text-muted-foreground text-sm">Sign up to book your next day pass.</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none"
            />
          </div>
          <button type="button" className="btn-clay w-full py-3.5 font-semibold mt-4">
            Sign up
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground font-medium hover:underline cursor-pointer">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
