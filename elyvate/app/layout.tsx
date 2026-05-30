import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Elyvate — Elevate Your Space",
  description: "Premium galaxy projectors, sunset lamps & levitating moon lamps. Transform your room into a universe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.variable} ${geistMono.variable} bg-[#080808] text-white antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
