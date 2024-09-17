import { type Request, type Response } from "express";
import { puppeteerHandler } from "../lib/puppeteer";
import { PublicationData } from "../types/publicationData";
import { RequestParam } from "../types/req";

export class ScrapperController {
  static async generateScrap(req: Request<{}, {}, {}, RequestParam>, res: Response) {
    try {
      const { link } = req.query;
      if (!link) {
        return res.status(400).json({ error: 'Link is required' });
      }
      console.log('Generando conexión SSE...');
      console.log('Analizando link:', link);

      // Configura los encabezados para SSE
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const comunicateItems = (message: string) => {
        console.log('Comunicando.', message);
        res.write(`event: comunicate\n`);
        res.write(`data: {"message": "${message}"}\n\n`); // Añade las comillas de cierre y `\n\n`
      };
      

      // Función para enviar los datos al cliente
      const responseSse = (dataArticle: PublicationData) => {
        res.write(`data: ${JSON.stringify(dataArticle)}\n\n`);
      };

      // Inicia el proceso de scraping
      await puppeteerHandler(responseSse, { link }, comunicateItems);

      console.log('Scraping completado');

      // Enviar un mensaje final cuando el scraping se complete
      res.write("event: done\n");
      res.write(`data: {"message": "Scraping completado"}\n\n`);

      // Finalizar la conexión SSE
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
