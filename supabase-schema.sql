-- ══════════════════════════════════════════
-- ELYVATE — Supabase Schema
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Categories ──────────────────────────────
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  image text,
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ── Products ────────────────────────────────
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  short_description text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  images text[] default '{}',
  category_id uuid references categories(id),
  stock int default 0,
  sku text unique,
  features text[] default '{}',
  specs jsonb default '{}',
  rating numeric(2,1) default 0,
  review_count int default 0,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── User Profiles ────────────────────────────
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  role text default 'customer',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── Orders ───────────────────────────────────
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  user_id uuid references auth.users(id),
  customer_email text not null,
  customer_name text not null,
  customer_phone text,
  subtotal numeric(10,2) not null,
  shipping_cost numeric(10,2) default 0,
  tax numeric(10,2) default 0,
  total numeric(10,2) not null,
  status text default 'pending',
  payment_status text default 'pending',
  shipping_address jsonb not null,
  tracking_number text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Order Items ──────────────────────────────
create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  product_image text,
  quantity int not null,
  price numeric(10,2) not null,
  total numeric(10,2) not null
);

-- ── Wishlist ─────────────────────────────────
create table if not exists wishlist (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

-- ── RLS Policies ─────────────────────────────
alter table profiles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table wishlist enable row level security;
alter table products enable row level security;
alter table categories enable row level security;

-- Products: public read
create policy "Products are viewable by everyone" on products for select using (true);
create policy "Categories are viewable by everyone" on categories for select using (true);

-- Profiles: users manage own
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Orders: users see own
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders" on orders for insert with check (auth.uid() = user_id);

-- Wishlist: users manage own
create policy "Users manage own wishlist" on wishlist for all using (auth.uid() = user_id);

-- ── Sample Data ──────────────────────────────
insert into categories (name, slug, display_order) values
  ('Projectors', 'projectors', 1),
  ('Lamps', 'lamps', 2),
  ('Accessories', 'accessories', 3)
on conflict (slug) do nothing;

insert into products (name, slug, description, short_description, price, original_price, stock, sku, rating, review_count, is_featured, is_active) values
  ('Astronaut Galaxy Projector', 'astronaut-galaxy-projector', 'Transform any room into a galaxy.', '8 galaxy modes · 360° rotation · Bluetooth speaker', 44.99, 64.99, 50, 'ELY-AGP-001', 4.9, 328, true, true),
  ('Sunset Projection Lamp', 'sunset-projection-lamp', 'Cast warm golden-hour light.', 'RGB gradients · 3 brightness · Touch control', 34.99, 49.99, 80, 'ELY-SPL-002', 4.7, 195, true, true),
  ('Levitating Moon Lamp', 'levitating-moon-lamp', 'Magnetic levitation moon lamp.', 'Magnetic levitation · Moon texture · Auto spin', 39.99, 59.99, 30, 'ELY-MNL-003', 4.8, 412, true, true)
on conflict (slug) do nothing;
