# SHAKIL STORE — Next.js + Supabase

Premium, mobile-first Bangladesh ecommerce storefront. Original SHAKIL STORE identity with clean neutral surfaces and warm orange accents. Inspired by familiar ecommerce usability patterns; no copied Cellbun assets or copy.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS
- Supabase Auth, PostgreSQL, Row Level Security and Storage
- Render Node.js web service

## Supabase project

- Project: `shakil-store`
- Ref: `ehqjzirfzbuyevqcecnm`
- Region: `ap-southeast-1`
- URL: `https://ehqjzirfzbuyevqcecnm.supabase.co`

## Local setup

1. Install Node.js 20 or later.
2. Copy `.env.example` to `.env.local`.
3. Set the Supabase URL and publishable key.
4. Run `npm install`.
5. Run `npm run dev`.
6. Visit `http://localhost:3000`.

## Environment

```env
NEXT_PUBLIC_SUPABASE_URL=https://ehqjzirfzbuyevqcecnm.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-key>
# Optional server-only secret; never commit it and never prefix it NEXT_PUBLIC_.
SUPABASE_SERVICE_ROLE_KEY=
```

The publishable key is intended for browser use with RLS. Never expose the service-role key or payment credentials to the client or Git.

## Implemented foundation

- Database: 20 public tables covering profiles, admins, categories, products, product images, addresses, carts, cart items, orders, order items, order status history, payments, deliveries, stock reservations, coupons, coupon redemptions, reviews, wishlists, banners and website settings.
- RLS enabled on all public tables; customer rows are scoped to their account and admin authorization is checked against the protected `admins` table.
- Product image Storage bucket with public read and admin-only write.
- Account sign-up/sign-in for email/password and phone OTP UI (SMS provider still needs configuration).
- Live published product/category listing, search, product details, multiple image gallery, specifications, ratings, reviews and related products.
- Cart persistence for signed-in users and server-side order creation via a database transaction.
- Server-calculated prices, coupon discount, delivery charge, stock reservations, unique order ID and scheduled expiry for abandoned reservations.
- Account order list, manual bKash/Nagad transaction submission, COD, order tracking by order ID + registered phone.
- Admin dashboard for products, multiple image uploads, stock, categories, orders, statuses, manual payment verification, courier tracking, reviews, coupons, banners, customer profiles and delivery charge settings.
- FAQ, store policies, SEO metadata, sitemap, robots and 404 page.

## Important setup before production

1. Configure Auth email confirmation and production SMTP in Supabase.
2. Configure an SMS provider for phone OTP; provider message costs may apply.
3. Register the owner account with verified email, then grant that account the `admin` role in `public.admins` through a trusted database session. Do not expose admin insertion to customers.
4. Set a real default delivery charge from `/admin` before checkout is enabled.
5. Add genuine products, categories, prices, stock and product photos.
6. Confirm the displayed manual payment number and payment network. Manual mobile payments remain pending until an admin verifies the transaction ID.
7. Use authorized bKash/Nagad merchant credentials and server-side callbacks only if automatic payments are later enabled.
8. Test order status transitions, stock concurrency, expiry, cancellation/returns, review eligibility, RLS and admin authorization.
9. Configure official courier API credentials only when accounts and integration access are available.
10. Connect a custom domain, SMTP, legal policies, analytics, monitoring and backups.

## Deployment on Render

Create a Node.js Web Service from this repository's `main` branch:
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Region: Singapore
- Plan: Free for initial preview (may sleep when idle)
- Environment: add the two `NEXT_PUBLIC_SUPABASE_*` values using Render's environment settings.

The existing Render Static Site serves the old HTML preview. It does not run Next.js. The new Node Web Service must be created and tested before replacing the old public URL.

## Current launch status

This is a substantial connected application foundation, but not yet production-ready until the Render Node service is deployed, the first admin account is authorized, real products and delivery charges are configured, email/SMS providers are set, and the end-to-end checkout is tested. Do not accept real orders on an unverified deployment.
