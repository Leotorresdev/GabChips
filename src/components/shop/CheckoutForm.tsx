"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Loader2,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  Building2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { useUser } from "@/store/user";
import { useBcv } from "@/hooks/useBcv";

// Datos oficiales BNC de la empresa GAB Chips
const DATOS_EMPRESA = [
  { label: "Banco Receptor", value: "0191 · Banco Nacional de Crédito (BNC)" },
  { label: "RIF de la Empresa", value: "J-505151452" },
  { label: "Teléfono", value: "0412-5589074" },
  { label: "Cuenta Corriente", value: "0191-0261-16-2100074044" },
  { label: "Beneficiario", value: "EMPRENDIMIENTO GABRIEL GARCIA 11" },
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, deliveryType, deliveryInfo, clear } = useCart();
  const { isLoggedIn, name: userName, email: userEmail, login } = useUser();
  const { rate: tasaBcv, loading: loadingRate } = useBcv();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Datos personales del cliente
  const [customerName, setCustomerName] = useState(userName || "");
  const [customerEmail, setCustomerEmail] = useState(userEmail || "");

  // Campos de verificación de Pago
  const [referenceNumber, setReferenceNumber] = useState("");
  const [payerPhone, setPayerPhone] = useState("");

  // Cálculo de montos con tasa BCV en vivo
  const baseTotal = subtotal();
  const totalUsd = isLoggedIn ? baseTotal * 0.8 : baseTotal;
  const totalVes = totalUsd * tasaBcv;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (items.length === 0) {
      setErrorMessage("Tu carrito está vacío. Agrega productos para continuar.");
      return;
    }

    if (!customerName.trim() || !customerEmail.trim()) {
      setErrorMessage("Por favor ingresa tu nombre y correo electrónico.");
      return;
    }

    if (!referenceNumber.trim() || referenceNumber.trim().length < 4) {
      setErrorMessage("Por favor ingresa el número de referencia de tu pago (mínimo 4 a 6 dígitos).");
      return;
    }

    setLoading(true);

    try {
      // Enviar solicitud segura a la API de backend de BNC
      const res = await fetch("/api/bnc/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "p2p",
          amountUsd: totalUsd,
          amountVes: totalVes,
          rateBcv: tasaBcv,
          customer: {
            name: customerName,
            email: customerEmail,
          },
          delivery: {
            type: deliveryType,
            ...deliveryInfo,
          },
          paymentData: {
            reference: referenceNumber.trim(),
            phone: payerPhone.trim(),
          },
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            quantity: i.quantity,
            price: i.price,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(
          data.error || "No se pudo verificar el pago. Por favor revisa los datos e intenta nuevamente."
        );
        setLoading(false);
        return;
      }

      // Pago Aprobado:
      login(customerName, customerEmail, totalUsd);
      clear();

      const queryParams = new URLSearchParams({
        ref: data.reference || "BNC-SUCCESS",
        amount: totalUsd.toFixed(2),
        ves: totalVes.toFixed(2),
        method: "p2p",
      });

      router.push(`/success?${queryParams.toString()}`);
    } catch (err) {
      console.error("Error al procesar el pago:", err);
      setErrorMessage("Ocurrió un problema de comunicación al verificar tu pago. Por favor reintenta.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      {/* Sección 2: Tus Datos de Cliente */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e2d9]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black uppercase tracking-tight text-[#111]">
            2. Tus Datos
          </h3>
          {isLoggedIn && (
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
              20% OFF Aplicado
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">
              Nombre y Apellido
            </span>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="mt-1.5 w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#f56d29] focus:ring-4 focus:ring-[#f56d29]/10 font-bold text-[#111]"
            />
          </label>

          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">
              Correo Electrónico
            </span>
            <input
              type="email"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="mt-1.5 w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3.5 text-sm outline-none transition-colors focus:border-[#f56d29] focus:ring-4 focus:ring-[#f56d29]/10 font-bold text-[#111]"
            />
          </label>
        </div>
      </div>

      {/* Sección 3: Métodos de Pago */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e2d9]">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-black uppercase tracking-tight text-[#111]">
            3. Métodos de Pago
          </h3>
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" /> Pago Seguro BNC
          </span>
        </div>
        <p className="text-xs text-[#666] font-medium mb-6">
          Realiza tu pago a los datos oficiales de la empresa e ingresa el número de referencia para verificar tu pedido automáticamente.
        </p>

        {/* Resumen del Monto Oficial */}
        <div className="rounded-2xl bg-[#fdfbf7] border border-[#e8e2d9] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#888] block">
              Monto Total a Pagar
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-[#111]">
                Bs. {totalVes.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-bold text-[#888]">
                (${totalUsd.toFixed(2)} USD)
              </span>
            </div>
          </div>
          <div className="text-left sm:text-right sm:border-l sm:pl-4 border-[#e8e2d9] w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#999] block flex items-center sm:justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Tasa Oficial BCV {loadingRate ? "(Cargando...)" : "(En Vivo)"}
            </span>
            <span className="text-xs font-black text-[#f56d29]">
              Bs. {tasaBcv.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / USD
            </span>
          </div>
        </div>

        {/* Datos de la Empresa */}
        <div className="mt-6 grid gap-4">
          <div className="rounded-2xl border border-[#e8e2d9] bg-[#fdfbf7] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-[#f56d29] shrink-0" />
              <span className="text-xs font-extrabold uppercase tracking-wide text-[#111]">
                Datos de la Empresa
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {DATOS_EMPRESA.map((d) => (
                <div
                  key={d.label}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#ece8dd] last:border-0 gap-1 sm:gap-2"
                >
                  <span className="text-[#666] font-medium text-[11px] sm:text-xs shrink-0">
                    {d.label}:
                  </span>
                  <div className="flex items-center justify-between sm:justify-end gap-2 min-w-0">
                    <span className="font-extrabold text-[#111] text-xs break-all sm:break-normal">
                      {d.value}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(d.value.replace(/[^0-9J\-]/gi, "") || d.value, d.label)
                      }
                      className="p-1.5 rounded-lg bg-gray-100 sm:bg-transparent hover:bg-gray-200 transition-colors text-gray-600 hover:text-black cursor-pointer shrink-0"
                      title="Copiar dato"
                    >
                      {copiedField === d.label ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888] mb-1.5">
                Número de Referencia Bancaria
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                placeholder="Ej: 849201 (6 dígitos)"
                value={referenceNumber}
                onChange={(e) =>
                  setReferenceNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3.5 text-sm font-bold text-[#111] outline-none focus:border-[#f56d29] focus:ring-4 focus:ring-[#f56d29]/10"
              />
              <span className="text-[10px] text-[#888] font-medium mt-1 block">
                Los números que te arroja tu banco al finalizar el pago.
              </span>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888] mb-1.5">
                Teléfono desde el que pagaste (opcional)
              </label>
              <input
                type="tel"
                placeholder="04121234567"
                value={payerPhone}
                onChange={(e) =>
                  setPayerPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
                }
                className="w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3.5 text-sm font-bold text-[#111] outline-none focus:border-[#f56d29] focus:ring-4 focus:ring-[#f56d29]/10"
              />
              <span className="text-[10px] text-[#888] font-medium mt-1 block">
                Para agilizar la verificación en cuenta BNC.
              </span>
            </div>
          </div>
        </div>

        {/* Alerta de Error si la transacción es rechazada */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-xs font-semibold"
            >
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block mb-0.5">No se pudo completar la verificación</span>
                <span>{errorMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón de Acción Principal */}
        <button
          type="submit"
          disabled={loading || items.length === 0}
          className="mt-8 w-full rounded-2xl bg-[#f56d29] hover:bg-[#e05819] py-4 px-6 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verificando tu pago en BNC...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>Verificar Pago y Confirmar Orden</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-[#888] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verificación Bancaria Inmediata · Comercio BNC J-505151452</span>
        </div>
      </div>
    </form>
  );
}
