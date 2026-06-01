# Elyvate — Phase 1 Complete 🚀

Premium e-commerce store — Galaxy Projectors, Sunset Lamps & Moon Lamps.

---

## Stack
- **Next.js 15** (App Router + Turbopack)
- **TypeScript** + **Tailwind CSS v4**
- **Supabase** (Auth + Database)
- **Emerald Dark/Light theme system**

---

## Quick Start (GitHub Codespaces)

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your values
cp .env.example .env.local

# 3. Run dev server
npm run dev
```

Open http://localhost:3000

---

## Environment Variables (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=admin@elyvate.com
ADMIN_PASSWORD=Elyvate@Admin2025!
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

---

## Supabase Setup

1. Go to your Supabase project → SQL Editor
2. Paste and run `supabase-schema.sql`
3. Done — tables, RLS, sample data all created

---

## Pages

| Route | Page |
|---|---|
| `/` | Homepage |
| `/shop` | Products + filters |
| `/products/[slug]` | Product detail |
| `/collections` | Collections |
| `/cart` | Shopping cart |
| `/checkout` | Multi-step checkout |
| `/wishlist` | Wishlist |
| `/auth/login` | Login (Supabase) |
| `/auth/register` | Register + verify |
| `/auth/forgot-password` | Password reset |
| `/account/profile` | User profile |
| `/account/orders` | Order history |
| `/about` | About |
| `/contact` | Contact |
| `/faq` | FAQ |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin dashboard |
| `/admin/products` | Product management |
| `/admin/orders` | Order management |
| `/admin/customers` | Customer list |
| `/admin/settings` | Settings |

---

## Admin Access

URL: `/admin/login`
Default credentials (set in env):
- Email: `admin@elyvate.com`
- Password: `Elyvate@Admin2025!`

---

## Deploy to Vercel

```bash
npm run build   # verify builds
git add .
git commit -m "Phase 1 complete"
git push
```

Vercel auto-deploys on push. Add env vars in Vercel dashboard.

---

## Phase 2 (pending approval)
- [ ] Admin CRUD with Supabase
- [ ] Real order management + email (Resend)
- [ ] 2Checkout payment integration
- [ ] Analytics dashboard
- [ ] Performance optimization
- [ ] Security hardening
