# Anime Platform

Aplicación web para explorar anime, reproducir episodios con licencia y guardar el progreso de usuarios autenticados.

## Requisitos

- Node.js 20+
- PostgreSQL 15+

## Inicio rápido

1. Copia `server/.env.example` a `server/.env` y completa `DATABASE_URL` y `JWT_SECRET`.
2. Crea la base de datos indicada en `DATABASE_URL`.
3. Ejecuta `npm install` en `server` y en `client`.
4. En `server`, ejecuta `npx prisma migrate dev --name init` y después `npm run dev`.
5. En `client`, ejecuta `npm run dev`.

La API queda en `http://localhost:4000` y el cliente en `http://localhost:5173`.

> Solo configura URLs de vídeo de proveedores autorizados.
