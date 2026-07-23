import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchGymById } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, Loader2, CreditCard, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      gymId: search.gymId as string,
      date: search.date as string,
    };
  },
  beforeLoad: ({ context }) => {
    // In a real app with TanStack Router, we'd integrate auth into the router context
    // Here we handle it via useEffect in the component since auth context is react-based
  },
  component: CheckoutPage,
});

function CheckoutPage() {
  const { gymId, date } = Route.useSearch();
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if not logged in (handled after auth loads)
  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate({ to: "/login", search: { redirect: `/checkout?gymId=${gymId}&date=${date}` } });
    }
  }, [isAuthLoading, user, navigate, gymId, date]);

  const { data: gym, isLoading: isGymLoading } = useQuery({
    queryKey: ["gym", gymId],
    queryFn: () => fetchGymById(gymId),
    enabled: !!gymId,
  });

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    toast.success("Payment successful!");

    // Redirect to dashboard after brief delay
    setTimeout(() => {
      navigate({ to: "/dashboard" });
    }, 2000);
  };

  if (isAuthLoading || isGymLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!gym || !date) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Invalid Booking Request</h2>
        <Link to="/search" className="mt-4 text-primary hover:underline">
          Return to Search
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="clay-lg p-10 max-w-md w-full text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Pass Booked!</h1>
          <p className="text-muted-foreground mb-8">
            Your day pass for {gym.name} is confirmed for {new Date(date).toLocaleDateString()}.
          </p>
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-[progress_2s_ease-in-out_forwards]"></div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-secondary/30">
      <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
          <Link
            to="/gym/$gymId"
            params={{ gymId }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gym
          </Link>
          <span className="font-display font-bold">Secure Checkout</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 mt-12 grid md:grid-cols-2 gap-12">
        {/* Payment Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          <div className="clay p-6 space-y-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Name on Card
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                className="mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Card Number
              </label>
              <div className="relative mt-2">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  className="w-full clay-inset pl-10 pr-4 py-3 bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Expiry
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="mt-2 w-full clay-inset px-4 py-3 bg-transparent outline-none"
                />
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="btn-clay w-full py-4 font-semibold mt-4 flex justify-center items-center gap-2"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pay $${gym.price}.00`}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="bg-background rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border">
            <div className="flex gap-4 pb-6 border-b">
              <img
                src={gym.images[0]}
                alt={gym.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <div className="font-semibold text-lg">{gym.name}</div>
                <div className="text-sm text-muted-foreground">{gym.city}</div>
                <div className="text-sm font-medium mt-1">
                  Date: {new Date(date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="py-6 space-y-3 border-b">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Day Pass</span>
                <span className="font-medium">${gym.price}.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxes & Fees</span>
                <span className="font-medium">$2.50</span>
              </div>
            </div>
            <div className="pt-6 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${(gym.price + 2.5).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
