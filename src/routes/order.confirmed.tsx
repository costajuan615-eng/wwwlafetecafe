import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatCents } from "@/lib/catalog";
import { formatPickupStamp } from "@/lib/pickup";
import { info } from "@/data/menu";
import { getOrderByToken } from "@/lib/orders.functions";

type Search = { token?: string };

export const Route = createFileRoute("/order/confirmed")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    token: typeof search['token'] === "string" ? search['token'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — La Fête Cafe" },
      {
        name: "description",
        content: "Your La Fête Cafe pickup order is confirmed. See your pickup time and receipt.",
      },
      { property: "og:title", content: "Order Confirmed — La Fête Cafe" },
      { property: "og:description", content: "Pickup order confirmation for La Fête Cafe." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmedPage,
});

function ConfirmedPage() {
  const { token } = Route.useSearch();
  const fetchOrder = useServerFn(getOrderByToken);

  const { data, isLoading } = useQuery({
    queryKey: ["order", token],
    queryFn: () => fetchOrder({ data: { token: token! } }),
    enabled: Boolean(token),
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-5 py-16">
        {!token || (!isLoading && !data) ? (
          <div className="text-center">
            <h1 className="text-4xl">Order not found</h1>
            <p className="mt-3 text-muted-foreground">
              We couldn't find that order. Give us a call at{" "}
              <a href={`tel:${info.phone.replace(/\D/g, "")}`} className="text-primary underline">
                {info.phone}
              </a>
              .
            </p>
          </div>
        ) : isLoading || !data ? (
          <p className="text-center text-muted-foreground">Loading your order…</p>
        ) : (
          <div className="space-y-8">
            <header className="text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Order confirmed
              </div>
              <h1 className="mt-3 text-4xl md:text-5xl">Thanks, {data.customer_name}!</h1>
              <p className="mt-3 text-muted-foreground">
                Order <span className="font-semibold text-foreground">{data.order_number}</span> ·
                pickup {formatPickupStamp(data.pickup_at)}
              </p>
            </header>

            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-xl">Your order</h2>
              <ul className="space-y-2 text-sm">
                {data.order_items?.map((item, i) => (
                  <li key={i} className="flex justify-between gap-3">
                    <span>
                      {item.quantity}× {item.item_name}
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {formatCents(item.line_total_cents)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
                <Row label="Subtotal" value={formatCents(data.subtotal_cents)} />
                <Row label="Estimated tax" value={formatCents(data.tax_cents)} />
                <div className="flex justify-between pt-1 font-semibold">
                  <span>Due at pickup</span>
                  <span className="font-display text-primary tabular-nums">
                    {formatCents(data.total_cents)}
                  </span>
                </div>
              </div>
              {data.notes && (
                <p className="mt-4 rounded bg-secondary/50 p-3 text-sm text-muted-foreground">
                  Notes: {data.notes}
                </p>
              )}
            </section>

            <section className="rounded-lg border border-border p-6 text-sm">
              <h2 className="mb-2 text-xl">Pick it up</h2>
              <p className="text-muted-foreground">{info.address}</p>
              <a
                href={`tel:${info.phone.replace(/\D/g, "")}`}
                className="mt-1 inline-block font-semibold text-primary"
              >
                {info.phone}
              </a>
              <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                Pickup only — payment taken in store
              </p>
            </section>

            <div className="text-center">
              <Link to="/menu" className="text-sm text-primary underline">
                Order something else
              </Link>
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
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
