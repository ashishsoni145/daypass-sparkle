export interface Gym {
  id: string;
  name: string;
  city: string;
  price: number;
  rating: number;
  tag: string;
  images: string[];
  amenities: string[];
  description: string;
}

const mockGyms: Gym[] = [
  {
    id: "1",
    name: "Iron Loft",
    city: "Brooklyn",
    price: 14,
    rating: 4.9,
    tag: "Strength",
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"],
    amenities: ["Free Weights", "Power Racks", "Chalk Allowed"],
    description:
      "A gritty, no-nonsense powerlifting and strength training facility in the heart of Brooklyn.",
  },
  {
    id: "2",
    name: "Neon Athletic",
    city: "SoHo",
    price: 22,
    rating: 4.8,
    tag: "Boutique",
    images: ["https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80"],
    amenities: ["Treadmills", "Towels", "Locker Rooms", "Sauna"],
    description:
      "Premium boutique fitness with state-of-the-art equipment and a sleek, modern aesthetic.",
  },
  {
    id: "3",
    name: "Pulse Studio",
    city: "Williamsburg",
    price: 18,
    rating: 4.9,
    tag: "HIIT",
    images: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"],
    amenities: ["Kettlebells", "Rowers", "Showers"],
    description:
      "High-intensity interval training studio designed to get your heart rate up and burn calories fast.",
  },
  {
    id: "4",
    name: "Vertex Climb",
    city: "Queens",
    price: 26,
    rating: 4.7,
    tag: "Climbing",
    images: ["https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80"],
    amenities: ["Bouldering Wall", "Top Rope", "Chalk Provided"],
    description:
      "Premier indoor rock climbing facility featuring expansive bouldering and top-rope routes.",
  },
  {
    id: "5",
    name: "Aqua Prime",
    city: "Manhattan",
    price: 30,
    rating: 4.9,
    tag: "Pool & Spa",
    images: ["https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80"],
    amenities: ["Olympic Pool", "Hot Tub", "Steam Room", "Towel Service"],
    description:
      "Luxury aquatic center with a full-size Olympic pool, hot tubs, and premium spa facilities.",
  },
  {
    id: "6",
    name: "Ronin Boxing",
    city: "LES",
    price: 20,
    rating: 4.8,
    tag: "Boxing",
    images: ["https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80"],
    amenities: ["Heavy Bags", "Speed Bags", "Boxing Ring"],
    description: "Authentic boxing gym focusing on technique, endurance, and strength training.",
  },
];

export const fetchGyms = async (): Promise<Gym[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockGyms;
};

export const fetchGymById = async (id: string): Promise<Gym | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockGyms.find((g) => g.id === id);
};
