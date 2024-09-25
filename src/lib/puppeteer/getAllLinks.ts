import { Page } from "puppeteer";
import { scrollPage } from "./scroll";
export const getAllLinks = async(page:Page,timeScroll:number)=>{
   await scrollPage(page,timeScroll)
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