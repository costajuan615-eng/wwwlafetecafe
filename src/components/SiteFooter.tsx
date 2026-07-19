import { Link } from "@tanstack/react-router";
import { info } from "@/data/menu";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl">
            La Fête <span className="text-highlight">Cafe</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-background/70">{info.tagline}</p>
        </div>
        <div className="text-sm">
          <div className="mb-2 font-medium uppercase tracking-wider text-background/60">Visit</div>
          <p className="text-background/85">{info.address}</p>
          <p className="mt-1 text-background/85">{info.hours}</p>
          <a href={`tel:${info.phone.replace(/\D/g, "")}`} className="mt-1 block text-background/85 hover:text-highlight">
            {info.phone}
          </a>
        </div>

        <div className="text-sm">
          <div className="mb-2 font-medium uppercase tracking-wider text-background/60">Explore</div>
          <div className="flex flex-col gap-1">
            <Link to="/menu" className="text-background/85 hover:text-highlight">Menu</Link>
            <Link to="/about" className="text-background/85 hover:text-highlight">About</Link>
            <Link to="/visit" className="text-background/85 hover:text-highlight">Visit</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">
        © {new Date().getFullYear()} {info.name}. All rights reserved.
      </div>
    </footer>
  );
}
