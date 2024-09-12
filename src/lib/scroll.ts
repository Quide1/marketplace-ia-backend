import { Page } from "puppeteer";
/**
 * Puppeteer, cuando evalúa acepta una función y  por segundo parámetro los parámetros para la función es como un puente entre nodejs
 * y chromium
 */
export const scrollPage = async (page: Page, maxTimeScroll = 800) => {
  await page.evaluate(
    async (maxTimeScroll, distance, delay) => {
      return new Promise<void>((resolve) => {

        const intervalId = setInterval(() => {
          (globalThis as any).window.scrollBy(0, distance);
        }, delay);
        setTimeout(() => {
          clearInterval(intervalId);
          resolve(); 
        }, maxTimeScroll);
      });
    },
    maxTimeScroll, 
    75,            
    700           
  );
};
