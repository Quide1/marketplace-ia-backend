import { Page } from "puppeteer";

/** Facebook modal is closed with this function */
export const closeModal = async (page: Page) => {
  page.evaluate(() => {
    try {
      const selectorModal = 'div[role="dialog"] div[aria-label="Cerrar"]';
      const modal = (globalThis as any).document.querySelector(selectorModal);
      if (modal) {
        modal.click();
        console.log("Modal cerrado");
      } else {
        console.log("Modal no encontrado");
      }
    } catch (error) {
      console.error("Intentando cerrar el modal ha ocurrido un error:", error);
    } finally {
      console.log("close modal finally");
    }
  });
};
