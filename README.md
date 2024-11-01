# Backend para Scraping con IA en Facebook

Este backend es la parte del servidor de una aplicación diseñada para hacer scraping de datos en Facebook utilizando una inteligencia artificial. Fue desarrollado con **Express** y **TypeScript**, e integra la **API de Gemini** junto con **Puppeteer** para el scraping automatizado. También utiliza **Server-Sent Events (SSE)** para la transmisión de datos en tiempo real al frontend.

## Tecnologías Utilizadas

- **Express**: Framework para crear y gestionar el servidor HTTP.
- **TypeScript**: Proporciona tipado estático para mayor robustez y mantenimiento del código.
- **API de Gemini**: Servicio de inteligencia artificial utilizado para el procesamiento de datos.
- **Puppeteer**: Herramienta para la automatización del navegador, utilizada en el scraping de datos de Facebook.
- **Server-Sent Events (SSE)**: Protocolo para la transmisión de datos en tiempo real desde el servidor al frontend.

## Características

- **Scraping de datos en Facebook**: Se utiliza Puppeteer para simular un navegador y realizar scraping.
- **Procesamiento con IA**: La API de Gemini procesa la información extraída antes de enviarla al frontend.
- **Transmisión en tiempo real con SSE**: Los datos procesados se envían al frontend a medida que están disponibles.
- **Desarrollo con TypeScript**: Mejora la estabilidad del código y facilita el mantenimiento.

## Instalación

```bash
# Clona el repositorio
git clone https://github.com/Quide1/marketplace-ia-backend

# Instala las dependencias
cd marketplace-ia-backend
npm install

# Inicia el servidor en modo desarrollo
npm run dev
