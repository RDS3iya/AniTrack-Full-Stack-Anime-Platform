# 🎬 AniTrack — Full-Stack Anime Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
</p>

<p align="center">
  <strong>Plataforma web Full-Stack para explorar anime, reproducir episodios y gestionar el historial de visualización en tiempo real para usuarios autenticados.</strong>
</p>

---

## 📌 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura de la Base de Datos](#-arquitectura-de-la-base-de-datos)
- [Instalación y Configuración](#-instalación-y-configuración-local)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Autor](#-autor)

---

## ✨ Características Principales

- 🔐 **Autenticación y Seguridad:** Registro e inicio de sesión con encriptación de contraseñas y sesiones gestionadas mediante JSON Web Tokens (JWT).
- 📺 **Catálogo y Búsqueda:** Exploración interactiva de series de anime con detalles de género, año de estreno y estado.
- ▶️ **Reproductor de Episodios:** Vista dedicada para streaming de episodios con navegación secuencial.
- 🕒 **Historial Persistente:** Registro y sincronización en tiempo real del progreso de episodios visualizados por cada usuario.
- 📱 **Diseño Responsivo:** Interfaz moderna y adaptable a dispositivos móviles y escritorio desarrollada con CSS modular.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router DOM, Context API, CSS3 Moderno |
| **Backend** | Node.js (ES Modules), Express.js, REST API Architecture |
| **Base de Datos & ORM** | PostgreSQL, Prisma ORM (Migraciones y Seeds) |
| **Seguridad** | JWT (`jsonwebtoken`), Hashing (`bcryptjs`), Middlewares de Autorización |

---

## 🗄️ Arquitectura de la Base de Datos

El esquema relacional implementado con Prisma ORM cuenta con las siguientes entidades principales:

```
[ User ] 1 ───< N [ WatchHistory ] >─── 1 [ Episode ] >─── 1 [ Anime ]
```

- **User:** Información de cuentas de usuario y credenciales cifradas.
- **Anime:** Catálogo general (título, descripción, portada, género, año).
- **Episode:** Episodios asociados a cada título con sus URLs de transmisión.
- **WatchHistory:** Registro relacional del último minuto y episodio visto por cada usuario.

---

## 🚀 Instalación y Configuración Local

### Prerrequisitos
- **Node.js** 20.x o superior
- **PostgreSQL** 15.x o superior

### 1. Clonar el repositorio
```bash
git clone https://github.com/RDS3iya/Proyectos.git
cd Proyectos
```

### 2. Configurar el Backend (`server`)
```bash
cd server
npm install
```

Crea un archivo `.env` en la carpeta `server/` tomando como base `.env.example`:
```env
PORT=4000
DATABASE_URL="postgresql://usuario:password@localhost:5432/anitrack_db?schema=public"
JWT_SECRET="tu_clave_secreta_super_segura"
```

Ejecuta las migraciones y pobla la base de datos con datos de prueba:
```bash
npx prisma migrate dev --name init
npm run seed
```

Inicia el servidor de desarrollo:
```bash
npm run dev
```

### 3. Configurar el Frontend (`client`)
En una nueva terminal:
```bash
cd client
npm install
npm run dev
```

Abre tu navegador en `http://localhost:5173`.

---

## 📁 Estructura del Proyecto

```text
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── context/        # Estado global (AuthContext)
│   │   ├── pages/          # Vistas (Home, Library, WatchEpisode, Auth, etc.)
│   │   ├── services/       # Cliente HTTP y llamadas a la API
│   │   └── styles.css      # Estilos globales de la aplicación
│   └── vite.config.js
│
├── server/                 # Backend (Node.js + Express + Prisma)
│   ├── prisma/             # Schema relacional, migraciones y seed data
│   ├── src/
│   │   ├── middleware/     # Protección de rutas con JWT
│   │   ├── routes/         # Endpoints (auth, anime, history)
│   │   └── app.js          # Configuración del servidor Express
│   └── package.json
└── README.md
```

---

## 👨‍💻 Autor

**Julián Josué Pimentel Almonte**  
- 🎓 Estudiante de Seguridad Informática en **ITLA**
- 💼 LinkedIn: [Julian Josue Pimentel.A](www.linkedin.com/in/julian-josue-pimentel-almonte-4654a7403)
- 🐙 GitHub: [@RDS3iya](https://github.com/RDS3iya)
- 📧 Contacto: julianjosuebti@gmail.com
