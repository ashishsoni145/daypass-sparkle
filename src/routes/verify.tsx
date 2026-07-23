import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export const Route = createFileRoute("/verify")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token_hash: search.token_hash as string | undefined,
      type: search.type as "signup" | "recovery" | "magiclink" | "invite" | undefined,
    };
  },
  component: VerifyPage,
});

function VerifyPage() {
  const router = useRouter();
  const search = Route.useSearch();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function verify() {
      // 1. Try to verify using token_hash and type from query params (PKCE flow)
      const { token_hash, type } = search;

      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type });

        if (!mounted) return;

        if (error) {
          setStatus("error");
          setErrorMessage(error.message);
        } else {
          setStatus("success");
          toast.success("Email verified successfully!");
        }
        return;
      }

      // 2. Fallback: check if the URL has a hash fragment indicating implicit grant flow
      if (typeof window !== "undefined" && window.location.hash.includes("access_token")) {
        // The supabase client automatically handles the session update from URL fragments
        // Give it a moment, then check session
        setTimeout(async () => {
          if (!mounted) return;
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            setStatus("success");
            toast.success("Email verified successfully!");
          } else {
            setStatus("error");
            setErrorMessage("The verification link is invalid or has expired.");
          }
        }, 1000);
        return;
      }

      // 3. Fallback: just check if the user is somehow already logged in
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;

      if (session) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          "Invalid or missing verification link. Make sure you clicked the exact link from your email.",
        );
      }
    }

    verify();

    return () => {
      mounted = false;
    };
  }, [search]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="clay-blob w-[420px] h-[420px] -top-40 -left-20 opacity-60" />
      <div className="clay-blob w-[360px] h-[360px] -bottom-40 -right-20 opacity-50" />

      <div className="relative w-full max-w-md clay-lg p-10 text-center animate-reveal my-8">
        {status === "verifying" && (
          <div>
            <div className="mb-6 flex justify-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Verifying...</h1>
            <p className="text-muted-foreground mb-8">Please wait while we verify your email.</p>
          </div>
        )}

        {status === "success" && (
          <div>
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Verification Successful</h1>
            <p className="text-muted-foreground mb-8">
              Your email has been successfully verified. You can now access your account.
            </p>
            <Link
              to="/dashboard"
              className="btn-clay w-full py-3.5 font-semibold flex justify-center items-center gap-2"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {status === "error" && (
          <div>
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Verification Failed</h1>
            <p className="text-muted-foreground mb-8">
              {errorMessage ||
                "There was a problem verifying your email. The link may have expired."}
            </p>
            <Link
              to="/login"
              search={{ redirect: undefined }}
              className="btn-clay w-full py-3.5 font-semibold flex justify-center items-center gap-2"
            >
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
