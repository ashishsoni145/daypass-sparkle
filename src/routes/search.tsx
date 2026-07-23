import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchGyms } from "@/lib/api";
import { MapPin, Search, Star, Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/search")({
  component: SearchPage,
});

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: gyms, isLoading } = useQuery({
    queryKey: ["gyms"],
    queryFn: fetchGyms,
  });

  const filteredGyms = gyms?.filter(
    (gym) =>
      gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.tag.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-foreground grid place-items-center">
              <div className="w-3 h-3 rounded-md bg-background" />
            </div>
            <span className="font-display font-bold text-lg hidden sm:inline">DayPass</span>
          </Link>
          <div className="flex-1 max-w-xl mx-4">
            <div className="clay-sm rounded-full flex items-center px-4 py-2">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search gyms by name, city, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground hidden sm:flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 mt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Find your next workout</h1>
          <p className="text-muted-foreground mt-2">Browse our network of premium gyms.</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGyms?.map((gym) => (
              <div
                key={gym.id}
                onClick={() => navigate({ to: `/gym/${gym.id}` })}
                className="clay hover-lift p-3 group cursor-pointer"
              >
                <div className="relative h-48 rounded-3xl overflow-hidden">
                  <img
                    src={gym.images[0]}
                    alt={gym.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-[11px] font-medium shadow-sm">
                    {gym.tag}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-lg truncate">{gym.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {gym.city}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm shrink-0 font-medium">
                      <Star className="w-4 h-4 fill-foreground text-foreground" /> {gym.rating}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">${gym.price}</span>
                      <span className="text-xs text-muted-foreground"> / day</span>
                    </div>
                    <button className="btn-clay px-4 py-2 text-xs font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredGyms?.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                No gyms found matching your search.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
