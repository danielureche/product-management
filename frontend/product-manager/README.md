# 🛍️ Frontend – Product Manager App

Este proyecto corresponde al frontend de la prueba técnica para el rol de **Desarrollador Full Stack**, desarrollado con **Angular 18**.

La aplicación consume una API REST construida en Spring Boot y permite gestionar productos mediante operaciones CRUD.

## 🎯 Enfoque Principal

- ✅ Separación clara de responsabilidades
- ✅ Código mantenible y escalable
- ✅ UI limpia, moderna y responsive
- ✅ Buenas prácticas de Angular moderno (standalone components, signals-ready)

---

## 🧰 Tecnologías Utilizadas

### Framework & Lenguaje

- **Angular 18**
  - Standalone components
  - Control flow moderno (`@if`, `@for`)
  - Inyección con `inject()`
- **TypeScript**

### Estilos & UI

- **Tailwind CSS**
  - Diseño utilitario
  - Responsive design
  - Animaciones ligeras
- **Angular Material**
  - Íconos (MatIcon)

### Manejo de Datos

- **RxJS** - Manejo de flujos asíncronos
- **REST API** - Consumo vía HttpClient

### Otros

- **HTML + CSS**

---

## 🧱 Arquitectura del Proyecto

La aplicación sigue una **arquitectura por features**, separando claramente:

- **Pages** → orquestación y lógica
- **Components** → UI reutilizable
- **Core** → modelos y servicios
- **Shared** → componentes y servicios comunes

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   └── product.model.ts
│   │   └── services/
│   │       └── product.service.ts
│   │
│   ├── features/
│   │   └── products/
│   │       ├── pages/
│   │       │   └── product-list.page.ts
│   │       │
│   │       └── components/
│   │           ├── product-table/
│   │           └── product-form/
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   └── confirm-modal/
│   │   └── services/
│   │       └── notification.service.ts
│   │
│   └── app.routes.ts
│
├── styles.css
└── main.ts
```

---

## 🧠 Decisiones Técnicas Clave

### 1️⃣ Arquitectura por Feature

Se eligió una arquitectura por features para:

- Facilitar escalabilidad
- Reducir acoplamiento
- Mejorar mantenibilidad

Cada feature contiene sus pages, components y rutas.

### 2️⃣ Separación Page vs Component

**Pages:**

- Manejan estado
- Orquestan servicios
- Controlan modales y flujos

**Components:**

- Solo UI
- Emisión de eventos (`@Output`)
- Reutilizables y desacoplados

**Ejemplo:**

- `ProductListPage` → lógica y servicios
- `ProductTableComponent` → render de tabla

### 3️⃣ Standalone Components

Todos los componentes son standalone, evitando NgModules.

**Beneficios:**

- Menos boilerplate
- Mejor tree-shaking
- Arquitectura más clara

### 4️⃣ Manejo de Formularios

Se utiliza **Reactive Forms:**

- Validaciones declarativas
- Control total del estado
- Fácil escalabilidad

**Ejemplo:**

- Validación de campos requeridos
- Manejo de errores visuales

### 5️⃣ Manejo de Notificaciones (Toasts)

Se implementó un `NotificationService` centralizado en `shared/services`:

```typescript
@Injectable({ providedIn: 'root' })
export class NotificationService {
  success(msg: string) { ... }
  error(msg: string) { ... }
}
```

**Ventajas:**

- Reutilizable
- Desacoplado de componentes
- Fácil reemplazo futuro

### 6️⃣ UI y Diseño

- **Tailwind CSS** para:
  - Rapidez
  - Consistencia visual
  - Responsive design
- **Angular Material Icons** para acciones (editar, eliminar)
- Componentes modales personalizados
- Animaciones ligeras para feedback visual

### 7️⃣ Responsividad

- Layout adaptable a móvil, tablet y desktop
- Tablas con `overflow-x-auto` en pantallas pequeñas
- Botones y modales optimizados para UX

---

## 🔄 Flujo Principal de la Aplicación

1. La **Page** carga los productos desde la API
2. La **tabla** renderiza los datos
3. El usuario puede:
   - ➕ Crear producto
   - ✏️ Editar producto
   - 🔄 Activar / desactivar producto
   - 🗑️ Eliminar producto (con confirmación)
4. Las acciones muestran **feedback visual** mediante toast

---

## ▶️ Cómo Ejecutar el Proyecto

### 1️⃣ Instalar dependencias

```bash
npm install
```

### 2️⃣ Ejecutar aplicación

```bash
ng serve
```

La aplicación estará disponible en:

```
http://localhost:4200
```

---

## 🧪 Consideraciones Finales

- El proyecto prioriza **claridad, legibilidad y buenas prácticas**
- La estructura permite:
  - Agregar nuevas features fácilmente
  - Reemplazar UI o servicios sin romper lógica
- El enfoque está alineado con **entornos de desarrollo reales** y equipos escalables

---

## ✅ Estado del Proyecto

- ✔ CRUD completo
- ✔ Consumo de API REST
- ✔ UI moderna y responsive
- ✔ Arquitectura clara
- ✔ Buenas prácticas Angular

---

## 👨‍💻 Autor

Desarrollado como parte de una prueba técnica para **Desarrollador Full Stack**.
