-- ==============================================================
-- GAB Chips: Migración para Soporte de Username y Contraseñas
-- Ejecutar en el SQL Editor de tu proyecto en Supabase (https://supabase.com/dashboard)
-- ==============================================================

-- 1. Agregar columna 'username' única
ALTER TABLE clientes 
ADD COLUMN IF NOT EXISTS username text;

-- Crear índice único insensible a mayúsculas/minúsculas para evitar nombres de usuario duplicados
CREATE UNIQUE INDEX IF NOT EXISTS clientes_username_idx 
ON clientes (LOWER(username));

-- 2. Agregar columna 'password' para contraseñas personalizadas
ALTER TABLE clientes 
ADD COLUMN IF NOT EXISTS password text;

-- 3. (Opcional) Columnas adicionales para perfil y ubicación
ALTER TABLE clientes 
ADD COLUMN IF NOT EXISTS telefono text;

ALTER TABLE clientes 
ADD COLUMN IF NOT EXISTS estado text;

-- Notificar éxito
COMMENT ON TABLE clientes IS 'Tabla oficial de clientes de GAB Chips con ranking y credenciales';
