import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: search.redirect as string | undefined,
    };
  },
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

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const router = useRouter();
  const search = Route.useSearch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);

    // Dynamically import supabase
    const { supabase } = await import("@/lib/supabase");

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Successfully logged in!");

    if (search.redirect && search.redirect.startsWith("/") && !search.redirect.startsWith("//")) {
      // Validate redirect to prevent Open Redirect / XSS
      window.location.href = search.redirect;
    } else {
      router.navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="clay-blob w-[420px] h-[420px] -top-40 -left-20 opacity-60" />
      <div className="clay-blob w-[360px] h-[360px] -bottom-40 -right-20 opacity-50" />

      <div className="relative w-full max-w-md clay-lg p-10 animate-reveal">
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
          <h1 className="mt-6 text-3xl font-bold">Welcome back.</h1>
          <p className="mt-2 text-muted-foreground text-sm">Sign in to book your next day pass.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none ${errors.email ? "border-red-500 border" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none ${errors.password ? "border-red-500 border" : ""}`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-clay w-full py-3.5 font-semibold mt-4 flex justify-center items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-muted-foreground">
          New here?{" "}
          <Link
            to="/register"
            className="text-foreground font-medium hover:underline cursor-pointer"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
