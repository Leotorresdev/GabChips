// Teléfono oficial registrado para pedidos y atención al cliente por WhatsApp
export const OFFICIAL_WHATSAPP_NUMBER = 
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "584244493286";

export type OrderWhatsAppDetails = {
  orderRef?: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryType: "delivery" | "nacional" | "pickup";
  deliveryInfo: {
    street?: string;
    number?: string;
    reference?: string;
    phone?: string;
    state?: string;
    city?: string;
    agency?: string;
    agencyAddress?: string;
    idNumber?: string;
    receiverName?: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    variant?: string;
  }>;
  totalUsd: number;
  totalVes: number;
  rateBcv?: number;
  paymentMethod?: string;
  paymentRef?: string;
};

/**
 * Genera el mensaje formateado y el enlace directo hacia WhatsApp
 */
export function buildOrderWhatsAppUrl(details: OrderWhatsAppDetails): string {
  const {
    orderRef,
    customerName,
    customerPhone,
    deliveryType,
    deliveryInfo,
    items,
    totalUsd,
    totalVes,
    rateBcv,
    paymentRef,
  } = details;

  let deliverySection = "";

  if (deliveryType === "nacional") {
    deliverySection = `📦 *ENVÍO NACIONAL (A OTRO ESTADO)*
📍 *Estado:* ${deliveryInfo.state || "No especificado"}
🏙️ *Ciudad:* ${deliveryInfo.city || "No especificado"}
🏢 *Empresa/Agencia:* ${deliveryInfo.agency || "MRW / Zoom / Tealca"}
📍 *Dirección/Sede:* ${deliveryInfo.agencyAddress || "No especificado"}
🪪 *Cédula/RIF:* ${deliveryInfo.idNumber || "No especificado"}
👤 *Retira:* ${deliveryInfo.receiverName || customerName}
📞 *Teléfono Destino:* ${deliveryInfo.phone || customerPhone || "No especificado"}`;
  } else if (deliveryType === "delivery") {
    deliverySection = `🛵 *DELIVERY LOCAL (CARACAS)*
📍 *Calle/Av:* ${deliveryInfo.street || "No especificado"}
🏠 *Edif/Casa:* ${deliveryInfo.number || "No especificado"}
🧭 *Referencia:* ${deliveryInfo.reference || "Ninguna"}
📞 *Teléfono:* ${deliveryInfo.phone || customerPhone || "No especificado"}`;
  } else {
    deliverySection = `🏬 *RETIRO EN TIENDA (CARACAS)*
📍 Retiro presencial por el cliente en sede Caracas.`;
  }

  const itemsList = items
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`
    )
    .join("\n");

  const lines = [
    `🍟 *NUEVO PEDIDO · GAB CHIPS* 🍟`,
    orderRef ? `🧾 *Referencia:* #${orderRef}` : `🧾 *Pedido Web*`,
    `━━━━━━━━━━━━━━━━━━`,
    `👤 *Cliente:* ${customerName}`,
    customerPhone ? `📞 *Contacto:* ${customerPhone}` : null,
    `━━━━━━━━━━━━━━━━━━`,
    deliverySection,
    `━━━━━━━━━━━━━━━━━━`,
    `🛍️ *PRODUCTOS:*`,
    itemsList || "• Sin productos",
    `━━━━━━━━━━━━━━━━━━`,
    `💰 *TOTAL A PAGAR:*`,
    `💵 *$${totalUsd.toFixed(2)} USD*`,
    `🇻🇪 *Bs. ${totalVes.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*`,
    rateBcv ? `📊 *Tasa BCV:* Bs. ${rateBcv.toFixed(2)}` : null,
    paymentRef ? `🏦 *Ref. Pago Móvil:* ${paymentRef}` : null,
    `━━━━━━━━━━━━━━━━━━`,
    `_Hola GAB Chips, les comparto los datos de mi pedido y dirección para coordinar el despacho._`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
}
