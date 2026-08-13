# MiniBlog API

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar autores y publicaciones.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- pg
- Supertest
- OpenAPI

## Requisitos

Para ejecutar el proyecto localmente necesitás:

- Node.js
- PostgreSQL
- npm

## API en producción

https://miniblog-api-production-2234.up.railway.app

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/octaviolanne-hue/miniblog-api.git
```

Ingresar al proyecto:

```bash
cd miniblog-api
```

Instalar las dependencias:

```bash
npm install
```

Configuración
Crear un archivo .env en la raíz del proyecto.
Ejemplo:

```bash
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/miniblog
PORT=3000
```

El archivo .env contiene información sensible y no debe subirse a GitHub.

Base de datos
Crear una base de datos PostgreSQL llamada miniblog.
Luego ejecutar el script de creación y datos iniciales:

```bash
psql -U postgres -d miniblog -f db/setup.sql
```

El archivo db/setup.sql crea las tablas authors y posts, establece la relación entre ellas y agrega datos de ejemplo.

Ejecutar la aplicación
Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

La API estará disponible en:
http://localhost:3000
También se puede ejecutar con:

```bash
npm start
```

## Endpoints

Authors

- GET /api/authors - Listar todos los autores
- GET /api/authors/:id - Obtener un autor por ID
- POST /api/authors - Crear un autor
- PUT /api/authors/:id - Actualizar un autor
- DELETE /api/authors/:id - Eliminar un autor

Posts

- GET /api/posts - Listar todos los posts
- GET /api/posts/:id - Obtener un post por ID
- GET /api/posts/author/:authorId - Obtener los posts de un autor
- POST /api/posts - Crear un post
- PUT /api/posts/:id - Actualizar un post
- DELETE /api/posts/:id - Eliminar un post

## Validaciones

La API incluye validaciones básicas:
El nombre de un autor es obligatorio.
El email de un autor es obligatorio y debe ser único.
El título de un post es obligatorio.
El contenido de un post es obligatorio.
El author_id de un post es obligatorio y debe corresponder a un autor existente.
La API utiliza códigos HTTP adecuados como 200, 201, 204, 400, 404 y 500.

Tests
Los tests utilizan Node.js Test Runner y Supertest.
Para ejecutar los tests:

```bash
npm test
```

Los tests verifican casos básicos de autores y posts, incluyendo obtención de recursos, creación de autores y posts y manejo de recursos inexistentes.

Documentación OpenAPI

La documentación de la API se encuentra en el archivo:
openapi.yaml
El archivo contiene la descripción de los endpoints, parámetros, respuestas y estructuras de datos utilizadas por la API.

## Deployment en Railway

La aplicación será desplegada utilizando Railway.
Los pasos generales son:
Crear un proyecto en Railway.
Conectar el repositorio de GitHub.
Agregar una base de datos PostgreSQL.
Configurar las variables de entorno.
Configurar DATABASE_URL utilizando la conexión proporcionada por Railway.
Configurar el puerto mediante la variable PORT.
Realizar el deployment de la aplicación.
La URL pública de la API será agregada a esta sección una vez realizado el deployment.

## Uso de IA

Durante el desarrollo del proyecto se utilizaron herramientas de inteligencia artificial como apoyo para:
Comprender conceptos de Node.js, Express y PostgreSQL.
Resolver errores durante el desarrollo.
Revisar la estructura del proyecto.
Crear y comprender tests.
Generar una primera estructura para la documentación OpenAPI.
Comprender códigos de error HTTP y PostgreSQL.
Resolver dudas sobre Git y el proceso de desarrollo.
La IA fue utilizada como herramienta de apoyo y aprendizaje. El código fue revisado y comprendido durante el desarrollo del proyecto.

## Autor

Octavio Lanne
