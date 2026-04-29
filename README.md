# Metatech - Reciclaje Inteligente

Metatech es una plataforma diseñada para incentivar el reciclaje de latas desde el hogar mediante la integración con hardware externo vía Bluetooth. La aplicación recibe datos de peso de latas compactadas, calcula la ganancia estimada (a un tipo de cambio base de $22 MXN por kg) y ayuda a los usuarios a encontrar centros de reciclaje cercanos mediante Google Maps.

## Tecnologías Principales

- **Framework:** TanStack Start / React 19
- **Estilos:** Tailwind CSS v4 con colores personalizados e integración tipográfica (Exo 2).
- **Conectividad:** Web Bluetooth API para recepción de datos en tiempo real de módulos serie BLE (ej. HM-10, CC2541).
- **Iconografía:** Lucide React
- **Mapas:** Google Maps Embed API

## Requisitos Previos

- Node.js (v20 o superior recomendado)
- Un navegador compatible con Web Bluetooth API (Chrome, Edge, Opera) - requiere uso sobre HTTPS en producción, o en localhost para desarrollo.

## Instalación y Uso Local

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre tu navegador en `http://localhost:3000`

## Conexión Bluetooth

Para utilizar la conexión Bluetooth en desarrollo, puedes presionar "Conectar a Dispositivo" e interactuar con un microcontrolador que cuente con módulo BLE y el perfil serie genérico (Service UUID `0000ffe0-0000-1000-8000-00805f9b34fb`). Si no cuentas con el dispositivo de hardware, puedes utilizar el botón "Simular Datos".
