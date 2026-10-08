"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ShopChrome } from "@/components/shop/ShopChrome";
import { DeliveryToggle } from "@/components/shop/DeliveryToggle";
import { CheckoutForm } from "@/components/shop/CheckoutForm";

export default function CheckoutPage() {
  return (
    <ShopChrome>
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-16 md:px-8 md:pt-36 md:pb-28 bg-[#fdfbf7] min-h-screen">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#888] hover:text-[#f56d29] transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Volver a la tienda
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-4xl font-black uppercase tracking-tight text-[#111] md:text-5xl"
        >
          Finaliza tu <span className="text-[#f56d29]">pedido</span>
        </motion.h1>
        <p className="mt-4 text-sm font-medium text-[#555]">
          Estás a un paso del mejor crunch artesanal de tu vida.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 items-start">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <DeliveryToggle />
          </motion.section>
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CheckoutForm />
          </motion.section>
        </div>
      </div>
    </ShopChrome>
  );
}
