# Challenge TODO API

API REST para gestión de usuarios y tareas, construida con Express.js, TypeScript y Firebase, siguiendo arquitectura hexagonal y principios de Clean Architecture.

## 📋 Descripción

Esta API permite la gestión completa de usuarios y tareas (TODOs) con autenticación mediante Firebase Authentication. La aplicación está diseñada siguiendo patrones de arquitectura limpia, separando las responsabilidades en capas bien definidas y facilitando el mantenimiento y escalabilidad del código.

## 🏗️ Arquitectura

El proyecto implementa **Arquitectura Hexagonal (Ports & Adapters)** con las siguientes capas:

### Estructura de Capas

```
📦 Domain (Dominio)
   ├── Entidades de negocio
   ├── Value Objects con validaciones
   ├── Interfaces de repositorio (Ports)
   └── Excepciones del dominio

📦 Application (Aplicación)
   ├── Casos de uso
   ├── DTOs
   └── Orquestación de lógica de negocio

📦 Infrastructure (Infraestructura)
   ├── Implementaciones de repositorios (Adapters)
   ├── Controladores HTTP
   ├── Routes de Express
   └── Configuración de Firebase

📦 Shared (Compartido)
   ├── Configuración de base de datos
   ├── Middlewares
   └── Servicios compartidos
```

## 🚀 Tecnologías

### Core

- **Node.js** - Runtime de JavaScript
- **Express.js v5** - Framework web
- **TypeScript** - Tipado estático
- **pnpm** - Gestor de paquetes

### Base de Datos

- **Firebase Admin SDK** - Firestore para persistencia
- **Firebase Authentication** - Autenticación con JWT

### Seguridad

- **bcrypt** - Encriptación de contraseñas

### Desarrollo

- **tsx** - Ejecución de TypeScript
- **nodemon** - Hot reload en desarrollo
- **ESLint** - Linter de código
- **Prettier** - Formateo de código
- **Husky** - Git hooks

## 🔧 Instalación

### Prerrequisitos

- Node.js >= 18
- pnpm >= 8
- Cuenta de Firebase con proyecto creado

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd challenge-todo-api
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto:

   ```bash
   cp .env.example .env
   ```

   Configura tu Service Account Key de Firebase:

   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"...","universe_domain":"..."}'
   ```

4. **Ejecutar en desarrollo**

   ```bash
   pnpm dev
   ```

5. **Build para producción**
   ```bash
   pnpm build
   pnpm start
   ```

## 📚 API Endpoints

### Users (Protegidos con JWT)

| Método | Endpoint         | Descripción                |
| ------ | ---------------- | -------------------------- |
| GET    | `/users/`        | Obtener todos los usuarios |
| GET    | `/users/:id/`    | Obtener usuario por ID     |
| GET    | `/users/?email=` | Obtener usuario por email  |
| POST   | `/users/`        | Crear nuevo usuario        |
| PUT    | `/users/:id`     | Actualizar usuario         |
| DELETE | `/users/:id`     | Eliminar usuario           |

### Tasks (Protegidos con JWT)

| Método | Endpoint                           | Descripción                  |
| ------ | ---------------------------------- | ---------------------------- |
| GET    | `/tasks/`                          | Obtener todas las tareas     |
| GET    | `/tasks/:id/`                      | Obtener tarea por ID         |
| GET    | `/tasks/user/:userId/`             | Obtener tareas de un usuario |
| GET    | `/tasks/completed/?completed=true` | Filtrar tareas por estado    |
| POST   | `/tasks/`                          | Crear nueva tarea            |
| PUT    | `/tasks/:id`                       | Actualizar tarea             |
| DELETE | `/tasks/:id`                       | Eliminar tarea               |

## 🛠️ Scripts Disponibles

```bash
# Desarrollo con hot-reload
pnpm dev

# Build para producción
pnpm build

# Ejecutar en producción
pnpm start

# Formatear código
pnpm format

# Verificar formato
pnpm format:check

# Linter
pnpm lint

# Corregir errores de linter
pnpm lint:fix
```

## 🔒 Seguridad

- ✅ Contraseñas encriptadas con bcrypt (10 rounds)
- ✅ Autenticación con Firebase JWT
- ✅ Validación de datos con Value Objects
- ✅ Manejo de errores centralizado
- ✅ Variables de entorno para credenciales

## 🏛️ Principios Aplicados

- **SOLID**: Responsabilidad única, inversión de dependencias
- **Clean Architecture**: Separación de capas, independencia de frameworks
- **Domain-Driven Design**: Entidades ricas, Value Objects, Agregados
- **Repository Pattern**: Abstracción de persistencia
- **Dependency Injection**: Mediante Service Container

## 👨‍💻 Autor

Omar Jiménez Solano - Full Stack Developer
