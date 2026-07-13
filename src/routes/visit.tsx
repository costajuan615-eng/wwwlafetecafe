import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { info } from "@/data/menu";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit — La Fête Cafe" },
      { name: "description", content: "Find La Fête Cafe at 1320 N Zaragoza Rd, El Paso, TX 79936. Open Mon 7:00 AM – 9:00 PM." },
      { property: "og:title", content: "Visit La Fête Cafe" },
      { property: "og:description", content: "1320 N Zaragoza Rd, El Paso, TX. Mon 7 AM – 9 PM." },
      { property: "og:url", content: "/visit" },
    ],
    links: [{ rel: "canonical", href: "/visit" }],
  }),
  component: VisitPage,
});

const mapSrc =
  "https://www.google.com/maps?q=" +
  encodeURIComponent("1320 N Zaragoza Rd, El Paso, TX 79936") +
  "&output=embed";

function VisitPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Come find us</div>
          <h1 className="mt-3 text-5xl md:text-6xl">The corner of Zaragoza.</h1>

          <dl className="mt-10 space-y-6 text-lg">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Address</dt>
              <dd className="mt-1">{info.address}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hours</dt>
              <dd className="mt-1">{info.hours}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Delivery</dt>
              <dd className="mt-1 text-muted-foreground">
                Delivery is temporarily unavailable through our platform partners. Dine in or grab it to go — we'll have it hot.
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(info.address)}`}
              target="_blank"
              rel="noreferrer"
              className="rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Get directions
            </a>
            <a
              href={info.uberEats}
              target="_blank"
              rel="noreferrer"
              className="rounded border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground hover:bg-foreground hover:text-background"
            >
              View on Uber Eats
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded border border-border">
          <iframe
            title="Map to La Fête Cafe"
            src={mapSrc}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
