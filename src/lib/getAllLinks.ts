import { Page } from "puppeteer";
import { scrollPage } from "./scroll";
export const getAllLinks = async(page:Page)=>{
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
    return arrayLinks
}