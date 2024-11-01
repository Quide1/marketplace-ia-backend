import { Page } from "puppeteer";
/**
 * Puppeteer, cuando evalúa acepta una función y  por segundo parámetro los parámetros para la función es como un puente entre nodejs
 * y chromium
 */
export const scrollPage = async (page: Page, maxTimeScroll: number) => {
  await page.evaluate(
    async (maxTimeScroll:number, distance:number, delay:number) => {
      return new Promise<void>((resolve) => {
        const startTime = Date.now();

        const scrollInterval = setInterval(() => {
          const currentTime = Date.now();

          // Si se ha alcanzado el tiempo máximo de scroll, detén el scroll
          if (currentTime - startTime >= maxTimeScroll) {
            clearInterval(scrollInterval);
            resolve();
          }

          // Obtener la altura actual del scroll
          const scrollHeight = (globalThis as any).document.body.scrollHeight;
          const currentScrollPosition = (globalThis as any).window.scrollY + (globalThis as any).window.innerHeight;

          // Si hemos llegado al final de la página, detener el scroll
          if (currentScrollPosition >= scrollHeight) {
            clearInterval(scrollInterval);
            resolve();
          }

          // Desplazarse hacia abajo
          (globalThis as any).window.scrollBy(0, distance);
        }, delay);
      });
    },
    maxTimeScroll, // Tiempo máximo para scrollear
    75,            // Distancia en píxeles que se desplazará por cada intervalo
    1000            // Delay entre desplazamientos en milisegundos
  );
};
