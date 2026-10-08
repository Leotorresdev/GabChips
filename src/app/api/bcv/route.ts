import { NextResponse } from "next/server";

// Cache en memoria para no saturar la API en cada petición (revalida cada 30 minutos)
let cachedRate: number | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutos

export async function GET() {
  const now = Date.now();

  // Retornar caché si aún está vigente
  if (cachedRate && now - lastFetchTime < CACHE_DURATION_MS) {
    return NextResponse.json({
      rate: cachedRate,
      source: "BCV Oficial",
      cached: true,
      lastUpdated: new Date(lastFetchTime).toISOString(),
    });
  }

  // 1. Intentar con DolarApi Venezuela (Especializada en tasa oficial BCV)
  try {
    const res = await fetch("https://ve.dolarapi.com/v1/dolares/oficial", {
      next: { revalidate: 1800 },
      headers: { "Accept": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      const rate = Number(data.promedio || data.venta || data.compra);
      if (rate && !isNaN(rate) && rate > 0) {
        cachedRate = Number(rate.toFixed(2));
        lastFetchTime = now;
        return NextResponse.json({
          rate: cachedRate,
          source: "BCV Oficial (dolarapi)",
          cached: false,
          lastUpdated: new Date(now).toISOString(),
        });
      }
    }
  } catch (err) {
    console.warn("Fallo primario al consultar dolarapi:", err);
  }

  // 2. Intentar con API de respaldo global (Open Exchange Rates VES)
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 1800 },
    });

    if (res.ok) {
      const data = await res.json();
      const rate = Number(data.rates?.VES);
      if (rate && !isNaN(rate) && rate > 0) {
        cachedRate = Number(rate.toFixed(2));
        lastFetchTime = now;
        return NextResponse.json({
          rate: cachedRate,
          source: "BCV Oficial (open-er)",
          cached: false,
          lastUpdated: new Date(now).toISOString(),
        });
      }
    }
  } catch (err) {
    console.warn("Fallo secundario al consultar open-er:", err);
  }

  // Fallback seguro en caso de corte total de internet externo
  const fallbackRate = cachedRate || 873.87;
  return NextResponse.json({
    rate: fallbackRate,
    source: "BCV Estimado (Fallback)",
    cached: true,
    lastUpdated: new Date(now).toISOString(),
  });
}
