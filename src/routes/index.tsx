import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { info, reviews } from "@/data/menu";
import heroImg from "@/assets/hero.jpg";
import macImg from "@/assets/mac.jpg";
import eggrollsImg from "@/assets/eggrolls.jpg";
import cwImg from "@/assets/chicken-waffles.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Fête Cafe — Caribbean-Southern Brunch in El Paso" },
      { name: "description", content: "Truffle mac, Philly eggrolls, chicken & waffles, and Caribbean-inspired brunch on Zaragoza Rd. 4.6★ from 260+ diners." },
      { property: "og:title", content: "La Fête Cafe — El Paso" },
      { property: "og:description", content: "Caribbean-Southern brunch & soul in El Paso, TX." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: info.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: "1320 N Zaragoza Rd",
            addressLocality: "El Paso",
            addressRegion: "TX",
            postalCode: "79936",
            addressCountry: "US",
          },
          servesCuisine: ["Caribbean", "Southern", "American", "Brunch"],
          priceRange: "$$",
          openingHours: "Mo 07:00-21:00",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.6",
            reviewCount: "260",
          },
        }),
      },
    ],
  }),
  component: Home,
});

const featured = [
  { img: macImg, name: "Truffle Mac", note: "Cast-iron baked, actual truffles." },
  { img: eggrollsImg, name: "Philly Eggroll", note: "Steak, peppers, provolone, spicy aioli." },
  { img: cwImg, name: "Chicken & Waffles", note: "Crispy buttermilk chicken, fluffy waffle." },
];

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
              <span className="text-highlight">★</span> {info.rating} · {info.ratingCount} ratings
            </div>
            <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
              A little <span className="italic text-primary">fête</span> on every plate.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Caribbean-Southern brunch, cast-iron mac, and crave-worthy eggrolls — served hot on Zaragoza Rd.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu" className="rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                See the menu
              </Link>
              <Link to="/visit" className="rounded border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background">
                Plan a visit
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded bg-primary/10 blur-2xl" />
            <img
              src={heroImg}
              alt="Overhead spread of La Fête Cafe dishes on rustic wood"
              width={1600}
              height={1200}
              className="aspect-[4/3] w-full rounded object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The favorites</div>
              <h2 className="mt-2 text-4xl md:text-5xl">What people order twice.</h2>
            </div>
            <Link to="/menu" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground md:block">
              Full menu →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((f) => (
              <article key={f.name} className="group overflow-hidden rounded bg-card shadow-sm ring-1 ring-border">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.name}
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl">{f.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Word of mouth</div>
        <h2 className="mt-2 text-4xl md:text-5xl">Straight from the table.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((r) => (
            <blockquote key={r.author} className="rounded border border-border bg-card p-6">
              <p className="font-display text-2xl leading-snug">“{r.text}”</p>
              <footer className="mt-4 text-sm text-muted-foreground">— {r.author} · {r.date}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Visit strip */}
      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-4xl md:text-5xl">Come by. Stay a while.</h2>
            <p className="mt-4 max-w-md text-background/75">
              {info.address}
              <br />
              {info.hours}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/visit" className="rounded bg-highlight px-6 py-3 text-sm font-semibold text-foreground">
              Directions & hours
            </Link>
            <Link to="/menu" className="rounded border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:bg-background hover:text-foreground">
              Browse the menu
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
