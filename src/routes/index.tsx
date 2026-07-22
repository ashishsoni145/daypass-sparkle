import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, MapPin, Search, Zap, Calendar, ShieldCheck, Dumbbell,
  Sparkles, Star, ChevronDown, Menu, X, Clock, CreditCard, Users,
} from "lucide-react";
import heroCard from "@/assets/hero-card.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DayPass — One-Day Gym Access, No Commitment" },
      { name: "description", content: "Find nearby gyms and book instant day passes. Train anywhere without monthly membership." },
      { property: "og:title", content: "DayPass — One-Day Gym Access, No Commitment" },
      { property: "og:description", content: "Find nearby gyms. Book instant day passes. No monthly commitment." },
    ],
  }),
  component: Landing,
});

/* ---------------- Reveal on scroll ---------------- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease, transform 0.8s ease`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Navbar ---------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "Gyms", href: "#gyms" },
    { label: "How it works", href: "#how" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className={`glass rounded-2xl px-5 py-3 flex items-center justify-between transition-all ${scrolled ? "shadow-elegant" : ""}`}>
          <a href="#top" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent animate-pulse-glow" />
            <span className="font-display font-bold text-lg">DayPass</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground">
              Sign in
            </Link>
            <Link to="/login" className="btn-primary-glow hidden sm:inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="glass mt-2 rounded-2xl p-4 md:hidden animate-reveal">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted-foreground">
                {l.label}
              </a>
            ))}
            <Link to="/login" className="btn-primary-glow mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-24 overflow-hidden">
      <div className="glow-orb w-[600px] h-[600px] bg-primary/40 -top-40 -left-40 animate-pulse-glow" />
      <div className="glow-orb w-[500px] h-[500px] bg-accent/40 top-20 right-0 animate-pulse-glow" />

      <div className="relative mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Now live in 40+ cities
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              Any gym.<br />
              <span className="text-gradient animate-gradient bg-clip-text">One day.</span><br />
              Zero commitment.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Discover premium gyms near you and unlock instant day passes.
              Train on your own terms — no contracts, no monthly fees.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/login" className="btn-primary-glow inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#gyms" className="glass hover-lift inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold">
                Explore Gyms
              </a>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {["from-primary to-accent", "from-accent to-primary", "from-primary/60 to-accent/60", "from-accent/60 to-primary/60"].map((g, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} border-2 border-background`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                  <span className="ml-2 text-sm font-semibold">4.9</span>
                </div>
                <div className="text-xs text-muted-foreground">Loved by 120k+ athletes</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl rounded-full" />
            <img
              src={heroCard}
              alt="DayPass premium gym access card"
              width={1024}
              height={1024}
              className="relative w-full max-w-lg mx-auto animate-float drop-shadow-2xl"
            />
            <div className="glass-strong absolute -left-4 top-10 rounded-2xl p-3 animate-float-slow hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Booked in</div>
                <div className="text-sm font-semibold">12 seconds</div>
              </div>
            </div>
            <div className="glass-strong absolute -right-2 bottom-10 rounded-2xl p-3 animate-float hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary grid place-items-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Nearby</div>
                <div className="text-sm font-semibold">48 gyms</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Search preview ---------------- */
function SearchPreview() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal>
          <div className="glass-strong rounded-3xl p-2 flex flex-col md:flex-row items-stretch gap-2">
            <div className="flex items-center gap-3 flex-1 px-4 py-3">
              <MapPin className="w-5 h-5 text-primary" />
              <input placeholder="Location — e.g. Brooklyn, NY" className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground" />
            </div>
            <div className="hidden md:block w-px bg-border" />
            <div className="flex items-center gap-3 flex-1 px-4 py-3">
              <Calendar className="w-5 h-5 text-primary" />
              <input placeholder="Today, anytime" className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground" />
            </div>
            <button className="btn-primary-glow rounded-2xl px-6 py-3 font-semibold inline-flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Find gyms
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {["Yoga", "CrossFit", "Boxing", "Pool", "Sauna", "24/7"].map((t) => (
              <span key={t} className="glass rounded-full px-3 py-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Featured gyms ---------------- */
const gyms = [
  { name: "Iron Loft", city: "Brooklyn", price: 14, rating: 4.9, tag: "Strength", grad: "from-primary/30 to-accent/30" },
  { name: "Neon Athletic", city: "SoHo", price: 22, rating: 4.8, tag: "Boutique", grad: "from-accent/30 to-primary/30" },
  { name: "Pulse Studio", city: "Williamsburg", price: 18, rating: 4.9, tag: "HIIT", grad: "from-primary/40 to-accent/20" },
  { name: "Vertex Climb", city: "Queens", price: 26, rating: 4.7, tag: "Climbing", grad: "from-accent/40 to-primary/20" },
  { name: "Aqua Prime", city: "Manhattan", price: 30, rating: 4.9, tag: "Pool & Spa", grad: "from-primary/30 to-accent/40" },
  { name: "Ronin Boxing", city: "LES", price: 20, rating: 4.8, tag: "Boxing", grad: "from-accent/30 to-primary/40" },
];

function FeaturedGyms() {
  return (
    <section id="gyms" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-sm text-primary font-semibold mb-2">Featured</div>
              <h2 className="text-4xl md:text-5xl font-bold">Premium gyms, on demand</h2>
            </div>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((g, i) => (
            <Reveal key={g.name} delay={i * 80}>
              <div className="glass hover-lift rounded-3xl overflow-hidden group cursor-pointer">
                <div className={`relative h-44 bg-gradient-to-br ${g.grad} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
                  <Dumbbell className="absolute right-4 bottom-4 w-16 h-16 text-foreground/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs">{g.tag}</div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-lg">{g.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {g.city}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-primary text-primary" /> {g.rating}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gradient">${g.price}</span>
                      <span className="text-xs text-muted-foreground"> / day</span>
                    </div>
                    <button className="glass hover:bg-primary hover:text-primary-foreground transition-all rounded-xl px-3 py-1.5 text-xs font-semibold">
                      Book pass
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefits ---------------- */
const benefits = [
  { icon: Zap, title: "Instant booking", desc: "Book a pass and unlock the door within seconds. No waiting, no calls." },
  { icon: CreditCard, title: "No commitment", desc: "Pay per day. Skip the contracts, cancellations, and monthly fees." },
  { icon: MapPin, title: "Train anywhere", desc: "Access thousands of gyms across cities — perfect for travel and variety." },
  { icon: ShieldCheck, title: "Verified quality", desc: "Every gym on DayPass is vetted for equipment, cleanliness, and staff." },
];

function Benefits() {
  return (
    <section id="benefits" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm text-primary font-semibold mb-2">Why DayPass</div>
            <h2 className="text-4xl md:text-5xl font-bold">Freedom to train, everywhere</h2>
            <p className="mt-4 text-muted-foreground">Membership without the membership. Your workout, your way.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="glass hover-lift rounded-3xl p-6 h-full">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent grid place-items-center mb-4">
                  <b.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="font-semibold text-lg">{b.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
const steps = [
  { n: "01", icon: Search, title: "Discover", desc: "Browse verified gyms near you with real photos, reviews, and amenities." },
  { n: "02", icon: CreditCard, title: "Book", desc: "Choose your day, tap to pay, and receive your digital pass instantly." },
  { n: "03", icon: Dumbbell, title: "Train", desc: "Scan your pass at the gym entrance. Enjoy full access — that simple." },
];

function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm text-primary font-semibold mb-2">How it works</div>
            <h2 className="text-4xl md:text-5xl font-bold">Three steps to your next workout</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="glass hover-lift rounded-3xl p-8 h-full relative overflow-hidden">
                <div className="absolute -top-6 -right-4 text-7xl font-black text-gradient opacity-30">{s.n}</div>
                <div className="w-12 h-12 rounded-2xl glass-strong grid place-items-center mb-4">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-semibold text-xl">{s.title}</div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
const stats = [
  { v: "2.4K+", l: "Partner gyms" },
  { v: "120K+", l: "Active members" },
  { v: "40+", l: "Cities live" },
  { v: "4.9★", l: "Average rating" },
];

function Stats() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="glass-strong rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient">{s.v}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const testimonials = [
  { q: "Traveling for work used to kill my routine. DayPass fixed that overnight — I can hit any gym in any city.", n: "Maya S.", r: "Product Designer" },
  { q: "The booking flow is stupid fast. 15 seconds from open to inside a gym. Feels like magic.", n: "Jordan T.", r: "Software Engineer" },
  { q: "Way better than committing to a gym I only visit twice a month. DayPass paid for itself in week one.", n: "Priya R.", r: "Marathon Runner" },
];

function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm text-primary font-semibold mb-2">Loved by athletes</div>
            <h2 className="text-4xl md:text-5xl font-bold">Real training, real freedom</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.n} delay={i * 100}>
              <div className="glass hover-lift rounded-3xl p-6 h-full">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-foreground/90 leading-relaxed">"{t.q}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <div className="text-sm font-semibold">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const faqs = [
  { q: "How does a DayPass work?", a: "Pick a gym, choose your date, and pay. You'll get a QR pass — scan it at the entrance and train for the full day." },
  { q: "Are there any hidden fees?", a: "No. You pay a single flat price per gym, per day. No signup, cancellation, or platform fees." },
  { q: "Can I cancel a booked pass?", a: "Yes — free cancellation up to 2 hours before your visit. Full refund back to your original payment method." },
  { q: "Do I need to bring anything?", a: "Just yourself. Some gyms include towels; others offer rentals. Amenities are listed on each gym's page." },
  { q: "Which cities are supported?", a: "We're live in 40+ cities across North America and Europe, with new locations added weekly." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-sm text-primary font-semibold mb-2">FAQ</div>
            <h2 className="text-4xl md:text-5xl font-bold">Questions, answered</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <div className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <div
                  className="px-5 grid transition-all duration-300"
                  style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="relative glass-strong rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
            <div className="glow-orb w-[500px] h-[500px] bg-primary/40 -top-40 -left-20 animate-pulse-glow" />
            <div className="glow-orb w-[500px] h-[500px] bg-accent/40 -bottom-40 -right-20 animate-pulse-glow" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground mb-6">
                <Clock className="w-3.5 h-3.5 text-primary" /> Takes 30 seconds
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Your next workout <br />
                is <span className="text-gradient">one tap away</span>
              </h2>
              <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
                Join 120,000+ athletes who train wherever they want, whenever they want.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/login" className="btn-primary-glow inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#gyms" className="glass hover-lift inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold">
                  Explore Gyms
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> No commitment</div>
                <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary" /> Instant access</div>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> 120k+ members</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="relative pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass rounded-3xl p-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
              <span className="font-display font-bold text-lg">DayPass</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              One-day access to premium gyms — anywhere, anytime.
            </p>
          </div>
          {[
            { t: "Product", l: ["Find gyms", "For gyms", "Pricing", "Mobile app"] },
            { t: "Company", l: ["About", "Careers", "Press", "Contact"] },
            { t: "Legal", l: ["Terms", "Privacy", "Cookies", "Security"] },
          ].map((col) => (
            <div key={col.t}>
              <div className="font-semibold mb-4 text-sm">{col.t}</div>
              <ul className="space-y-2">
                {col.l.map((i) => (
                  <li key={i}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} DayPass. All rights reserved.</div>
          <div>Made for people who move.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function Landing() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <SearchPreview />
        <FeaturedGyms />
        <Benefits />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
