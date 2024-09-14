import puppeteer from "puppeteer";
import { closeModal } from "./closeModal";
import { scrollPage } from "./scroll";
import { getDataOfPageLink } from "./getDataOfPageLink";
import { getAllLinks } from "./getAllLinks";
import { PublicationData } from "../types/publicationData";

export const puppeteerHandler = async () => {
  console.log("inicializando puppeteer");
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
    const page = await browser.newPage();
    const dataOfAllPages: PublicationData[] = [];
    await page.goto(
      "https://www.facebook.com/marketplace/106423786059675/search?minPrice=3000000&maxPrice=7000000&query=gol%20trend&exact=false"
    );
    await closeModal(page);
    const articleLinks = await getAllLinks(page);
    for (const link of articleLinks) {
      const newPageOfLink = await browser.newPage();
      await newPageOfLink.goto(link);
      await closeModal(newPageOfLink);
      const dataPage = await getDataOfPageLink(newPageOfLink);
      if (dataPage) {
        dataOfAllPages.push(dataPage);
      }
      console.log(dataPage);
      // newPageOfLink.close();
    }
    console.log(dataOfAllPages);
  } catch (error) {
    console.log(error);
  }
};

puppeteerHandler();
