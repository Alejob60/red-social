# Red Social - Proyecto Full Stack con Microservicios

Este proyecto es una red social desarrollada bajo una arquitectura de microservicios usando NestJS para el backend y React para el frontend. Se gestiona mediante docker-compose para facilitar el despliegue y la ejecución de todos los servicios de forma conjunta.

## Estructura del proyecto

```
red-social/
├── backend/
│   ├── auth-service/      # Servicio de autenticación (NestJS)
│   ├── user-service/      # Gestión de usuarios (NestJS)
│   └── post-service/      # Gestión de publicaciones (NestJS)
├── frontend/              # Aplicación web (React)
├── docker-compose.yml     # Orquestador de servicios
├── .gitignore
└── README.md
```

## Tecnologías utilizadas

- NestJS (con TypeORM)
- React + Vite
- Node.js
- PostgreSQL
- Docker & Docker Compose

## Requisitos previos

Asegúrate de tener instalados en tu máquina:

- Node.js (v18 o superior)
- Docker
- Docker Compose

## Instalación y ejecución

### 1. Clona el repositorio

```
git clone https://github.com/Alejob60/red-social.git
cd red-social
```

### 2. Copia los archivos .env

Cada microservicio puede requerir un archivo `.env`. Asegúrate de crear los siguientes archivos según el ejemplo:

#### backend/auth-service/.env

```
PORT=3001
JWT_SECRET=your_jwt_secret
DATABASE_URL=postgres://auth_user:password@db-auth:5432/auth_db
```

Repite esto para user-service y post-service con sus respectivas configuraciones de base de datos.

### 3. Ejecutar todo con Docker Compose

```
docker-compose up --build
```

Esto levantará:

- Las bases de datos PostgreSQL
- Los tres microservicios
- El frontend en React

### 4. Accede a la aplicación

Una vez que todos los contenedores estén en ejecución:

- Frontend (React): http://localhost:5173
- Auth Service (NestJS): http://localhost:3001
- User Service: http://localhost:3002
- Post Service: http://localhost:3003

## Contacto

Desarrollado por Alejandro B.
GitHub: https://github.com/Alejob60

## TODOs futuros

- Documentación Swagger para cada servicio
- Pruebas unitarias con Jest
- Despliegue en Azure / Vercel
- Autenticación con OAuth 2.0

## Licencia

Este proyecto está bajo la licencia MIT.
Libre de usar, modificar y compartir con fines educativos o comerciales.
