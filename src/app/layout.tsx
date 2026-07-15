import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-racing",
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Le Mans AutoWorks | Endurance-Built Automotive Craft",
  description:
    "Le Mans AutoWorks is a modern automotive garage and service center inspired by 24 Hours of Le Mans endurance racing — precision repair, race-grade tuning, and cars built to go the distance.",
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('lm-theme');
    var theme = stored ? stored : 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${orbitron.variable} ${inter.variable} bg-bg text-text font-[family-name:var(--font-body)] antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
        <FloatingDock />
      </body>
    </html>
  );
}
