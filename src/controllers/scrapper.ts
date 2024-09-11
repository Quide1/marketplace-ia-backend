import { type Request, type Response } from "express";
import { puppeteerHandler } from "../lib/puppeteer";
export class ScrapperController {
  static async getAll(req: Request, res: Response) {
    console.log("Get all");
    puppeteerHandler()
    return res.json({message:"hola desde get all"});
  }
  static async generateContent(req: Request, res: Response) {
    return res.json({message:"hola desde generate content"});
  }
}
