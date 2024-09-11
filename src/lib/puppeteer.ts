import puppeteer from "puppeteer";
import { closeModal } from "./closeModal";
import { scrollPage } from "./scroll";

export const puppeteerHandler = async () => {
  console.log("inicializando puppeteer");
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
    const page = await browser.newPage();
    await page.goto(
      "https://www.facebook.com/marketplace/106423786059675/search?minPrice=2000000&maxPrice=3000000&query=kawasaki&exact=false"
    );
    await closeModal(page);
    await scrollPage(page)
    const arrayLinks = await page.evaluate(() => {
      const nodesMarketPlace = (globalThis as any).document.querySelectorAll(
        'a[href^="/marketplace/item/"]'
      );
      const data = [...nodesMarketPlace].map((node) => {
        return node.href;
      });
      return data
    });
    console.log(arrayLinks)
    await page.screenshot({ path: "example.png" });
  } catch (error) {
    console.log(error);
  }
};

puppeteerHandler();

/**
 * 
 * // Selecciona todos los elementos <a> cuyo href comience con "/marketplace/item/"
const anchors = document.querySelectorAll('a[href^="/marketplace/item/"]');

// Itera sobre los nodos y accede al atributo href
anchors.forEach(anchor => {
    console.log(anchor.href); // Muestra el valor del href de cada <a>
});

 * 
 * 
 */
