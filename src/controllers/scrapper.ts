import { type Request, type Response } from "express";
import { puppeteerHandler } from "../lib/puppeteer/puppeteer";
import { PublicationData } from "../types/publicationData";
import { RequestParam } from "../types/req";

export class ScrapperController {
  static async generateScrap(req: Request<{}, {}, {}, RequestParam>, res: Response) {
    try {
      const { link,timeScroll} = req.query;

      if (!link) {
        return res.status(400).json({ error: 'Link is required' });
      }
      console.log('Generando conexión SSE...');
      console.log('Analizando link:', link);

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const comunicateItems = (message: string) => {
        res.write(`event: comunicate\n`);
        res.write(`data: {"message": "${message}"}\n\n`); 
      };
      

      const responseSse = (dataArticle: PublicationData) => {
        res.write(`data: ${JSON.stringify(dataArticle)}\n\n`);
      };

      await puppeteerHandler(responseSse,  {link,timeScroll} , comunicateItems);

      console.log('Scraping completado');

      res.write("event: done\n");
      res.write(`data: {"message": "Scraping completado"}\n\n`);

      res.end();
    } catch (error) {
      console.error('Error en generateScrap:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async generateContent(req: Request, res: Response) {
    return res.json({ message: "Hola desde generate content" });
  }
}
