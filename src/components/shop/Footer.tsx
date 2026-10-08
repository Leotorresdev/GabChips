"use client";

import {
  Clock,
  Phone,
  MapPin,
  Smartphone,
  Truck,
  ShieldCheck,
  HeadphonesIcon,
  PackageOpen,
} from "lucide-react";

const socialIcons = [
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
];

const footerFeatures = [
  { icon: Truck, title: "ENTREGA RÁPIDA", desc: "Fresco y directo a tu puerta." },
  { icon: ShieldCheck, title: "PAGO SEGURO", desc: "Pagos seguros y sin problemas." },
  { icon: HeadphonesIcon, title: "SOPORTE EXPERTO", desc: "Estamos aquí para ayudarte." },
  { icon: PackageOpen, title: "GARANTÍA DE SABOR", desc: "¿No estás satisfecho? Lo solucionaremos." },
];

export function Footer() {
  return (
    <>
      {/* Footer Features Bar */}
      <section className="bg-[#fdfbf7] py-10 border-b border-[#e8e2d9]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {footerFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-start gap-3.5 bg-white sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-[#ede8dd] shadow-sm sm:shadow-none">
                <div className="text-[#f56d29] p-2 bg-[#f56d29]/10 rounded-xl shrink-0">
                  <Icon strokeWidth={2} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-[#111]">{f.title}</h4>
                  <p className="mt-1 text-xs text-[#666] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Footer */}
      <footer id="contacto" className="bg-[#1a1a1a] text-white/80">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 px-4 py-12 md:py-14 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-12 w-12 rounded-2xl overflow-hidden border border-white/20 shadow-md bg-[#e05819] shrink-0">
                <img
                  src="/images/logo-icon-square.jpg"
                  alt="GAB Chips Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tight leading-none uppercase">
                  GAB <span className="text-[#f56d29]">Chips</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Snacks Artesanales
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm max-w-xs text-[#aaa]">
              Snacks 100% artesanales: papas, plátano, yuca y chicharrón. Venta por
              docena.
            </p>
            <div className="mt-5 flex gap-3">
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#333] hover:bg-[#f56d29] hover:text-[#111] transition-colors"
                  aria-label="Red social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div id="nosotros">
            <h4 className="font-extrabold text-white">Horarios</h4>
            <ul className="mt-4 space-y-2 text-sm text-[#aaa]">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#f56d29]" /> Lun–Vie: 11:00 – 22:00
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#f56d29]" /> Sáb–Dom: 12:00 – 00:00
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm text-[#aaa]">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#f56d29]" /> 0412-5589074
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#f56d29]" /> Caracas, Venezuela
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-white">Pagos aceptados</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Pago Móvil", "Binance", "USDT", "Efectivo"].map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-1.5 rounded-lg bg-[#333] px-3 py-2 text-xs font-bold text-white"
                >
                  <Smartphone className="h-3.5 w-3.5 text-[#f56d29]" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-[#777]">
          © {new Date().getFullYear()} GAB Chips. Hecho en Venezuela con 🧡.
        </div>
      </footer>
    </>
  );
}
