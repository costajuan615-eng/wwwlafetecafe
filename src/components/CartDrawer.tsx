import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { catalogById, formatCents } from "@/lib/catalog";
import { getDishImage } from "@/data/menu";

export function CartButton({ className = "" }: { className?: string }) {
  const { count, setOpen, totalCents } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={
        "relative rounded border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary " +
        className
      }
      aria-label={`Open pickup cart, ${count} items`}
    >
      Cart{count > 0 ? ` · ${count}` : ""}
      {count > 0 && (
        <span className="ml-2 font-display text-primary tabular-nums">{formatCents(totalCents)}</span>
      )}
    </button>
  );
}

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotalCents, taxCents, totalCents, count } = useCart();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-foreground/50"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-xl">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-display text-2xl">Your pickup order</h2>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Pickup only — no delivery
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded border border-border px-2 py-1 text-sm"
            aria-label="Close cart"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {count === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Your cart is empty.
              <div className="mt-4">
                <Link
                  to="/menu"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Browse the menu
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => {
                const item = catalogById.get(line.id);
                if (!item) return null;
                const img = getDishImage(item.image);
                return (
                  <li key={line.id} className="flex gap-3">
                    {img && (
                      <img
                        src={img}
                        alt={item.name}
                        loading="lazy"
                        className="h-16 w-16 flex-shrink-0 rounded-md object-cover ring-1 ring-border"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="truncate text-sm font-medium">{item.name}</h3>
                        <span className="font-display text-sm text-primary tabular-nums">
                          {formatCents(item.priceCents * line.qty)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded border border-border">
                          <button
                            type="button"
                            className="px-2 py-0.5 text-sm"
                            onClick={() => setQty(line.id, line.qty - 1)}
                            aria-label={`Decrease ${item.name}`}
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm tabular-nums">{line.qty}</span>
                          <button
                            type="button"
                            className="px-2 py-0.5 text-sm"
                            onClick={() => setQty(line.id, line.qty + 1)}
                            aria-label={`Increase ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
                          onClick={() => remove(line.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {count > 0 && (
          <footer className="space-y-3 border-t border-border px-5 py-4">
            <div className="space-y-1 text-sm">
              <Row label="Subtotal" value={formatCents(subtotalCents)} />
              <Row label="Estimated tax" value={formatCents(taxCents)} />
              <div className="flex justify-between pt-1 text-base font-semibold">
                <span>Total</span>
                <span className="font-display text-primary tabular-nums">{formatCents(totalCents)}</span>
              </div>
            </div>
            <Link
              to="/order"
              onClick={() => setOpen(false)}
              className="block rounded bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Continue to pickup details
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
