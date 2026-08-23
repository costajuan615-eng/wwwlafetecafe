import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { catalogById, computeTotals } from "@/lib/catalog";

const createOrderSchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  customerPhone: z.string().trim().min(7).max(30),
  customerEmail: z.string().trim().email().max(120).optional().or(z.literal("")),
  pickupType: z.enum(["asap", "scheduled"]),
  pickupAt: z.string().datetime(),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  lines: z
    .array(z.object({ id: z.string().min(1).max(200), qty: z.number().int().min(1).max(50) }))
    .min(1)
    .max(60),
});

export const createPickupOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createOrderSchema.parse(data))
  .handler(async ({ data }) => {
    const pickupAt = new Date(data.pickupAt);
    const now = Date.now();
    if (Number.isNaN(pickupAt.getTime())) throw new Error("Invalid pickup time.");
    if (pickupAt.getTime() < now - 10 * 60 * 1000) throw new Error("Pickup time is in the past.");
    if (pickupAt.getTime() > now + 8 * 24 * 60 * 60 * 1000)
      throw new Error("Pickup time is too far in the future.");

    const items = data.lines.map((line) => {
      const item = catalogById.get(line.id);
      if (!item) throw new Error(`Item no longer available: ${line.id}`);
      return {
        item_name: item.name,
        category: item.category,
        unit_price_cents: item.priceCents,
        quantity: line.qty,
        line_total_cents: item.priceCents * line.qty,
      };
    });

    const totals = computeTotals(items.reduce((s, i) => s + i.line_total_cents, 0));

    const orderNumber = `LF-${Math.floor(100000 + Math.random() * 900000)}`;
    const guestToken = crypto.randomUUID().replace(/-/g, "");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        guest_token: guestToken,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_email: data.customerEmail || null,
        pickup_type: data.pickupType,
        pickup_at: pickupAt.toISOString(),
        status: "confirmed",
        subtotal_cents: totals.subtotalCents,
        tax_cents: totals.taxCents,
        total_cents: totals.totalCents,
        notes: data.notes || null,
      })
      .select("id, order_number, guest_token")
      .single();

    if (error || !order) throw new Error("Could not place your order. Please call us instead.");

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(items.map((i) => ({ ...i, order_id: order.id })));

    if (itemsError) {
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      throw new Error("Could not save your order items. Please try again.");
    }

    return { orderNumber: order.order_number, token: order.guest_token };
  });

export const attachOrderToAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ token: z.string().min(10).max(64) }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("orders")
      .update({ user_id: context.userId })
      .eq("guest_token", data.token)
      .is("user_id", null);
    return { ok: true };
  });

export const getOrderByToken = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ token: z.string().min(10).max(64) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select(
        "order_number, customer_name, customer_phone, pickup_type, pickup_at, status, subtotal_cents, tax_cents, total_cents, notes, order_items(item_name, quantity, unit_price_cents, line_total_cents)",
      )
      .eq("guest_token", data.token)
      .maybeSingle();
    return order ?? null;
  });

export const getMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("orders")
      .select(
        "id, order_number, pickup_at, status, total_cents, created_at, order_items(item_name, quantity)",
      )
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(50);
    return data ?? [];
  });
