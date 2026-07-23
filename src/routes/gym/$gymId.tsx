import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchGymById } from "@/lib/api";
import { ArrowLeft, MapPin, Star, Check, Loader2, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/gym/$gymId")({
  component: GymDetailsPage,
});

function GymDetailsPage() {
  const { gymId } = Route.useParams();
  const [selectedDate, setSelectedDate] = useState<string>("");

  const { data: gym, isLoading } = useQuery({
    queryKey: ["gym", gymId],
    queryFn: () => fetchGymById(gymId),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Gym not found</h2>
        <Link to="/search" className="mt-4 text-primary hover:underline">
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link
            to="/search"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Search
          </Link>
          <span className="font-display font-bold">DayPass</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 mt-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium mb-4">
              {gym.tag}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{gym.name}</h1>
            <div className="flex items-center gap-4 mt-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {gym.city}
              </span>
              <span className="flex items-center gap-1 text-foreground font-medium">
                <Star className="w-4 h-4 fill-foreground" /> {gym.rating}
              </span>
            </div>
          </div>

          {/* Booking Card */}
          <div className="w-full md:w-96 clay p-6 shrink-0">
            <div className="text-3xl font-bold mb-1">
              ${gym.price}{" "}
              <span className="text-sm font-normal text-muted-foreground">/ day pass</span>
            </div>
            <div className="space-y-4 mt-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Select Date
                </label>
                <div className="flex items-center gap-3 clay-inset px-4 py-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    className="bg-transparent outline-none flex-1 text-sm"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>
              <Link
                to="/checkout"
                search={{ gymId: gym.id, date: selectedDate }}
                disabled={!selectedDate}
                className={`btn-clay w-full py-3.5 font-semibold mt-4 flex justify-center items-center ${!selectedDate ? "opacity-50 pointer-events-none" : ""}`}
              >
                Book Now
              </Link>
              <p className="text-center text-xs text-muted-foreground">You won't be charged yet.</p>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mt-12">
          <div className="rounded-3xl overflow-hidden h-[400px]">
            <img src={gym.images[0]} alt={gym.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Details Content */}
        <div className="mt-12 grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">About this gym</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{gym.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {gym.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {amenity}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Map Placeholder */}
          <div>
            <div className="clay p-1 rounded-3xl overflow-hidden h-64 sticky top-24">
              {/* Static Map visual representation */}
              <div className="w-full h-full bg-secondary flex items-center justify-center rounded-2xl relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="text-center relative z-10">
                  <MapPin className="w-8 h-8 text-foreground mx-auto mb-2" />
                  <div className="font-semibold">{gym.city}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Exact location provided after booking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
