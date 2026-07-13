import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { menu } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — La Fête Cafe" },
      { name: "description", content: "Brunch, entrees, eggrolls, burgers, kids menu and more. See the full La Fête Cafe menu with prices." },
      { property: "og:title", content: "La Fête Cafe — Menu" },
      { property: "og:description", content: "The full La Fête Cafe menu — brunch, entrees, apps, sides and desserts." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function Badge({ kind }: { kind: "Popular" | "#1 most liked" }) {
  const isTop = kind === "#1 most liked";
  return (
    <span
      className={
        "ml-2 inline-block rounded-full px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wider " +
        (isTop
          ? "bg-primary text-primary-foreground"
          : "bg-highlight/30 text-foreground")
      }
    >
      {kind}
    </span>
  );
}

function MenuPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <header className="mb-14 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">The menu</div>
          <h1 className="mt-3 text-5xl md:text-6xl">Made from scratch. Made to share.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Prices reflect current delivery menu. Ask your server about seasonal specials in the dining room.
          </p>
        </header>

        <nav className="sticky top-16 z-30 -mx-5 mb-12 border-y border-border bg-background/90 px-5 py-3 backdrop-blur">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {menu.map((cat) => (
              <li key={cat.name}>
                <a href={`#${slug(cat.name)}`} className="hover:text-foreground">
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-16">
          {menu.map((cat) => (
            <section key={cat.name} id={slug(cat.name)} className="scroll-mt-32">
              <h2 className="mb-6 border-b border-border pb-3 text-3xl md:text-4xl">{cat.name}</h2>
              <ul className="divide-y divide-border">
                {cat.items.map((item) => (
                  <li key={item.name} className="grid grid-cols-[1fr_auto] gap-4 py-4">
                    <div>
                      <div className="text-lg font-medium leading-snug">
                        {item.name}
                        {item.badge && <Badge kind={item.badge} />}
                      </div>
                      {item.description && (
                        <p className="mt-1 max-w-xl text-sm text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                    <div className="pt-1 font-display text-lg text-primary tabular-nums">{item.price}</div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
