"use client";

import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";

/**
 * Layout compartido por las 3 páginas del shop:
 * Header fijo + contenido + Footer + drawer del carrito.
 */
export function ShopChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
