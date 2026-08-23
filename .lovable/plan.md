# Rename the ASAP pickup tab to "Pickup today"

## Change
In `src/routes/order.index.tsx` (line 123), change the ASAP pickup button label from:

```
ASAP (~{LEAD_MINUTES} min)
```

to:

```
Pickup today
```

No other logic changes — the button still sets `pickupType` to `"asap"` and the order still uses `nextAsapTime()` (now + 25 min lead time) for the actual pickup time. The lead-time messaging elsewhere on the page ("Most orders are ready in about {LEAD_MINUTES} minutes") stays as-is, so customers still know the wait.

## Files touched
- `src/routes/order.index.tsx` — one-line label edit only.
