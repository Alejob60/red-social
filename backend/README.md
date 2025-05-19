# Prueba Técnica - Red Social (Backend Microservicios)

Este proyecto implementa el backend de una red social básica utilizando microservicios, arquitectura limpia (Clean Architecture), JWT y PostgreSQL.

---

## Estructura del Proyecto

- **auth-service:** Gestiona el registro y autenticación de usuarios.
- **user-service:** Permite obtener el perfil del usuario autenticado.
- **post-service:** Permite crear publicaciones, listar el feed y dar "likes".
- **auth-db:** Base de datos PostgreSQL compartida entre los servicios.

Todos los servicios se ejecutan en contenedores Docker definidos mediante `docker-compose`.

---

## Tecnologías Utilizadas

- Node.js + NestJS
- PostgreSQL
- TypeORM
- JWT para autenticación
- Docker y Docker Compose

---

## Requisitos Previos

- Docker y Docker Compose instalados en el sistema

---

## Instalación y Ejecución

1. Clona el repositorio y ubícate en la carpeta del backend:
    ```bash
    cd periferia/backend
    ```
2. Ejecuta todos los servicios (incluye build):
    ```bash
    docker compose up --build
    ```
    Esto creará los siguientes contenedores:
    - `auth-db` (PostgreSQL)
    - `auth-service` (puerto 3000)
    - `user-service` (puerto 3001)
    - `post-service` (puerto 3002)

3. Espera los mensajes en consola como:
    - "Usuarios de prueba insertados"
    - "Post creado para usuario ..."

---

## Datos de Prueba (Seeders)

Se crean automáticamente 5 usuarios con las siguientes credenciales:

| Alias  | Email                              | Contraseña |
|--------|------------------------------------|------------|
| user1  | Kody.Reichert43@hotmail.com
| user2  | Jaime.Shanahan@yahoo.com            | 123456     |
| user3  | Kelly.Jacobs84@yahoo.com  
| user4  | Haylie_Lowe@gmail.com
| user5  |Cristopher60@gmail.com 

Cada usuario tiene una publicación precreada en el `post-service`.

---

## Endpoints Principales

### auth-service (`http://localhost:3000`)

- **POST /auth/login:** Iniciar sesión y obtener token JWT  
  **Body:**
  ```json
  {
    "email": "user1@test.com",
    "password": "123456"
  }
  ```
  **Respuesta:**
  ```json
  {
    "access_token": "..."
  }
  ```

### user-service (`http://localhost:3001`)

- **GET /users/me:** Devuelve el perfil del usuario autenticado  
  **Headers:**  
  `Authorization: Bearer <token>`

### post-service (`http://localhost:3002`)

- **POST /posts:** Crear una publicación
- **GET /posts:** Ver publicaciones de otros usuarios
- **POST /posts/:id/like:** Dar "like" a una publicación

> **Nota:** Todos los endpoints requieren el token JWT en el header:  
> `Authorization: Bearer <token>`

---

## Detener los Servicios

- Para detener los servicios:
    ```bash
    docker compose down
    ```
- Para eliminar los datos de la base de datos (reinicio completo):
    ```bash
    docker compose down -v
    ```

---

## Consideraciones Finales

- La arquitectura está dividida en capas siguiendo el principio de Clean Architecture.
- Todos los servicios están dockerizados y conectados a una misma base de datos.
- El sistema es modular y permite escalar fácilmente agregando nuevos microservicios.
- Este backend está preparado para integrarse con un frontend o Postman para pruebas manuales.