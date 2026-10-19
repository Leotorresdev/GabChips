import { supabase } from "./supabase";

export type CustomerProfile = {
  id?: string;
  nombre: string;
  username: string;
  correo: string;
  total_comprado: number;
};

/**
 * Normaliza nombres de usuario para que sean limpios, seguros y únicos (sin espacios ni caracteres especiales raros)
 */
export function sanitizeUsername(username: string): string {
  return username
    .trim()
    .toLowerCase()
    .replace(/^@/, "")
    .replace(/[^a-z0-9_.-]/g, "");
}

/**
 * Registra un nuevo usuario en Supabase con correo, nombre de usuario único y contraseña personalizada.
 */
export async function registerCustomer(params: {
  nombre: string;
  username: string;
  correo: string;
  password: string;
}): Promise<CustomerProfile> {
  const cleanUsername = sanitizeUsername(params.username);
  const cleanEmail = params.correo.trim().toLowerCase();
  const cleanName = params.nombre.trim() || cleanUsername;
  const cleanPassword = params.password.trim();

  if (!cleanUsername || cleanUsername.length < 3) {
    throw new Error("El nombre de usuario debe tener al menos 3 caracteres.");
  }
  if (!cleanPassword || cleanPassword.length < 4) {
    throw new Error("La contraseña debe tener al menos 4 caracteres.");
  }
  if (!cleanEmail.includes("@")) {
    throw new Error("Ingresa un correo electrónico válido.");
  }

  // 1. Verificar si el correo o nombre de usuario ya existen en la base de datos
  try {
    // Intentar buscar con columna username si existe
    const { data: existingWithUsername } = await supabase
      .from("clientes")
      .select("*")
      .or(`username.eq.${cleanUsername},correo.eq.${cleanEmail}`)
      .limit(1);

    if (existingWithUsername && existingWithUsername.length > 0) {
      const match = existingWithUsername[0];
      if (match.correo?.toLowerCase() === cleanEmail) {
        throw new Error(`El correo "${cleanEmail}" ya está registrado. Inicia sesión con tu cuenta.`);
      }
      if (match.username?.toLowerCase() === cleanUsername) {
        throw new Error(`El nombre de usuario "@${cleanUsername}" ya está en uso. Por favor elige otro.`);
      }
    }
  } catch (err: any) {
    // Si la columna username aún no existe en la base de datos de Supabase, verificamos por correo y nombre
    if (err.message && (err.message.includes("username") || err.message.includes("column"))) {
      const { data: existingLegacy } = await supabase
        .from("clientes")
        .select("*")
        .or(`correo.eq.${cleanEmail},nombre.ilike.%${cleanUsername}%`)
        .limit(1);

      if (existingLegacy && existingLegacy.length > 0) {
        const match = existingLegacy[0];
        if (match.correo?.toLowerCase() === cleanEmail) {
          throw new Error(`El correo "${cleanEmail}" ya está registrado. Inicia sesión con tu cuenta.`);
        }
        if (match.nombre?.toLowerCase().includes(cleanUsername)) {
          throw new Error(`El nombre de usuario "@${cleanUsername}" ya está en uso. Por favor elige otro.`);
        }
      }
    } else if (err.message && err.message.includes("ya está")) {
      throw err;
    }
  }

  // 2. Intentar inserción con las columnas oficiales username y password
  try {
    const { data: inserted, error: insertErr } = await supabase
      .from("clientes")
      .insert([
        {
          nombre: cleanName,
          username: cleanUsername,
          password: cleanPassword,
          correo: cleanEmail,
          total_comprado: 0,
        },
      ])
      .select()
      .single();

    if (!insertErr && inserted) {
      return {
        id: inserted.id,
        nombre: inserted.nombre || cleanName,
        username: inserted.username || cleanUsername,
        correo: inserted.correo || cleanEmail,
        total_comprado: Number(inserted.total_comprado || 0),
      };
    }

    // Si falló por falta de columnas en Supabase, usar inserción fallback
    if (insertErr && (insertErr.message.includes("column") || insertErr.code === "PGRST204")) {
      const fallbackNombre = `${cleanName} (@${cleanUsername})`;
      const { data: fallbackInserted, error: fallbackErr } = await supabase
        .from("clientes")
        .insert([
          {
            nombre: fallbackNombre,
            correo: cleanEmail,
            total_comprado: 0,
          },
        ])
        .select()
        .single();

      if (fallbackErr) {
        throw new Error(`No se pudo completar el registro: ${fallbackErr.message}`);
      }

      // Guardar localmente para fallback de contraseña si la columna no existe
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(`gab_pwd_${cleanUsername}`, cleanPassword);
          localStorage.setItem(`gab_pwd_${cleanEmail}`, cleanPassword);
        } catch {
          // ignore
        }
      }

      return {
        id: fallbackInserted?.id,
        nombre: cleanName,
        username: cleanUsername,
        correo: cleanEmail,
        total_comprado: 0,
      };
    }

    if (insertErr) {
      throw new Error(insertErr.message);
    }
  } catch (err: any) {
    if (err.message && err.message.includes("ya está")) throw err;
    throw new Error(err.message || "Error al registrar en la base de datos.");
  }

  return {
    nombre: cleanName,
    username: cleanUsername,
    correo: cleanEmail,
    total_comprado: 0,
  };
}

/**
 * Autentica al usuario usando su nombre de usuario (o correo) y su contraseña.
 */
export async function authenticateCustomer(params: {
  usernameOrEmail: string;
  password?: string;
}): Promise<CustomerProfile> {
  const cleanInput = params.usernameOrEmail.trim();
  const cleanPassword = params.password?.trim() || "";

  if (!cleanInput) {
    throw new Error("Ingresa tu nombre de usuario o correo.");
  }

  const cleanUser = sanitizeUsername(cleanInput);
  const cleanEmail = cleanInput.toLowerCase();

  let client: any = null;

  // 1. Intentar buscar por columna 'username' o 'correo'
  try {
    const { data: found } = await supabase
      .from("clientes")
      .select("*")
      .or(`username.eq.${cleanUser},correo.eq.${cleanEmail}`)
      .limit(1);

    if (found && found.length > 0) {
      client = found[0];
    }
  } catch {
    // Fallback si la columna username no existe en el schema cache
  }

  // 2. Si no se encontró por columna username, buscar por correo o nombre
  if (!client) {
    const { data: fallbackFound } = await supabase
      .from("clientes")
      .select("*")
      .or(`correo.eq.${cleanEmail},nombre.ilike.%${cleanUser}%`)
      .order("total_comprado", { ascending: false })
      .limit(1);

    if (fallbackFound && fallbackFound.length > 0) {
      client = fallbackFound[0];
    }
  }

  if (!client) {
    throw new Error(
      `No se encontró ninguna cuenta registrada como "${cleanInput}". Por favor regístrate para ingresar.`
    );
  }

  // 3. Verificación de Contraseña
  if (client.password) {
    // Si la base de datos tiene la contraseña guardada
    if (cleanPassword && client.password !== cleanPassword) {
      throw new Error("Contraseña incorrecta. Por favor intenta de nuevo.");
    }
  } else if (typeof window !== "undefined") {
    // Fallback local si se guardó en local storage
    const localPwd =
      localStorage.getItem(`gab_pwd_${cleanUser}`) ||
      localStorage.getItem(`gab_pwd_${cleanEmail}`);

    if (localPwd && cleanPassword && localPwd !== cleanPassword) {
      throw new Error("Contraseña incorrecta. Por favor intenta de nuevo.");
    }
  }

  // Extraer el username limpio
  const extractedUsername =
    client.username ||
    (client.nombre?.includes("@")
      ? client.nombre.match(/@([a-zA-Z0-9_.-]+)/)?.[1]
      : sanitizeUsername(client.nombre || cleanInput)) ||
    cleanUser;

  return {
    id: client.id,
    nombre: client.nombre ? client.nombre.replace(/\s*\(@.*?\)/, "").trim() : cleanInput,
    username: extractedUsername,
    correo: client.correo || "",
    total_comprado: Number(client.total_comprado || 0),
  };
}
