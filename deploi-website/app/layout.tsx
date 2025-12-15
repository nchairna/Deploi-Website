import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Deploi",
  description: "Deploi",
  icons: {
    icon: [
      {
        url: "/Deploi Icon.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/Deploi Icon Black.svg",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} font-outfit antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
