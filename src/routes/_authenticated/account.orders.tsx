import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatCents } from "@/lib/catalog";
import { formatPickupStamp } from "@/lib/pickup";
import { getMyOrders } from "@/lib/orders.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/account/orders")({
  head: () => ({
    meta: [
      { title: "My Orders — La Fête Cafe" },
      {
        name: "description",
        content: "Review your past La Fête Cafe pickup orders and reorder your favorites.",
      },
      { property: "og:title", content: "My Orders — La Fête Cafe" },
      { property: "og:description", content: "Your La Fête Cafe pickup order history." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const fetchOrders = useServerFn(getMyOrders);
  const { data, isLoading } = useQuery({ queryKey: ["my-orders"], queryFn: () => fetchOrders({}) });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-16">
        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl">Your orders</h1>
          <button
            type="button"
            onClick={() => supabase.auth.signOut().then(() => window.location.assign("/"))}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>

        {isLoading ? (
          <p className="mt-8 text-muted-foreground">Loading…</p>
        ) : !data || data.length === 0 ? (
          <p className="mt-8 text-muted-foreground">
            No orders yet.{" "}
            <Link to="/menu" className="text-primary underline">
              Start an order
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {data.map((order) => (
              <li key={order.id} className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold">{order.order_number}</span>
                  <span className="font-display text-primary tabular-nums">
                    {formatCents(order.total_cents)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pickup {formatPickupStamp(order.pickup_at)} · {order.status}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {order.order_items?.map((i) => `${i.quantity}× ${i.item_name}`).join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
