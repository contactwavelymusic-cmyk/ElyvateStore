"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    window.location.href = "/account";
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-2xl font-black tracking-[0.15em] uppercase gold-text">Elyvate</span>
          <p className="text-white/30 text-xs mt-1 uppercase tracking-widest">Sign In</p>
        </div>

        <div className="card-dark p-8">
          <h2 className="text-xl font-bold mb-1">Welcome Back</h2>
          <p className="text-white/40 text-sm mb-8">Sign in to your account</p>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handle} placeholder="john@example.com" className="input-dark" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Password</label>
              <input name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" className="input-dark" />
            </div>
          </div>

          <div className="flex justify-end mt-3 mb-6">
            <button className="text-xs text-[#c9a84c] hover:underline">Forgot password?</button>
          </div>

          <button onClick={handleLogin} disabled={loading} className="btn-gold w-full flex items-center justify-center gap-2">
            {loading
              ? <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
              : "Sign In →"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[rgba(255,255,255,0.06)]" /></div>
            <div className="relative flex justify-center"><span className="bg-[#161616] px-4 text-white/20 text-xs">or</span></div>
          </div>

          {/* Admin shortcut */}
          <Link href="/admin" className="btn-outline w-full text-center block text-[10px]">
            Admin Panel →
          </Link>

          <p className="text-center text-white/30 text-xs mt-6">
            No account?{" "}
            <Link href="/auth/signup" className="text-[#c9a84c] hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
