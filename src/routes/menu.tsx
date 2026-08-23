import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { menu, getDishImage, type MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { itemId } from "@/lib/catalog";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — La Fête Cafe" },
      {
        name: "description",
        content:
          "Caribbean-Southern brunch, Korean-inspired tacos, eggrolls, burgers and more. See the full La Fête Cafe menu with prices.",
      },
      { property: "og:title", content: "La Fête Cafe — Menu" },
      {
        property: "og:description",
        content:
          "The full La Fête Cafe menu — brunch, entrees, apps, tacos, burgers, sides and desserts.",
      },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

const signatures = [
  {
    name: "Chicken & Waffles",
    price: "$18.40",
    blurb: "Fluffy buttermilk waffle, crispy buttermilk chicken, choice of butter.",
    tag: "Guest favorite",
  },
  {
    name: "Shrimp & Grits, La Fête Style",
    price: "$20.70",
    blurb: "Savory grits, jumbo shrimp, tomatoes, peppers, andouille, cajun sauce.",
    tag: "House classic",
  },
  {
    name: "Korean Pork Sandwich",
    price: "$14.95",
    blurb: "Korean BBQ pork, asian slaw, grilled pineapple, seasoned fries.",
    tag: "New",
  },
];

function MenuPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-5 py-20 md:py-28 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            The menu
          </div>
          <h1 className="mt-4 text-5xl leading-[1.05] md:text-7xl">
            Caribbean soul.
            <br />
            <span className="italic text-primary">Southern hospitality.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Everything made from scratch on N. Zaragoza — from buttermilk waffles at
            sunrise to Korean BBQ tacos after dark.
          </p>
        </div>
      </section>

      {/* Signature strip */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-3xl md:text-4xl">Signatures</h2>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Most ordered
            </span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {signatures.map((s) => (
              <article
                key={s.name}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <div className="mb-4 inline-block rounded-full bg-highlight/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  {s.tag}
                </div>
                <h3 className="text-2xl leading-tight">{s.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
                <div className="mt-6 flex items-end justify-between">
                  <span className="font-display text-2xl text-primary tabular-nums">
                    {s.price}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    On the menu ↓
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category pill nav */}
      <nav
        aria-label="Menu categories"
        className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur"
      >
        <div className="mx-auto max-w-6xl overflow-x-auto px-5 py-3">
          <ul className="flex gap-2 whitespace-nowrap">
            {menu.map((cat) => (
              <li key={cat.name}>
                <a
                  href={`#${slug(cat.name)}`}
                  className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Categories */}
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
        <div className="space-y-20">
          {menu.map((cat) => (
            <section key={cat.name} id={slug(cat.name)} className="scroll-mt-32">
              <header className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                    {String(cat.items.length).padStart(2, "0")} items
                  </div>
                  <h2 className="mt-1 text-4xl md:text-5xl">{cat.name}</h2>
                </div>
                <a
                  href="#top"
                  className="hidden text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground md:inline"
                >
                  ↑ Top
                </a>
              </header>

              <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
                {cat.items.map((item) => (
                  <MenuRow key={item.name} item={item} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mx-auto mt-20 max-w-md text-center text-xs uppercase tracking-widest text-muted-foreground">
          Prices reflect current delivery menu.
          <br />
          Ask your server about seasonal specials in the dining room.
        </p>
      </div>

      <SiteFooter />
    </div>
  );
}

function MenuRow({ item, category }: { item: MenuItem; category: string }) {
  const img = getDishImage(item.image);
  const { add, setOpen } = useCart();
  const id = itemId(category, item.name);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(id, 1);
    setAdded(true);
    setOpen(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <li className="group flex gap-4">
      {img ? (
        <img
          src={img}
          alt={item.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-20 w-20 flex-shrink-0 rounded-md object-cover ring-1 ring-border transition-transform duration-300 group-hover:scale-[1.03] md:h-24 md:w-24"
        />
      ) : (
        <div
          aria-hidden
          className="h-20 w-20 flex-shrink-0 rounded-md bg-secondary md:h-24 md:w-24"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h3 className="text-lg font-medium leading-snug">{item.name}</h3>
          <span
            aria-hidden
            className="mb-1 flex-1 border-b border-dotted border-border/70"
          />
          <span className="font-display text-lg text-primary tabular-nums">
            {item.price}
          </span>
        </div>
        {item.badge && (
          <div className="mt-1.5">
            <span
              className={
                "inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider " +
                (item.badge === "#1 most liked"
                  ? "bg-primary text-primary-foreground"
                  : "bg-highlight/30 text-foreground")
              }
            >
              {item.badge}
            </span>
          </div>
        )}
        {item.description && (
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        )}
        <button
          type="button"
          onClick={handleAdd}
          className="mt-2 rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          {added ? "Added ✓" : "Add to order"}
        </button>
      </div>
    </li>
  );
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
