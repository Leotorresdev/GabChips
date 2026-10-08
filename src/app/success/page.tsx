import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessView } from "./success-view";

export const metadata: Metadata = {
  title: "¡Pedido confirmado! · GAB Chips",
  description: "Tu pedido está en camino.",
  openGraph: {
    title: "¡Pedido confirmado! · GAB Chips",
    description: "Tus papitas van en camino.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "¡Pedido confirmado! · GAB Chips",
    description: "Tus papitas van en camino.",
  },
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfbf7]" />}>
      <SuccessView />
    </Suspense>
  );
}
