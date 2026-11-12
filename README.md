# SHAKIL STORE

Premium, minimal, mobile-first Bangla + English storefront for a mixed-product Bangladesh ecommerce shop.

## Current storefront

- Responsive premium storefront with bilingual brand copy
- Product categories, search, sorting, product cards and wishlist
- Cart quantity controls with stock-limit checks and browser-local persistence
- BDT pricing and mobile-first layout
- Checkout preview clearly indicates that live order processing is not yet enabled

## Preview / deployment

The project is a static HTML storefront at the repository root. Render Static Site is the intended preview host. Connect this repository's `main` branch and publish the repository root (no build command required).

## Important: backend not yet connected

This commit improves the customer-facing storefront only. It is **not yet a production-ready ecommerce system**:
- Cart and wishlist are stored in the visitor's browser.
- Checkout does not create orders or collect personal/payment details.
- No database-backed product catalogue, secure admin, stock reservation, customer accounts, courier booking/tracking, or live payment integration is connected.
- bKash and Nagad are payment options planned for an authorized merchant integration; never treat manual transaction references as paid without server-side/admin verification.
- Do not enter real customer, personal, or payment information in this preview.

The existing Supabase project must be restored and configured before backend work can be safely applied. Before accepting real orders, implement server-side validation, RLS-protected data access, admin authorization, atomic stock reservation, order status history, payment verification and approved courier/payment integrations.

Never expose Supabase service-role keys or payment secrets in browser code. Use host-managed environment variables and server-side endpoints.
