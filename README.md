## 📸 Like Me - Red Social (Parte I)
Este proyecto es el desarrollo de la lógica inicial de una red social llamada Like Me. Como desarrollador Full Stack, implementé un servidor que permite la creación y visualización de posts en tiempo real, integrando una base de datos relacional para la persistencia de los datos.

## 🚀 Tecnologías Utilizadas

Frontend: React (Proporcionado como material de apoyo).
Backend: Node.js con Express.
Base de Datos: PostgreSQL.

Librerías principales:
pg: Para la interacción con PostgreSQL.
cors: Para habilitar el intercambio de recursos entre el frontend y backend.
dotenv: Para la gestión segura de variables de entorno.
express: Para la creación de rutas GET y POST.

## 🛠️ Instalación y Configuración
1. Requisitos previos
Es necesario tener instalado Node.js y PostgreSQL.

2. Base de Datos
Ejecuta las siguientes instrucciones SQL en tu cliente de PostgreSQL (como pgAdmin) para preparar el entorno:

SQL
CREATE DATABASE likeme;

CREATE TABLE posts (
  id SERIAL, 
  titulo VARCHAR(25), 
  img VARCHAR(1000), 
  descripcion VARCHAR(255), 
  likes INT
);

3. Clonar e instalar dependencias
Bash
git clone
cd 
npm install

4. Variables de Entorno
Crea un archivo .env en la raíz del servidor basándote en el archivo .env.example:

Fragmento de código
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DATABASE=likeme
DB_PORT=5433 (o tu puerto de Postgres)

## 🔌 Rutas de la API
El servidor expone las siguientes rutas en http://localhost:3000:

GET /posts: Obtiene todos los registros almacenados en la tabla posts de PostgreSQL.
POST /posts: Recibe un nuevo registro (título, URL de imagen y descripción) y lo almacena en la base de datos.

## 🖼️ Previsualización del Proyecto
Al registrar un nuevo post con título, URL y descripción, la aplicación lo renderiza automáticamente en la interfaz.