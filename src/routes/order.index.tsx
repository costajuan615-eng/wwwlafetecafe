import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart } from "@/lib/cart";
import { catalogById, formatCents } from "@/lib/catalog";
import { info } from "@/data/menu";
import { createPickupOrder } from "@/lib/orders.functions";
import {
  LEAD_MINUTES,
  formatDayLabel,
  formatTime,
  nextAsapTime,
  slotsForDay,
  upcomingDays,
} from "@/lib/pickup";

export const Route = createFileRoute("/order/")({
  head: () => ({
    meta: [
      { title: "Order Pickup — La Fête Cafe" },
      {
        name: "description",
        content:
          "Order La Fête Cafe brunch, tacos and entrees online for pickup on N. Zaragoza in El Paso. Choose ASAP or schedule a time.",
      },
      { property: "og:title", content: "Order Pickup — La Fête Cafe" },
      {
        property: "og:description",
        content: "Place a pickup order from La Fête Cafe. No delivery — pick up hot and fresh.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/order" }],
  }),
  component: OrderPage,
});

function OrderPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const submitOrder = useServerFn(createPickupOrder);

  const now = useMemo(() => new Date(), []);
  const days = useMemo(() => upcomingDays(now), [now]);

  const [pickupType, setPickupType] = useState<"asap" | "scheduled">("asap");
  const [dayIndex, setDayIndex] = useState(0);
  const [slot, setSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const slots = useMemo(
    () => (days[dayIndex] ? slotsForDay(days[dayIndex], now) : []),
    [days, dayIndex, now],
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (cart.count === 0) {
      setError("Your cart is empty.");
      return;
    }
    const pickupAt = pickupType === "asap" ? nextAsapTime(new Date()) : slot ? new Date(slot) : null;
    if (!pickupAt) {
      setError("Pick a pickup time.");
      return;
    }

    setBusy(true);
    try {
      const result = await submitOrder({
        data: {
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          pickupType,
          pickupAt: pickupAt.toISOString(),
          notes,
          lines: cart.lines,
        },
      });
      cart.clear();
      navigate({ to: "/order/confirmed", search: { token: result.token } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-5 py-14 text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Pickup only — no delivery
          </div>
          <h1 className="mt-3 text-4xl md:text-6xl">Order ahead</h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Pay when you pick up at {info.address}. Most orders are ready in about {LEAD_MINUTES}{" "}
            minutes.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 md:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="mb-3 text-2xl">Pickup time</legend>
            <div className="flex gap-2">
              <TypeButton active={pickupType === "asap"} onClick={() => setPickupType("asap")}>
                ASAP (~{LEAD_MINUTES} min)
              </TypeButton>
              <TypeButton
                active={pickupType === "scheduled"}
                onClick={() => setPickupType("scheduled")}
              >
                Schedule
              </TypeButton>
            </div>

            {pickupType === "scheduled" && (
              <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                <div className="flex flex-wrap gap-2">
                  {days.map((d, i) => (
                    <button
                      key={d.toISOString()}
                      type="button"
                      onClick={() => {
                        setDayIndex(i);
                        setSlot("");
                      }}
                      className={
                        "rounded-full border px-3 py-1.5 text-xs uppercase tracking-wider transition-colors " +
                        (i === dayIndex
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary")
                      }
                    >
                      {formatDayLabel(d, now)}
                    </button>
                  ))}
                </div>
                {slots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No pickup times left for this day — try another.
                  </p>
                ) : (
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Choose a time…</option>
                    {slots.map((s) => (
                      <option key={s.toISOString()} value={s.toISOString()}>
                        {formatTime(s)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-3 text-2xl">Your details</legend>
            <Field label="Name" value={name} onChange={setName} required autoComplete="name" />
            <Field
              label="Phone"
              value={phone}
              onChange={setPhone}
              required
              type="tel"
              autoComplete="tel"
            />
            <Field
              label="Email (optional)"
              value={email}
              onChange={setEmail}
              type="email"
              autoComplete="email"
            />
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Order notes (optional)</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                maxLength={500}
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
                placeholder="Allergies, no onions, extra sauce…"
              />
            </label>
          </fieldset>

          {error && (
            <p role="alert" className="rounded border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || cart.count === 0}
            className="w-full rounded bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? "Placing order…" : `Place pickup order · ${formatCents(cart.totalCents)}`}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            You pay in store when you pick up. We'll call {info.phone} if we need anything.
          </p>
        </form>

        <aside className="h-fit rounded-lg border border-border bg-card p-5 md:sticky md:top-24">
          <h2 className="mb-4 text-xl">Order summary</h2>
          {cart.count === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing in your cart yet.{" "}
              <Link to="/menu" className="text-primary underline">
                Browse the menu
              </Link>
              .
            </p>
          ) : (
            <>
              <ul className="space-y-2 text-sm">
                {cart.lines.map((line) => {
                  const item = catalogById.get(line.id);
                  if (!item) return null;
                  return (
                    <li key={line.id} className="flex justify-between gap-3">
                      <span className="min-w-0 truncate">
                        {line.qty}× {item.name}
                      </span>
                      <span className="tabular-nums text-muted-foreground">
                        {formatCents(item.priceCents * line.qty)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatCents(cart.subtotalCents)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated tax</span>
                  <span className="tabular-nums">{formatCents(cart.taxCents)}</span>
                </div>
                <div className="flex justify-between pt-1 font-semibold">
                  <span>Total</span>
                  <span className="font-display text-primary tabular-nums">
                    {formatCents(cart.totalCents)}
                  </span>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>

      <SiteFooter />
    </div>
  );
}

function TypeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex-1 rounded border px-4 py-3 text-sm font-medium transition-colors " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:border-primary")
      }
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-border bg-background px-3 py-2 text-sm"
      />
    </label>
  );
}
