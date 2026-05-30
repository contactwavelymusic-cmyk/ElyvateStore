# Elyvate 🌌

Premium ambient lighting store — Galaxy Projectors, Sunset Lamps & Levitating Moon Lamps.

## Stack
- **Next.js 15** (App Router + Turbopack)
- **Tailwind CSS v4**
- **TypeScript**
- **Supabase** (Database + Auth — connect later)
- **Resend** (Email notifications — connect later)
- **2Checkout** (Payments — connect later)
- **Vercel** (Deployment)

## Get Started in GitHub Codespaces

### 1. Install dependencies
```bash
npm install
```

### 2. Run dev server
```bash
npm run dev
```
Open http://localhost:3000

### 3. Pages Available
| Route | Page |
|---|---|
| `/` | Homepage (Hero video + CTA) |
| `/products` | Product listing |
| `/products/1` | Product detail |
| `/cart` | Shopping cart |
| `/auth/signup` | Sign up + email verify |
| `/auth/login` | Login |
| `/account` | Customer account + orders |
| `/admin` | Admin panel |

### 4. Deploy to Vercel
```bash
npm run build
```
Push to GitHub → connect repo to Vercel → auto deploy!

## Next Steps (connect later)
- [ ] Supabase: add `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Resend: add `RESEND_API_KEY` for email notifications to elyvate.business@gmail.com
- [ ] 2Checkout: add payment keys for checkout
- [ ] Replace emoji placeholders with real product images

## Folder Structure
```
elyvate/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── products/
│   │   ├── page.tsx          # Product listing
│   │   └── [id]/page.tsx     # Product detail
│   ├── cart/page.tsx         # Cart
│   ├── auth/
│   │   ├── login/page.tsx    # Login
│   │   └── signup/page.tsx   # Signup + OTP verify
│   ├── account/page.tsx      # Customer account
│   └── admin/page.tsx        # Admin panel
└── components/
    └── Navbar.tsx            # Navigation
```
