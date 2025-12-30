# 🚀 Backend – Product Manager API

Este proyecto corresponde al backend de la prueba técnica para el rol de **Desarrollador Full Stack**.

Consiste en una API REST desarrollada con **Java 21** y **Spring Boot**, encargada de la gestión de productos mediante operaciones CRUD.

## 🎯 Objetivo Principal

- ✅ Diseño de API claro y consistente
- ✅ Buenas prácticas de arquitectura
- ✅ Manejo adecuado de errores y validaciones
- ✅ Código mantenible y escalable

---

## 🧰 Tecnologías Utilizadas

### Core

- **Java 21**
- **Spring Boot**
  - Spring Web
  - Spring Data JPA
  - Spring Validation
- **Hibernate / JPA**

### Base de Datos

- H2 / PostgreSQL / MySQL (según entorno)

### Herramientas

- **Lombok** - Reducción de boilerplate
- **Maven** - Gestión de dependencias

---

## 🧱 Arquitectura del Proyecto

El proyecto sigue una **arquitectura por capas**, inspirada en principios de **Clean Architecture**, manteniendo una separación clara de responsabilidades:

```
src/
├── main/
│   ├── java/
│   │   └── com.example.productapi/
│   │       ├── config/
│   │       │   └── CorsConfig.java
│   │       │
│   │       ├── controller/
│   │       │   └── ProductController.java
│   │       │
│   │       ├── service/
│   │       │   ├── IProductService.java
│   │       │   └── ProductServiceImpl.java
│   │       │
│   │       ├── repository/
│   │       │   └── IProductRepository.java
│   │       │
│   │       ├── model/
│   │       │   └── Product.java
│   │       │
│   │       ├── dto/
│   │       │   ├── ProductRequest.java
│   │       │   └── ProductResponse.java
│   │       │
│   │       ├── mapper/
│   │       │   └── IProductMapper.java
│   │       │
│   │       ├── exception/
│   │       │   ├── GlobalExceptionHandler.java
│   │       │   ├── ErrorResponse.java
│   │       │   └── ResourceNotFoundException.java
│   │       │
│   │       ├── utils/
│   │       │   ├── ErrorCode.java
│   │       │   ├── ErrorMessage.java
│   │       │   └── ValidationMessage.java
│   │       │
│   │       └── ProductApiApplication.java
│   │
│   └── resources/
│       ├── application.yml
│       └── data.sql (opcional)
│
└── pom.xml
```

---

## 🧠 Decisiones Técnicas Clave

### 1️⃣ Separación por Capas

**Controller**

- Exposición de endpoints REST
- Validación de entrada

**Service**

- Lógica de negocio
- Reglas de dominio
- Interfaz (`IProductService`) + Implementación (`ProductServiceImpl`)

**Repository**

- Acceso a datos (JPA)
- Interfaz `IProductRepository`

**Model / Entity**

- Representación de la base de datos

**Esta separación:**

- Reduce acoplamiento
- Facilita testing
- Mejora mantenibilidad

### 2️⃣ Diseño de API REST

Endpoints claros y semánticos con uso correcto de verbos HTTP y códigos de estado apropiados:

| Método   | Endpoint                       | Descripción         |
| -------- | ------------------------------ | ------------------- |
| `GET`    | `/api/v1/products`             | Listar productos    |
| `POST`   | `/api/v1/products`             | Crear producto      |
| `PUT`    | `/api/v1/products/{id}`        | Actualizar producto |
| `PATCH`  | `/api/v1/products/{id}/status` | Cambiar estado      |
| `DELETE` | `/api/v1/products/{id}`        | Eliminar producto   |

### 3️⃣ Validaciones

Se utilizan validaciones con **Jakarta Validation**:

```java
@NotBlank(message = ValidationMessage.NAME_REQUIRED)
private String name;

@Positive(message = ValidationMessage.PRICE_POSITIVE)
private BigDecimal price;
```

**Beneficios:**

- Datos consistentes
- Errores claros para el frontend
- Validación declarativa

### 4️⃣ Manejo Global de Errores

Se implementa un `GlobalExceptionHandler` con `@ControllerAdvice` que captura y procesa tres tipos de excepciones:

**1. ResourceNotFoundException** - Recursos no encontrados (404)

```java
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex)
```

**2. MethodArgumentNotValidException** - Errores de validación (400)

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex)
```

- Captura todos los errores de validación de campos
- Genera un `Map<String, String>` con campo → mensaje de error
- Retorna detalles estructurados en el objeto `details`

**3. Exception** - Errores generales (500)

```java
@ExceptionHandler(Exception.class)
public ResponseEntity<ErrorResponse> handleGeneral(Exception ex)
```

**Ejemplo de respuesta para validación:**

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": {
    "name": "Name is required",
    "price": "Price must be positive"
  },
  "timestamp": "2024-01-15T10:30:00"
}
```

**Ejemplo de respuesta para recurso no encontrado:**

```json
{
  "code": "PRODUCT_NOT_FOUND",
  "message": "Product not found with id: 123",
  "details": null,
  "timestamp": "2024-01-15T10:30:00"
}
```

**Esto garantiza:**

- Respuestas consistentes con `ErrorResponse`
- Códigos estandarizados mediante `ErrorCode`
- Mensajes centralizados en `ErrorMessage`
- Detalles específicos de validación cuando aplica
- Timestamp para trazabilidad

### 5️⃣ Uso de DTOs y Mappers

Se separan las entidades del modelo de entrada/salida:

- `ProductRequest` - Datos de entrada
- `ProductResponse` - Datos de salida
- `IProductMapper` - Conversión entre Entity ↔ DTO

**Ventajas:**

- Evita exponer directamente la entidad
- Permite evolucionar la API
- Controla los datos recibidos/enviados

### 6️⃣ Utilidades Centralizadas

**ErrorResponse (Record)**

```java
public record ErrorResponse(
    String code,
    String message,
    Map<String, String> details,
    LocalDateTime timestamp
) {}
```

- Estructura inmutable para respuestas de error
- Uso de Java Records para reducir boilerplate

**ErrorCode (Enum)**

```java
public enum ErrorCode {
    PRODUCT_NOT_FOUND("ERR_404"),
    VALIDATION_ERROR("ERR_400"),
    INTERNAL_SERVER_ERROR("ERR_500");
}
```

- Códigos de error estandarizados
- Identificadores únicos para cada tipo de error

**ErrorMessage (Enum)**

```java
public enum ErrorMessage {
    PRODUCT_NOT_FOUND("Product not found with id: %s"),
    VALIDATION_FAILED("Validation failed"),
    INTERNAL_SERVER_ERROR("Internal server error");

    public String format(Object... args) {
        return String.format(message, args);
    }
}
```

- Mensajes de error centralizados
- Soporte para mensajes parametrizados con `format()`

**ValidationMessage (Clase Utilitaria)**

```java
public final class ValidationMessage {
    public static final String NAME_REQUIRED = "Name is required";
    public static final String PRICE_GREATER_THAN_ZERO = "Price must be greater than zero";
    public static final String STOCK_NOT_NEGATIVE = "Stock cannot be negative";
    // Constantes para validaciones
}
```

- Mensajes de validación de campos
- Constantes reutilizables en anotaciones de validación

**Beneficios:**

- Consistencia en toda la aplicación
- Fácil mantenimiento
- Evita duplicación de strings
- Internacionalización futura
- Type-safety con enums

### 7️⃣ Configuración CORS

`CorsConfig` permite la integración con el frontend:

```java
@Configuration
public class CorsConfig {
    // Configuración de orígenes permitidos
}
```

### 8️⃣ Lombok

Se utiliza Lombok para:

- Reducir boilerplate
- Mejorar legibilidad
- Mantener clases limpias

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    // ...
}
```

### 9️⃣ Persistencia

- **JPA / Hibernate** para ORM
- Repositorios con interfaz `IProductRepository extends JpaRepository`
- Queries derivadas cuando es posible

---

## 🔄 Flujo de una Petición

1. El cliente consume un endpoint REST
2. El **Controller** valida la entrada
3. El **Mapper** convierte DTO → Entity
4. El **Service** ejecuta la lógica de negocio
5. El **Repository** accede a la base de datos
6. El **Mapper** convierte Entity → DTO
7. Se retorna una respuesta clara al cliente

---

## ▶️ Cómo Ejecutar el Proyecto

### 1️⃣ Requisitos

- **Java 21**
- **Maven 3.9+**

### 2️⃣ Ejecutar aplicación

```bash
mvn clean spring-boot:run
```

La API quedará disponible en:

```
http://localhost:8080
```

---

## 🧪 Consideraciones Finales

- El proyecto prioriza **claridad sobre complejidad**
- La estructura permite **escalar fácilmente**
- El diseño está alineado con **APIs REST modernas**
- El backend está preparado para integrarse con **cualquier frontend**
- Uso de **interfaces** para facilitar testing y mantener bajo acoplamiento
- **Mensajes y códigos centralizados** para consistencia

---

## ✅ Estado del Proyecto

- ✔ API REST funcional
- ✔ CRUD completo
- ✔ Validaciones y manejo de errores
- ✔ Arquitectura clara con separación de responsabilidades
- ✔ Buenas prácticas Spring Boot
- ✔ DTOs y Mappers implementados
- ✔ Configuración CORS
- ✔ Utilidades centralizadas

---
