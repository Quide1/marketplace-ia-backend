import puppeteer from "puppeteer";
import { closeModal } from "./closeModal";
import { scrollPage } from "./scroll";
import { getDataOfPageLink } from "./getDataOfPageLink";

export const puppeteerHandler = async () => {
  console.log("inicializando puppeteer");
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
    const page = await browser.newPage();
    await page.goto(
      "https://www.facebook.com/marketplace/item/1224815315224535/?ref=search&referral_code=null&referral_story_type=post"
    );
    await closeModal(page);
   
    const link ="https://www.facebook.com/marketplace/item/1224815315224535/?ref=search&referral_code=null&referral_story_type=post"
    console.log(link)
    const dataPage = await getDataOfPageLink(
      page,
    );
    console.log(dataPage);
  } catch (error) {
    console.log(error);
  }
};

puppeteerHandler();

