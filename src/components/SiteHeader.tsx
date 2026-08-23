import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { info } from "@/data/menu";
import { CartButton } from "@/components/CartDrawer";

const links = [

  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/order", label: "Order Pickup" },
  { to: "/about", label: "About" },
  { to: "/visit", label: "Visit" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
          La Fête <span className="text-primary">Cafe</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`tel:${info.phone.replace(/\D/g, "")}`}
            className="rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Call {info.phone}
          </a>
          <CartButton />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <CartButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded border border-border px-3 py-1.5 text-sm"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-5 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-muted-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`tel:${info.phone.replace(/\D/g, "")}`}
            className="py-2 text-sm font-semibold text-primary"
          >
            Call {info.phone}
          </a>
        </nav>
      )}

    </header>
  );
}
