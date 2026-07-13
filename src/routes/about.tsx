import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { reviews, info } from "@/data/menu";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — La Fête Cafe" },
      { name: "description", content: "A neighborhood brunch spot in El Paso blending Caribbean flavor with Southern soul. 4.6★ from 260+ diners." },
      { property: "og:title", content: "About La Fête Cafe" },
      { property: "og:description", content: "Caribbean flavor, Southern soul, El Paso hospitality." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Our story</div>
          <h1 className="mt-3 text-5xl md:text-6xl">Caribbean flavor. Southern soul.</h1>
          <div className="prose prose-neutral mt-6 max-w-none text-lg text-foreground/85">
            <p>
              La Fête Cafe is where the coast meets the countryside — jerk pork belly, low-country crab cakes, truffle mac, and cast-iron skillets pulled straight from the oven. Every plate is a small celebration.
            </p>
            <p className="mt-4">
              Locals and out-of-towners alike have made us a Zaragoza Road staple. We cook the way we'd feed family — generously, and with a little rum in the French toast when the occasion calls for it.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-6 rounded border border-border bg-card p-5">
            <div className="text-center">
              <div className="font-display text-5xl text-primary">{info.rating}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Rating</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="font-display text-2xl">{info.ratingCount} ratings</div>
              <p className="mt-1 text-sm text-muted-foreground">From guests across El Paso and beyond.</p>
            </div>
          </div>

          <Link to="/menu" className="mt-10 inline-block rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            See what's cooking
          </Link>
        </div>

        <div>
          <img src={heroImg} alt="La Fête Cafe dishes" width={1600} height={1200} loading="lazy" className="aspect-square w-full rounded object-cover" />
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <h2 className="mb-10 text-4xl md:text-5xl">What guests say.</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <blockquote key={r.author} className="rounded border border-border bg-card p-6">
              <p className="font-display text-2xl leading-snug">“{r.text}”</p>
              <footer className="mt-4 text-sm text-muted-foreground">— {r.author} · {r.date}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
