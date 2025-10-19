# Todo App - Challenge

Aplicación completa de gestión de tareas (Todo App) con Angular y Firebase.

## 📋 ¿Qué hace?

Una aplicación web para gestionar tareas donde puedes:

- ✅ Crear, editar y eliminar tareas
- ✅ Marcar tareas como completadas/pendientes
- ✅ Autenticación con Firebase
- ✅ Interfaz moderna y responsive

## 🚀 Tecnologías

**Frontend:**

- Angular 18
- Tailwind CSS
- PrimeNG (UI Components)
- Firebase Auth

**Backend:**

- Express.js + TypeScript
- Firebase Functions
- Firestore (Base de datos)
- Arquitectura Hexagonal

## 🔧 Cómo levantar la app

### Prerrequisitos

- Node.js >= 18
- pnpm >= 8
- Cuenta de Firebase

### Instalación rápida

```bash
# Clonar e instalar
git clone <repository-url>
cd challenge-todo-app
pnpm install:all

# Levantar todo (backend + frontend)
pnpm dev
```

**URLs:**

- Frontend: http://localhost:4200
- Backend: http://localhost:5001

### Scripts útiles

```bash
# Desarrollo completo
pnpm dev

# Solo backend
pnpm run backend:dev

# Solo frontend
pnpm run frontend:dev

# Build de producción
pnpm build

# Deploy a Firebase
pnpm deploy
```

## 🏗️ Estructura del Proyecto

### Arquitectura General

```
challenge-todo-app/                 # Monorepo
├── functions/                      # Backend API
│   ├── src/                       # Código fuente TypeScript
│   │   ├── modules/               # Módulos por dominio
│   │   │   ├── tasks/            # Gestión de tareas
│   │   │   │   ├── domain/       # Entidades y reglas de negocio
│   │   │   │   ├── application/  # Casos de uso
│   │   │   │   └── infrastructure/ # Controllers y repos
│   │   │   └── users/            # Gestión de usuarios
│   │   └── shared/               # Código compartido
│   └── lib/                      # Código compilado (JS)
│
├── frontend-app/                   # Frontend Angular
│   ├── src/app/                   # Aplicación principal
│   │   ├── modules/              # Módulos funcionales
│   │   │   ├── auth/             # Autenticación
│   │   │   └── dashboard/        # Panel de tareas
│   │   ├── layouts/              # Layouts de página
│   │   ├── core/                 # Servicios core
│   │   └── shared/               # Componentes compartidos
│   └── dist/                     # Build de producción
│
└── .github/                       # CI/CD y configuración
    └── workflows/                 # GitHub Actions
```

### Arquitectura Backend (Hexagonal)

- **Domain**: Entidades puras (Task, User) sin dependencias externas
- **Application**: Casos de uso que orquestan la lógica de negocio
- **Infrastructure**: Implementaciones concretas (Firestore, Express)

### Arquitectura Frontend (Angular)

- **Modules**: Funcionalidades separadas (auth, dashboard)
- **Services**: Comunicación con API y estado global
- **Components**: Presentación y interacción del usuario
- **Guards**: Protección de rutas según autenticación

**Funcionalidades principales:**

- Autenticación completa (login/register/logout)
- CRUD de tareas con dialogs
- Guards de protección de rutas
- Interceptor automático de auth tokens
- Deploy automático con CI/CD
