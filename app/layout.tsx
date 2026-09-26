import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.veelogg.com"),
  title: { default: "Brand Strategy & AI Marketing Systems | Veelogg", template: "%s" },
  description: "Brand and marketing strategy, creative direction and AI systems for founder-led SaaS, product companies and agencies. By Varnika Chabria, Brand & Marketing Engineer and Strategist.",
  keywords: ["brand strategy", "marketing systems", "AI marketing", "brand and marketing engineer", "product marketing systems", "agency content workflows", "AI content", "creative direction", "product storytelling", "AI mentorship", "SaaS marketing", "Varnika Chabria", "Veelogg"],
  authors: [{ name: "Varnika Chabria", url: "https://www.veelogg.com/about" }],
  creator: "Varnika Chabria",
  publisher: "Veelogg",
  applicationName: "Veelogg",
  alternates: { canonical: "https://www.veelogg.com" },
  robots: { index: true, follow: true },
  openGraph: { title: "Brand Strategy & AI Marketing Systems | Veelogg", description: "Brand and marketing strategy, creative direction and AI systems for founder-led SaaS, product companies and agencies.", url: "https://www.veelogg.com", siteName: "Veelogg", type: "website", locale: "en_US", images: [{ url: "/assets/og.png", width: 1200, height: 630, alt: "Veelogg, brand & marketing strategy built into AI" }] },
  twitter: { card: "summary_large_image", title: "Brand Strategy & AI Marketing Systems | Veelogg", description: "Strategy, creative direction and AI systems for SaaS, product companies and agencies.", images: ["/assets/og.png"] },
  icons: {
    icon: "/assets/apple-touch-icon.png",
    shortcut: "/assets/apple-touch-icon.png",
    apple: "/assets/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
