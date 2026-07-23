import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

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

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    login({ id: "new-user-1", name: data.name, email: data.email });
    toast.success("Account created successfully!");
    router.navigate({ to: "/dashboard" });
  };

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

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="John Doe"
              className={`mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none ${errors.name ? "border-red-500 border" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
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
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              className={`mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none ${errors.confirmPassword ? "border-red-500 border" : ""}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-clay w-full py-3.5 font-semibold mt-4 flex justify-center items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            search={{ redirect: undefined }}
            className="text-foreground font-medium hover:underline cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
