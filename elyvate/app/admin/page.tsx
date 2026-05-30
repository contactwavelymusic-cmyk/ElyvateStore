"use client";
import { useState } from "react";

const orders = [
  { id: "ELY-1042", customer: "John Doe", email: "john@example.com", items: "Galaxy Projector × 1, Moon Lamp × 1", total: 84.98, status: "Pending", date: "May 30, 2026", address: "123 Main St, New York, USA" },
  { id: "ELY-1041", customer: "Sara Khan", email: "sara@example.com", items: "Sunset Lamp × 2", total: 69.98, status: "Shipped", date: "May 29, 2026", address: "45 Queen St, London, UK" },
  { id: "ELY-1040", customer: "Lee Park", email: "lee@example.com", items: "Galaxy Projector × 1", total: 44.99, status: "Delivered", date: "May 28, 2026", address: "77 Park Rd, Seoul, Korea" },
];

const statusColor: Record<string, string> = {
  Pending: "#c9a84c",
  Shipped: "#6b7ff0",
  Delivered: "#a8c4a0",
  Cancelled: "#e84a4a",
};

const stats = [
  { label: "Total Orders", value: "3", icon: "📦" },
  { label: "Revenue", value: "$199.95", icon: "💰" },
  { label: "Customers", value: "3", icon: "👥" },
  { label: "Pending", value: "1", icon: "⏳" },
];

type Tab = "orders" | "products" | "customers";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("orders");
  const [selected, setSelected] = useState<(typeof orders)[0] | null>(null);
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(orders.map(o => [o.id, o.status]))
  );

  const updateStatus = (id: string, s: string) => setStatuses(prev => ({ ...prev, [id]: s }));

  return (
    <main className="min-h-screen bg-[#080808] pt-20">
      {/* Sidebar + Content */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-56 border-r border-[rgba(201,168,76,0.08)] pt-8 px-4 hidden md:block">
          <p className="text-[9px] uppercase tracking-widest text-white/20 mb-4 px-2">Admin Panel</p>
          {(["orders", "products", "customers"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`w-full text-left px-3 py-2.5 text-xs uppercase tracking-widest mb-1 transition-all ${
                tab === t
                  ? "text-[#c9a84c] bg-[rgba(201,168,76,0.06)] border-l-2 border-[#c9a84c]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {t === "orders" ? "📦 " : t === "products" ? "🛍️ " : "👥 "}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </aside>

        {/* Main */}
        <div className="flex-1 p-6 md:p-10">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map(s => (
              <div key={s.label} className="card-dark p-5">
                <p className="text-2xl mb-2">{s.icon}</p>
                <p className="text-xl font-black text-[#c9a84c]">{s.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Orders Tab */}
          {tab === "orders" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
              <div className="space-y-3">
                {orders.map(o => (
                  <div key={o.id} className="card-dark p-5 cursor-pointer" onClick={() => setSelected(o)}>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <p className="font-bold text-sm">{o.id}</p>
                        <p className="text-white/40 text-xs">{o.customer} · {o.date}</p>
                        <p className="text-white/30 text-xs mt-1">{o.items}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <select
                          value={statuses[o.id]}
                          onChange={e => { e.stopPropagation(); updateStatus(o.id, e.target.value); }}
                          className="bg-[#111] border border-[rgba(255,255,255,0.1)] text-white/70 text-[10px] uppercase tracking-widest px-3 py-2 outline-none"
                          onClick={e => e.stopPropagation()}
                        >
                          {["Pending", "Shipped", "Delivered", "Cancelled"].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <span style={{ color: statusColor[statuses[o.id]] }} className="font-bold text-sm min-w-[60px] text-right">
                          ${o.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Tab */}
          {tab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Products</h2>
                <button className="btn-gold text-[10px] py-2 px-4">+ Add Product</button>
              </div>
              {[
                { name: "Astronaut Galaxy Projector", price: 44.99, stock: 50, emoji: "🌌" },
                { name: "Sunset Projection Lamp", price: 34.99, stock: 80, emoji: "🌅" },
                { name: "Levitating Moon Lamp", price: 39.99, stock: 30, emoji: "🌙" },
              ].map(p => (
                <div key={p.name} className="card-dark p-5 flex items-center gap-4 mb-3">
                  <span className="text-3xl">{p.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-white/40 text-xs">Stock: {p.stock} units</p>
                  </div>
                  <span className="text-[#c9a84c] font-bold">${p.price}</span>
                  <div className="flex gap-2">
                    <button className="btn-outline text-[9px] py-1 px-3">Edit</button>
                    <button className="text-[9px] uppercase tracking-widest px-3 py-1 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">Del</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Customers Tab */}
          {tab === "customers" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Customers</h2>
              {[
                { name: "John Doe", email: "john@example.com", orders: 2, spent: "$84.98", joined: "May 2026" },
                { name: "Sara Khan", email: "sara@example.com", orders: 1, spent: "$69.98", joined: "May 2026" },
                { name: "Lee Park", email: "lee@example.com", orders: 1, spent: "$44.99", joined: "May 2026" },
              ].map(c => (
                <div key={c.email} className="card-dark p-5 flex items-center gap-4 mb-3 flex-wrap">
                  <div className="w-10 h-10 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-[#c9a84c] font-bold text-sm flex-shrink-0">
                    {c.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{c.name}</p>
                    <p className="text-white/40 text-xs">{c.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#c9a84c] font-bold text-sm">{c.spent}</p>
                    <p className="text-white/30 text-xs">{c.orders} order{c.orders > 1 ? "s" : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelected(null)}>
          <div className="bg-[#111] border border-[rgba(201,168,76,0.15)] p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#c9a84c] mb-1">Order Details</p>
                <h3 className="text-xl font-bold">{selected.id}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white text-2xl">×</button>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["Customer", selected.customer],
                ["Email", selected.email],
                ["Date", selected.date],
                ["Items", selected.items],
                ["Ship To", selected.address],
                ["Total", `$${selected.total.toFixed(2)}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[rgba(255,255,255,0.05)] pb-2">
                  <span className="text-white/40">{k}</span>
                  <span className="text-white/80 text-right max-w-[60%]">{v}</span>
                </div>
              ))}
            </div>
            <button className="btn-gold w-full mt-6 text-xs">
              📦 Forward to Supplier
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
