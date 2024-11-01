import puppeteer from "puppeteer";
import { closeModal } from "./closeModal";
import { getDataOfPageLink } from "./getDataOfPageLink";
import { getAllLinks } from "./getAllLinks";
import { PublicationData } from "../../types/publicationData";
import { type RequestParam } from "../../types/req";

type functionSse = (dataPage: PublicationData) => void;
type functionComunicate = (message: string) => void;

const defaultPublication: Omit<PublicationData ,"link"> = {
  description: "Sin descripción",
  image: "Sin imagen",
  price: "Sin precio",
  title: "Sin titulo",
  uuid:"no tiene uuid"
};

export const puppeteerHandler = async (
  functionSse: functionSse,
  RequestParam: RequestParam,
  functionComunicate: functionComunicate
) => {
  let browser;
  try {
    console.log("Inicializando puppeteer.");
    let message = `Inicializando...`;
    functionComunicate(message);
    browser = await puppeteer.launch({ headless: true, slowMo: 1000 });
    const page = await browser.newPage();
    const { link,timeScroll} = RequestParam;
    
    console.log('llego desde el front estos query params ',link,timeScroll)
    await page.goto(link);
    await closeModal(page);
    // Obtiene todos los links de los artículos
    const articleLinks = await getAllLinks(page,timeScroll);
    message = `Cantidad de articulos encontrados:${articleLinks.length}`;
    functionComunicate(message);

    for (const link of articleLinks) {
      console.log("Analizando:", link);
      const newPageOfLink = await browser.newPage();
      await newPageOfLink.goto(link);
      await closeModal(newPageOfLink);

      // Obtén los datos de la página del artículo
      const dataPage = (await getDataOfPageLink(newPageOfLink)) ?? {
        ...defaultPublication,
        link,
        uuid:"no tiene uuid"
      };

      // Enviar los datos del artículo al cliente mediante SSE
      functionSse(dataPage);
      await newPageOfLink.close();
    }
    message = `scrapeo de articulos terminado`;
    functionComunicate(message);
  } catch (error) {
    console.error("Error en puppeteerHandler:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
