"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [step, setStep] = useState<"form" | "verify">("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep("verify");
  };

  const handleVerify = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    window.location.href = "/account";
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="text-2xl font-black tracking-[0.15em] uppercase gold-text">Elyvate</span>
          <p className="text-white/30 text-xs mt-1 uppercase tracking-widest">Create Account</p>
        </div>

        <div className="card-dark p-8">
          {step === "form" ? (
            <>
              <h2 className="text-xl font-bold mb-1">Join Elyvate</h2>
              <p className="text-white/40 text-sm mb-8">Create your account to start shopping</p>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Full Name</label>
                  <input name="name" value={form.name} onChange={handle} placeholder="John Doe" className="input-dark" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handle} placeholder="john@example.com" className="input-dark" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Phone Number</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handle} placeholder="+1 234 567 8900" className="input-dark" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Password</label>
                  <input name="password" type="password" value={form.password} onChange={handle} placeholder="••••••••" className="input-dark" />
                </div>
              </div>

              <button onClick={handleSubmit} disabled={loading} className="btn-gold w-full mt-8 flex items-center justify-center gap-2">
                {loading ? <Spinner /> : "Create Account →"}
              </button>

              <p className="text-center text-white/30 text-xs mt-6">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#c9a84c] hover:underline">Sign in</Link>
              </p>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-full border border-[#c9a84c] flex items-center justify-center mx-auto mb-4 text-2xl">📧</div>
                <h2 className="text-xl font-bold mb-2">Verify Your Email</h2>
                <p className="text-white/40 text-sm">We sent a 6-digit code to<br /><span className="text-white/70">{form.email}</span></p>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Verification Code</label>
                <input
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="input-dark text-center text-2xl tracking-[0.5em] font-mono"
                />
              </div>

              <button onClick={handleVerify} disabled={loading} className="btn-gold w-full mt-6 flex items-center justify-center gap-2">
                {loading ? <Spinner /> : "Verify & Continue →"}
              </button>

              <button onClick={() => setStep("form")} className="w-full mt-3 text-center text-white/30 text-xs hover:text-white/60 transition-colors">
                ← Back
              </button>
            </>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          By creating an account you agree to our Terms & Privacy Policy
        </p>
      </div>
    </main>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
