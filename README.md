# SHAKIL STORE

Premium, minimal, mobile-first Bangladesh ecommerce storefront (Bangla + English).

## Product direction

Use the general ecommerce UX patterns of a premium Bangladesh store: clear category navigation, searchable product catalogue, product details with verified ratings/reviews, cart, account-required checkout, order tracking, and a role-protected admin dashboard. The visual identity remains original to SHAKIL STORE (warm orange accent, clean neutral surfaces, Bricolage Grotesque + DM Sans).

## Current repository state

- `index.html` is still the original static storefront preview.
- It currently uses demo products and browser-local cart/wishlist state.
- The current Render deployment is a static preview, not a production checkout.
- Do not collect real customer/payment data on the preview.

## Supabase backend provisioned

Project:
- Name: `shakil-store`
- Project ref: `ehqjzirfzbuyevqcecnm`
- Region: `ap-southeast-1` (Singapore)
- API URL: `https://ehqjzirfzbuyevqcecnm.supabase.co`

Database foundation is created directly in the hosted project:
- 20 public tables for profiles, admins, catalogue, product images, addresses, carts, orders, order items, order status history, payments, deliveries, stock reservations, coupons, coupon redemptions, reviews, wishlists, banners and public settings.
- RLS is enabled on every public table.
- Admin authorization uses a protected `admins` table and a private-schema authorization helper.
- Public product reads are restricted to published products; private order/customer data is owner-scoped.
- Product image Storage bucket: `product-images` (public read, admin-only writes).
- Order placement is represented by a server-safe database transaction function. It recalculates prices from the live catalogue, checks available stock, creates order/payment records, reserves stock and consumes a coupon atomically.
- Manual bKash/Nagad transaction references remain `pending_verification`; only an admin can mark them paid.
- Verified-purchase reviews are limited to delivered orders and remain unapproved until moderation.

Security Advisor was checked after setup and returned no findings.

## Required application environment

Use these names in the hosting provider's environment settings (never commit actual secrets):

```env
NEXT_PUBLIC_SUPABASE_URL=https://ehqjzirfzbuyevqcecnm.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<Supabase publishable key>
SUPABASE_SERVICE_ROLE_KEY=<server-only secret; never NEXT_PUBLIC_>
```

The publishable key is safe for a browser only when paired with RLS. The service-role key must stay server-side and must never be added to browser code or Git.

## Still required before accepting real orders

1. Replace the static preview with a Next.js application and server-side routes/actions.
2. Configure email/password Auth, email confirmation and a custom SMTP provider for reliable production mail.
3. Configure an SMS provider before enabling phone OTP. Phone-number/password login needs extra account-recovery safeguards because phone numbers can be recycled.
4. Create the owner's customer account, then grant the admin role to that exact Auth user ID through a controlled one-time setup.
5. Set actual delivery charges and public store settings before checkout can place orders.
6. Configure the bKash/Nagad merchant details and test manual transaction verification; never auto-mark manual payments as paid.
7. Add an approved merchant payment API only if automatic payment collection is later required.
8. Configure courier account access and test manual booking/tracking before any courier API integration.
9. Add real products, stock and images; do not publish placeholder ratings or fabricated reviews.
10. Test auth, RLS, checkout, stock race conditions, cancellation/returns, payment verification, admin access and mobile UX before production launch.
11. Connect the production domain, SMTP, privacy/terms/returns/shipping policies, SEO metadata, sitemap and monitoring.

## Security notes

- Never expose Supabase service-role/secret keys or payment credentials in client code.
- Do not trust client-submitted prices, totals, stock or payment status.
- All order totals must be recomputed from database prices on the server.
- Manual payment transactions must remain pending until verified by an authorized admin.
- Admin status must never be derived from user-editable profile metadata.
