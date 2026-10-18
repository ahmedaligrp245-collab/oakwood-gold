import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oakwood Advisory Group | Gold Edition",
  description:
    "Institutional-grade Forex & CFD trading platform. Trade major pairs, gold, indices and more with Oakwood Advisory Group – Gold Edition.",
  keywords: [
    "Forex",
    "CFD",
    "Trading",
    "Oakwood Advisory Group",
    "Gold Edition",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B1220] text-[#E2E8F0]">
        {children}
      </body>
    </html>
  );
}
