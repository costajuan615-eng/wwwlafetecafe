# Online Pickup Ordering for La Fête Cafe

Add a full pickup-only ordering flow: browse the menu, add items to a cart, choose an ASAP or scheduled pickup time, and pay by card online. No delivery anywhere in the flow.

## What customers will experience

1. **Add to cart from the menu** — every menu row gets a quantity stepper / "Add" button. A floating cart button shows item count and subtotal.
2. **Cart drawer** — review items, change quantities, remove, add order notes, see subtotal, tax, and total. Clear "Pickup only — no delivery" labeling.
3. **Checkout page (`/order`)** — collects name, phone, email, and pickup time:
   - **ASAP** (ready in ~25 min), or
   - **Schedule** a slot on a future day/time, limited to business hours in 15-minute increments.
   - Optional: sign in to prefill details and save the order to their history; guests can order without an account.
4. **Card payment** — customer is sent to a secure hosted checkout to pay, then returns to a confirmation page.
5. **Confirmation page (`/order/confirmed`)** — order number, pickup time, itemized receipt, cafe address and phone.
6. **Optional account area (`/account/orders`)** — signed-in customers see their past orders and status.

Orders are stored in the backend. No staff dashboard will be built (per your answer); orders are queryable in the backend data view.

## Setup this requires

- **Lovable Cloud** enabled — the database for orders, plus optional customer logins.
- **Stripe payments** enabled (built-in, no Stripe account needed to start). It begins in test mode so you can place fake orders; going live needs a quick account claim.
- Because this is prepared food sold for on-site pickup, Stripe will be configured with tax calculation and collection only — Stripe computes and collects tax at checkout, you handle filing/remittance.

## Technical outline

**Data model (Cloud/Postgres, RLS enabled, grants included)**
- `orders` — id, human order number, `user_id` (nullable for guests), customer name/phone/email, `pickup_type` (`asap` | `scheduled`), `pickup_at`, `status` (`pending_payment` | `paid` | `preparing` | `ready` | `picked_up` | `cancelled`), subtotal/tax/total cents, `stripe_session_id`, notes, timestamps.
- `order_items` — order_id, item name, unit price cents, quantity, line total.
- Policies: users select their own orders (`auth.uid() = user_id`); inserts/writes happen server-side via service role after payment verification. No anon read access; guests get their confirmation via a one-time opaque token in the confirmation URL.

**Menu pricing**
- Add a numeric `priceCents` to each item in `src/data/menu.ts` (derived from existing strings) so totals are computed from trusted server-side data, never from client-submitted prices. The server re-prices the cart by item id before creating the payment session.

**Cart**
- `src/lib/cart.tsx` — React context + `localStorage` persistence, add/remove/update/clear, derived totals.
- `src/components/CartButton.tsx`, `src/components/CartDrawer.tsx`.
- `MenuRow` in `src/routes/menu.tsx` gains an add-to-cart control; homepage signature cards too.

**Server functions** (`src/lib/orders.functions.ts`)
- `createPickupOrder` — validates cart + pickup time with Zod, re-prices from the server menu, validates the slot against business hours, inserts `orders`/`order_items` as `pending_payment`, creates a Stripe Checkout session, returns the URL.
- `getOrderByToken` / `getMyOrders` — confirmation lookup and account history.

**Webhook** (`src/routes/api/public/stripe-webhook.ts`)
- Verifies the Stripe signature, marks the order `paid` on `checkout.session.completed`, and expires unpaid orders.

**Routes**
- `/order` — checkout form (public, SSR-safe, own `head()` metadata).
- `/order/confirmed` — confirmation via token query param.
- `/account/orders` — under `_authenticated/`.
- Header gains a cart entry point; footer/menu copy states pickup only.

**Business hours**
- Pickup slots come from a single hours config in `src/data/menu.ts` (currently `Mon 7:00 AM – 9:00 PM`). Confirm your full weekly hours and lead time before launch; I'll seed reasonable defaults and they're easy to edit.

## Out of scope

- Delivery, tipping, promo codes, loyalty, SMS notifications, and a staff-facing order screen. Any of these can be added later.
