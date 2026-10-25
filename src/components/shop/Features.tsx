"use client";

import { motion } from "framer-motion";
import { Tractor, Truck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Tractor,
    title: "100% Cosecha Propia",
    desc: "Cultivadas en tierras altas con rotación natural. Cero pesticidas químicos y recolección manual.",
  },
  {
    icon: Truck,
    title: "Envíos a Nivel Nacional",
    desc: "Despacho seguro a todos los estados del país a través de agencias MRW y ZOOM.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía 100% Crujiente",
    desc: "Empaque bien sellado para que lleguen frescas y súper crujientes a tus manos.",
  },
];

export function Features() {
  return (
    <section className="bg-[#fdfbf7] px-4 md:px-8 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="bg-[#f5f3ec] rounded-2xl py-10 px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-[#e8e4d8]">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex gap-4 items-start ${i !== 0 ? "md:pl-10 pt-8 md:pt-0" : ""}`}
              >
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-[#f56d29]">
                  <Icon strokeWidth={2} size={18} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#111] mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[#666] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
