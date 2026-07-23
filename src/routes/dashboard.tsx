import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Loader2, LogOut, Ticket, Settings, History, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({
        to: "/login",
        search: { redirect: "/dashboard" },
      });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { user, logout, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [bookedPasses, setBookedPasses] = useState<
    {
      id: string;
      gymId: string;
      gymName: string;
      gymCity: string;
      gymImage: string;
      date: string;
      purchaseDate: string;
    }[]
  >([]);
  const [isLoadingPasses, setIsLoadingPasses] = useState(true);
  const [qrModalOpen, setQrModalOpen] = useState<string | null>(null);

  useEffect(() => {
    // Load passes from local storage
    if (typeof window !== "undefined") {
      const passes = JSON.parse(localStorage.getItem("bookedPasses") || "[]");
      setBookedPasses(passes);
      setIsLoadingPasses(false);
    }
  }, []);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    import("sonner").then((m) => m.toast("Successfully logged out."));
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen pb-24 bg-secondary/20">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-foreground grid place-items-center">
              <div className="w-3 h-3 rounded-md bg-background" />
            </div>
            <span className="font-display font-bold text-lg hidden sm:inline">DayPass</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/search" className="text-sm font-medium hover:text-primary">
              Find Gyms
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm uppercase">
              {user.name.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 mt-12 grid md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-2">
          <div className="px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Account
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-foreground text-background font-medium">
            <Ticket className="w-4 h-4" /> My Passes
          </button>
          <button
            onClick={() => import("sonner").then((m) => m.toast("History feature coming soon."))}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            <History className="w-4 h-4" /> History
          </button>
          <button
            onClick={() => import("sonner").then((m) => m.toast("Settings feature coming soon."))}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500 font-medium transition-colors mt-8"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </aside>

        {/* Main Content */}
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {user.name.split(" ")[0]}</h1>
            <p className="text-muted-foreground mt-1">
              Manage your active passes and account settings.
            </p>
          </div>

          <h2 className="text-xl font-bold mb-4">Active Passes</h2>
          {isLoadingPasses ? (
            <div className="h-40 flex items-center justify-center border rounded-3xl">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : bookedPasses.length > 0 ? (
            <div className="grid gap-6">
              {bookedPasses.map((pass) => (
                <div
                  key={pass.id}
                  className="clay p-2 sm:p-4 rounded-[2rem] flex flex-col sm:flex-row gap-6 items-center relative overflow-hidden group"
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                  <img
                    src={pass.gymImage}
                    alt={pass.gymName}
                    className="w-full sm:w-48 h-48 sm:h-32 rounded-2xl object-cover shrink-0"
                  />
                  <div className="flex-1 w-full p-4 sm:p-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-green-500 mb-1">
                          Date: {new Date(pass.date).toLocaleDateString()}
                        </div>
                        <h3 className="text-2xl font-bold">{pass.gymName}</h3>
                        <div className="text-muted-foreground flex items-center gap-1 mt-1 text-sm">
                          <MapPin className="w-4 h-4" /> {pass.gymCity}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setQrModalOpen(pass.id)}
                        className="btn-clay px-6 py-2 text-sm font-semibold flex-1 sm:flex-none justify-center"
                      >
                        View QR Code
                      </button>
                      <Link
                        to="/gym/$gymId"
                        params={{ gymId: pass.gymId }}
                        className="btn-clay-ghost px-6 py-2 text-sm font-semibold flex-1 sm:flex-none justify-center"
                      >
                        Gym Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed rounded-3xl p-12 text-center text-muted-foreground">
              <Ticket className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>You have no active passes for today.</p>
              <Link
                to="/search"
                className="inline-block mt-4 text-foreground font-medium hover:underline"
              >
                Find a gym
              </Link>
            </div>
          )}
        </div>
      </main>

      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="clay-lg p-8 max-w-sm w-full relative animate-reveal text-center">
            <button
              onClick={() => setQrModalOpen(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold mb-2">Scan at Entrance</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Present this QR code to the front desk.
            </p>
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto mb-2 shadow-sm">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pass_${qrModalOpen}`}
                alt="Access QR Code"
                className="w-48 h-48"
              />
            </div>
            <div className="text-xs text-muted-foreground mt-4 font-mono bg-secondary/50 py-2 px-4 rounded-full inline-block">
              ID: {qrModalOpen.toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
