import puppeteer from 'puppeteer';
import { Page } from 'puppeteer';
import { PublicationData } from '../../types/publicationData';
import { v4 as uuidv4 } from 'uuid';
export const getDataOfPageLink = async (page: Page): Promise<PublicationData | null> => {
  try {
    const dataOfPage = await page.evaluate(async () => {
      const linkPage = (globalThis as any ).window.location.href;
      const firstImageElement=(globalThis as any) .document.querySelector('img') 
      const titleElement = (globalThis as any ).document.querySelector('h1 span');
      const title = titleElement ? titleElement.textContent?.trim() : 'No title';
      const img=firstImageElement.src
      const priceElement  = Array.from((globalThis as any ).document.querySelectorAll('span')).find((span :any) =>
        span.textContent?.trim().startsWith('$')
      ) as any
      const price = priceElement ? priceElement.textContent?.trim() : 'No price'

      let textFromSpans: string[] = [];

      // Buscar el div de descripción
      const divDescription = (globalThis as any ).document.querySelector('div.xz9dl7a.x4uap5.xsag5q8.xkhd6sd.x126k92a');
      if (divDescription) {
        // Esperar a que el botón sea clickeado
        const button = divDescription.querySelector('div[role="button"]');
        if (button) {
          await new Promise<void>(resolve => {
            button.addEventListener('click', () => {
              resolve();
            }, { once: true });
            button.click();
          });
        }

        // Extraer los spans después del clic
        const spansInDiv = divDescription.querySelectorAll('span');
        textFromSpans = Array.from(spansInDiv).map((span:any) => span.textContent?.trim() || '');
      } else {
        console.log('No se encontró ningún div con esa clase.');
      }
      const combinedText = textFromSpans.join(' ');

      return {
        title: title,
        price: price,
        description: combinedText,
        link: linkPage,
        image:img
      };
    });
    
    return {
      ...dataOfPage,
      uuid:uuidv4()
    };
  } catch (error) {
    console.error('Intentando recolectar data ha ocurrido un error:', error);
    return null;
  } finally {
    console.log('Data extraction attempt finished');
  }
};
