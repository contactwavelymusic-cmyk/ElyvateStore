"use client";
import { useState } from "react";
import Link from "next/link";

const orders = [
  { id: "ELY-1042", date: "May 28, 2026", status: "Shipped", total: 84.98, items: ["Astronaut Galaxy Projector", "Levitating Moon Lamp"], tracking: "CJ202605281042" },
  { id: "ELY-0987", date: "May 10, 2026", status: "Delivered", total: 34.99, items: ["Sunset Projection Lamp"], tracking: "CJ202605100987" },
];

const statusColor: Record<string, string> = {
  Shipped: "#6b7ff0",
  Delivered: "#a8c4a0",
  Processing: "#c9a84c",
  Cancelled: "#e84a4a",
};

export default function AccountPage() {
  const [tab, setTab] = useState<"orders" | "profile">("orders");

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c9a84c] mb-2">My Account</p>
            <h1 className="text-4xl font-black" style={{ letterSpacing: "-0.02em" }}>
              Hello, <span className="gold-text">John</span>
            </h1>
          </div>
          <button className="btn-outline text-[10px] py-2 px-4">Sign Out</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-10 border-b border-[rgba(255,255,255,0.06)]">
          {(["orders", "profile"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[10px] uppercase tracking-widest px-5 py-3 transition-all border-b-2 -mb-px ${
                tab === t
                  ? "border-[#c9a84c] text-[#c9a84c]"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {tab === "orders" && (
          <div className="space-y-4">
            {orders.map(o => (
              <div key={o.id} className="card-dark p-6">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <p className="text-xs text-white/30 mb-1">{o.date}</p>
                    <p className="font-bold text-lg">{o.id}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[9px] uppercase tracking-widest px-3 py-1 border"
                      style={{ borderColor: statusColor[o.status], color: statusColor[o.status], background: `${statusColor[o.status]}15` }}
                    >
                      {o.status}
                    </span>
                    <span className="text-[#c9a84c] font-bold">${o.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t border-[rgba(255,255,255,0.05)] pt-4">
                  <p className="text-white/40 text-xs mb-2">Items: {o.items.join(", ")}</p>
                  <p className="text-white/30 text-xs">
                    Tracking: <span className="text-white/60 font-mono">{o.tracking}</span>
                  </p>
                </div>
              </div>
            ))}

            {orders.length === 0 && (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">📦</p>
                <p className="text-white/40 mb-6">No orders yet</p>
                <Link href="/products" className="btn-gold">Start Shopping</Link>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {tab === "profile" && (
          <div className="card-dark p-8 max-w-lg">
            <h2 className="text-lg font-bold mb-6">Profile Details</h2>
            <div className="space-y-4">
              {[
                { label: "Full Name", value: "John Doe", name: "name" },
                { label: "Email Address", value: "john@example.com", name: "email" },
                { label: "Phone Number", value: "+1 234 567 8900", name: "phone" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">{f.label}</label>
                  <input defaultValue={f.value} className="input-dark" />
                </div>
              ))}
              <button className="btn-gold mt-4">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
