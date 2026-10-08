"use client";

import { useState, useEffect } from "react";

export function useBcv() {
  const [rate, setRate] = useState<number>(873.87);
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<string>("Cargando...");

  useEffect(() => {
    let isMounted = true;

    async function fetchRate() {
      try {
        const res = await fetch("/api/bcv");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.rate && !isNaN(data.rate)) {
            setRate(Number(data.rate));
            setSource(data.source || "BCV Oficial");
          }
        }
      } catch (err) {
        console.warn("Aviso al obtener tasa BCV:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRate();

    return () => {
      isMounted = false;
    };
  }, []);

  return { rate, loading, source };
}
