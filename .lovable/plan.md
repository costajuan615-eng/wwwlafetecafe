# Guest order lookup finding: no code change needed

## What the scanner flagged

Guest orders (no account) are stored with a random `guest_token` and no database
access rule lets a guest read them directly. The scanner notes this is not a
vulnerability, just something to be careful about if a rule is added later.

## Why the current design is already correct

Guest receipt lookup never touches the database from the browser. The order
confirmation screen calls a trusted server routine that:

- looks up the order by the 32-character random token generated at checkout,
- returns only receipt fields (order number, name, phone, pickup time, status,
  totals, line items),
- returns nothing when the token doesn't match.

Adding a database-level "anyone with a matching token can read" rule would be
strictly worse: it would open the whole orders table to unauthenticated reads
filtered only by a client-supplied value. So the right resolution is to keep the
server-side path and record the decision.

## Proposed action

1. Mark the finding `orders_guest_token_no_policy` as intentional/ignored.
2. Record in the project security memory that:
   - guest order reads must stay in the trusted server routine keyed by
     `guest_token`;
   - no `anon` read policy may be added to `orders` or `order_items`;
   - guest tokens must remain server-generated, unguessable, and returned only
     to the checkout session that created the order.

No application code or database migration is required.

## Optional hardening (say the word and I'll include it)

- Add basic rate limiting / attempt throttling on the guest lookup routine.
- Trim the phone number out of the guest receipt response.
