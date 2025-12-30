# 🛍️ Product Manager - Full Stack Application

Aplicación Full Stack para la gestión de productos mediante operaciones CRUD, desarrollada como prueba técnica para el rol de **Desarrollador Full Stack**.

## 📋 Descripción del Proyecto

Sistema completo de gestión de productos que permite crear, leer, actualizar y eliminar productos, con una interfaz moderna y responsive conectada a una API REST robusta y escalable.

---

## 🏗️ Arquitectura General

```
product-manager/
├── backend/          # API REST - Spring Boot
│   └── src/
│       └── main/
│           ├── java/
│           └── resources/
│
└── frontend/         # Aplicación Web - Angular
    └── src/
        └── app/
```

---

## 🎯 Características Principales

### Funcionalidades
- ✅ **Crear** productos con validaciones
- ✅ **Listar** todos los productos
- ✅ **Actualizar** información de productos
- ✅ **Cambiar estado** (activar/desactivar)
- ✅ **Eliminar** productos con confirmación
- ✅ **Validaciones** en frontend y backend
- ✅ **Manejo de errores** centralizado y consistente
- ✅ **UI responsive** adaptable a todos los dispositivos

### Aspectos Técnicos
- 🎨 Diseño moderno con Tailwind CSS
- 🔄 Comunicación REST entre frontend y backend
- 📱 Interfaz responsive (móvil, tablet, desktop)
- ⚡ Feedback visual con notificaciones toast
- 🛡️ Validaciones robustas en ambas capas
- 🏛️ Arquitectura escalable y mantenible

---

## 🧰 Stack Tecnológico

### Backend
- **Java 21**
- **Spring Boot 3.x**
  - Spring Web
  - Spring Data JPA
  - Spring Validation
- **Hibernate / JPA**
- **Lombok**
- **Maven**
- **Base de datos**: H2 / PostgreSQL / MySQL

### Frontend
- **Angular 18**
- **TypeScript**
- **Tailwind CSS**
- **Angular Material**
- **RxJS**
- **Standalone Components**

---

## 📂 Estructura del Proyecto

### Backend - API REST

```
src/main/java/com.example.productmanager/
├── config/
│   └── CorsConfig.java
├── controller/
│   └── ProductController.java
├── service/
│   ├── IProductService.java
│   └── ProductServiceImpl.java
├── repository/
│   └── IProductRepository.java
├── model/
│   └── Product.java
├── dto/
│   ├── ProductRequest.java
│   └── ProductResponse.java
├── mapper/
│   └── IProductMapper.java
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── ErrorResponse.java
│   └── ResourceNotFoundException.java
└── utils/
    ├── ErrorCode.java
    ├── ErrorMessage.java
    └── ValidationMessage.java
```

### Frontend - Angular App

```
src/app/
├── core/
│   ├── models/
│   │   └── product.model.ts
│   └── services/
│       └── product.service.ts
├── features/
│   └── products/
│       ├── pages/
│       │   └── product-list.page.ts
│       └── components/
│           ├── product-table/
│           └── product-form/
└── shared/
    ├── components/
    │   └── confirm-modal/
    └── services/
        └── notification.service.ts
```

---

## 🔌 API Endpoints

| Método   | Endpoint                       | Descripción                    |
|----------|--------------------------------|--------------------------------|
| `GET`    | `/api/v1/products`             | Obtener todos los productos    |
| `GET`    | `/api/v1/v1/products/{id}`     | Obtener producto por ID        |
| `POST`   | `/api/v1/products`             | Crear nuevo producto           |
| `PUT`    | `/api/v1/products/{id}`        | Actualizar producto completo   |
| `PATCH`  | `/api/v1/products/{id}/status` | Cambiar estado del producto    |
| `DELETE` | `/api/v1/products/{id}`        | Eliminar producto              |

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

**Backend:**
- Java 21 o superior
- Maven 3.9+

**Frontend:**
- Node.js 18+ y npm
- Angular CLI 18

---

### 1️⃣ Configurar y ejecutar Backend

```bash
# Navegar al directorio del backend
cd backend

# Compilar el proyecto
mvn clean install

# Ejecutar la aplicación
mvn spring-boot:run
```

La API estará disponible en: **http://localhost:8080**

---

### 2️⃣ Configurar y ejecutar Frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar la aplicación
ng serve
```

La aplicación web estará disponible en: **http://localhost:4200**

---

## 🎨 Capturas de Pantalla

### Lista de Productos
Interfaz principal con tabla responsive y acciones rápidas.

### Formulario de Producto
Modal para crear/editar productos con validaciones en tiempo real.

### Notificaciones
Feedback visual mediante toast para todas las operaciones.

---

## 🏛️ Decisiones de Arquitectura

### Backend

**✅ Arquitectura por Capas**
- Separación clara: Controller → Service → Repository
- Uso de interfaces para bajo acoplamiento
- DTOs para entrada/salida de datos

**✅ Manejo de Errores Global**
- `GlobalExceptionHandler` con `@ControllerAdvice`
- Respuestas de error estandarizadas con `ErrorResponse`
- Códigos y mensajes centralizados en enums

**✅ Validaciones Robustas**
- Jakarta Validation en DTOs
- Mensajes personalizados en `ValidationMessage`
- Validación en múltiples capas

**✅ Mappers**
- Separación Entity ↔ DTO
- Código limpio y mantenible

### Frontend

**✅ Arquitectura por Features**
- Código organizado por funcionalidad
- Fácil escalabilidad

**✅ Separación Page/Component**
- Pages: lógica y estado
- Components: UI pura y reutilizable

**✅ Standalone Components**
- Angular moderno sin NgModules
- Mejor tree-shaking

**✅ Reactive Forms**
- Validaciones declarativas
- Control total del estado

---

## 🔒 Validaciones

### Campo Nombre
- ❌ No puede estar vacío
- ✅ Requerido en frontend y backend

### Campo Precio
- ❌ Debe ser mayor a 0
- ✅ Validación numérica
- ✅ Formato decimal

### Campo Stock
- ❌ No puede ser negativo
- ✅ Validación numérica
- ✅ Valor entero

---

## 🛡️ Manejo de Errores

### Backend
```json
{
  "code": "ERR_400",
  "message": "Validation failed",
  "details": {
    "name": "Name is required",
    "price": "Price must be greater than zero"
  },
  "timestamp": "2024-01-15T10:30:00"
}
```

### Frontend
- Notificaciones toast para feedback inmediato
- Validaciones en tiempo real en formularios
- Mensajes de error contextuales

---

## ✨ Buenas Prácticas Implementadas

### Código
- ✅ Principios SOLID
- ✅ Clean Code
- ✅ Separación de responsabilidades
- ✅ DRY (Don't Repeat Yourself)

### Arquitectura
- ✅ Bajo acoplamiento
- ✅ Alta cohesión
- ✅ Código testeable
- ✅ Escalabilidad

### UX/UI
- ✅ Diseño responsive
- ✅ Feedback visual constante
- ✅ Confirmaciones para acciones destructivas
- ✅ Accesibilidad

---

## 📚 Documentación Adicional

Para más detalles sobre cada componente:

- **[Backend README](./backend/productmanager/README.md)** - Documentación detallada de la API
- **[Frontend README](./frontend/product-manager/README.md)** - Documentación de la aplicación Angular

---
