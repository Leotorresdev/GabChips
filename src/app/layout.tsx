import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GAB Chips · Snacks artesanales venezolanos",
  description:
    "Papitas fritas crujientes, recién hechas y sazonadas con recetas artesanales.",
  authors: [{ name: "GAB Chips" }],
  openGraph: {
    title: "GAB Chips · Snacks artesanales venezolanos",
    description:
      "Papitas fritas crujientes, recién hechas y sazonadas con recetas artesanales.",
    type: "website",
    locale: "es_VE",
  },
  twitter: {
    card: "summary_large_image",
    title: "GAB Chips · Snacks artesanales",
    description:
      "Papitas fritas crujientes, recién hechas y sazonadas con recetas artesanales.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
