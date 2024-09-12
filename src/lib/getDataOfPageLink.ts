import { Page } from "puppeteer";
import { PublicationData } from "../types/publicationData";

export const getDataOfPageLink = async (
  page: Page
): Promise<PublicationData | null> => {
  try {
    /**
     * -1 get a h1 title element
     * -2 get a price
     */
    const dataOfPage = await page.evaluate(() => {
      const linkPage = (globalThis as any).window.location.href as string;

      const titleElement = (globalThis as any).document
        .querySelector("h1")
        .querySelector("span");
      const title = titleElement
        ? titleElement.textContent?.trim()
        : "No title";

      const priceElement = Array.from(
        (globalThis as any).document.querySelectorAll("span")
      ).find((span: any) => span.textContent.trim().startsWith("$"));
      const price = priceElement
        ? (priceElement as any).textContent.trim()
        : "No price";

      let textFromSpans: string[] = [];

      // Buscar el último div con la clase exacta 'xod5an3'
      const divsWithExactClass = Array.from(
        (globalThis as any).document.querySelectorAll("div.xod5an3")
      ).filter((div: any) => div.classList.length === 1);

      const ultimoDiv = divsWithExactClass[divsWithExactClass.length - 1];

      if (ultimoDiv) {
        // Intentar hacer clic en el botón si existe
        const button: any = (ultimoDiv as any).querySelector('[role="button"]');

        if (button) {
          button.click();
          console.log("Se hizo clic en el botón.");
        } else {
          console.log("No se encontró ningún botón con role='button'.");
        }
        // Si se encuentra el último div, extraer los spans y su contenido
        const spansInDiv: any = (ultimoDiv as any).querySelectorAll("span");
        textFromSpans = Array.from(spansInDiv).map(
          (span: any) => span.textContent?.trim() || ""
        );
        const combinedText = textFromSpans.join(" ");
      } else {
        console.log("No se encontró ningún div con esa clase.");
      }
      const combinedText = textFromSpans.join(" ");
      console.log(title, price, textFromSpans, linkPage);

      return {
        title: title,
        price: price,
        description: combinedText,
        link: linkPage,
      };
    });

    return dataOfPage;
  } catch (error) {
    console.error("Intentando recolectar data ha ocurrido un error:", error);
    return null;
  } finally {
    console.log("Data extraction attempt finished");
  }
};
