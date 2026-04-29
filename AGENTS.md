# AGENTS.md

Este documento proporciona una visión general de la arquitectura del proyecto Metatech para desarrolladores y agentes de IA que trabajen en este repositorio.

## Arquitectura del Proyecto

Metatech es una aplicación centrada en la interacción hardware-software (Internet of Things) a través de la Web Bluetooth API. Diseñada para incentivar el reciclaje doméstico, su flujo primario es la recolección de pesos de envases reciclables, cálculo de ganancias, y ubicación de centros de reciclaje.

### Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Estilos | Tailwind CSS 4 |
| Iconos | Lucide React |
| Conectividad | Web Bluetooth API (`navigator.bluetooth`) |
| Lenguaje | TypeScript 5.7 (strict mode) |
| Despliegue | Netlify |

## Estructura de Directorios

```
├── public/                 # Archivos estáticos e iconos
├── src/
│   ├── routes/
│   │   ├── __root.tsx      # Configuración base (Head, metas, layout)
│   │   └── index.tsx       # Landing Page / Dashboard y lógica Bluetooth / Maps
│   ├── router.tsx          # Configuración de TanStack Router
│   └── styles.css          # Estilos globales, variables de Tailwind CSS v4 e importación tipográfica
├── netlify.toml            # Configuración de Netlify (Vite)
├── package.json            # Dependencias
├── tsconfig.json           # Configuración de TypeScript
└── vite.config.ts          # Configuración de Vite
```

## Convenciones de Código y Decisiones Claves

### Diseño de la Interfaz
- **Colores:** La marca Metatech utiliza una base neutra (blanca/gris) con colores primarios como Verde (Neon, Claro, Menta), Azul (Cielo, Profundo) y Morado Real. Estos están definidos en `src/styles.css` utilizando la sintaxis de variables `@theme` de Tailwind v4 (`--color-brand-neon`, `--color-brand-mint`, etc.).
- **Tipografía:** Se usa "Exo 2" para darle una estética tecnológica e intuitiva, importada globalmente en `styles.css`.
- **Iconografía:** Lucide React en todo el proyecto.

### Integración Bluetooth
- Se utiliza Web Bluetooth API, que permite al navegador comunicarse con dispositivos BLE.
- **Limitaciones de Seguridad:** `navigator.bluetooth.requestDevice` **debe** ser desencadenado por un gesto explícito del usuario (ej., un clic en botón). En entornos de producción, Web Bluetooth requiere HTTPS para funcionar, y en desarrollo, `localhost`.
- **Servicios:** Se configuró un Servicio UUID genérico para puerto serie (e.g. `0000ffe0-0000-1000-8000-00805f9b34fb`). Si se emplea un módulo específico para el hardware real y cambian los UUIDs, se deben actualizar en el método `connectBluetooth` de `src/routes/index.tsx`.
- **Simulación:** Se proporciona una función `simulateData()` en caso de no contar con el hardware físico para poder continuar el desarrollo y pruebas de la interfaz de usuario.

### Cómputo de Ganancias
- La constante base para estimar la ganancia económica por kilogramo de material (latas) se definió estáticamente en `$22 MXN` por kilogramo.
- Se lleva un estado acumulativo en el frontend (`totalRecycled` y `totalEarned`) para motivar a los usuarios durante la sesión actual de la app. Para futura persistencia (bases de datos), usar soluciones apropiadas (como Netlify Blobs).

### Integración de Mapas
- Se implementó un "iframe" simple y optimizado con la API de Inserción de Mapas de Google, enfocado en mostrar una búsqueda local para "recicladoras de latas".
