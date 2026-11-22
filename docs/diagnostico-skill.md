# Diagnóstico de la skill principal

## 1. Skill evaluada

Archivo: `SKILL.md`

Ubicación: raíz del repositorio.

## 2. Objetivo

Definir instrucciones para que un asistente de IA pueda comprender
la arquitectura de Restful Booker y contribuir a su mantenimiento
y automatización.

## 3. Capacidades identificadas

- Orientación sobre Playwright y TypeScript.
- Separación entre automatización API y UI.
- Uso de API Clients independientes.
- Reutilización de fixtures y modelos.
- Gestión de autenticación.
- Estrategia de ejecución paralela.
- Uso de mocks en pruebas UI.
- Diagnóstico de errores y reportes.

## 4. Resultados de la revisión técnica

### Uso de getBookingById()

Se realizó una búsqueda en los directorios `src` y `tests`.

Resultado: se encontró únicamente la declaración del método
en `src/api/clients/BookingApiClient.ts`, línea 100.

No se encontraron invocaciones en los directorios examinados.

### Datos de prueba

El archivo `src/data/booking.data.ts` contiene dos datasets:

- Standard booking - paid deposit.
- Standard booking - unpaid deposit.

### Descubrimiento de pruebas

Se ejecutó `npx playwright test --list`.

Resultado: seis pruebas descubiertas en cuatro archivos.

Distribución:

- booking-create.spec.ts: 2 pruebas.
- booking-negative.spec.ts: 2 pruebas.
- booking-ui-mocked.spec.ts: 1 prueba.
- home-inspection.spec.ts: 1 prueba.

### Estrategia API y UI

Las pruebas API utilizan el backend real.

La prueba UI utiliza la aplicación real con respuestas del
backend simuladas mediante interceptación de peticiones.

Esta separación permite validar independientemente el
comportamiento del frontend y las operaciones API.

## 5. Oportunidades de mejora

- Incorporar validaciones de contratos API reutilizables.
- Mejorar la gestión y aislamiento de datos de prueba.
- Estandarizar el análisis de fallos y evidencias.
- Documentar explícitamente la aplicación de las instrucciones
  de la skill durante la revisión técnica.

## 6. Conclusión

La skill principal proporciona una guía general para trabajar
en el proyecto y establece convenciones de arquitectura,
automatización y diagnóstico.

La revisión permitió identificar funcionalidades existentes,
métodos pendientes de utilización y oportunidades de mejora.

Se conservará la skill principal y se complementará con tres
skills especializadas, evitando duplicar sus responsabilidades.

## 7. Estado

Diagnóstico técnico realizado.
Ejecución final de la suite pendiente.
