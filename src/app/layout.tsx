import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BURSA PERİYODİK KONTROL — Periyodik Muayene ve Ölçüm",
  description: "Bursa merkezli periyodik kontrol: basınçlı kap, kaldırma ekipmanı, elektrik, yangın ve ortam ölçümleri. Yönetim panelinden güncellenebilir.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const content = getContent();
  return (
    <html lang="tr" className="h-full">
      <body
        className={`${display.variable} ${body.variable} flex min-h-full flex-col bg-white text-slate-900 antialiased`}
      >
        <Navbar
          siteName={content.siteName}
          phone={content.contact.phone}
          email={content.contact.email}
        />
        <main className="flex-1">{children}</main>
        <Footer
          siteName={content.siteName}
          slogan={content.slogan}
          footerText={content.footerText}
          email={content.contact.email}
          phone={content.contact.phone}
          address={content.contact.address}
          services={content.services.map((s) => s.title)}
        />
      </body>
    </html>
  );
}
