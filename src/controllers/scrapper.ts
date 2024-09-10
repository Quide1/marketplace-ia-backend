import { type Request, type Response } from "express";
export class ScrapperController {
  static async getAll(req: Request, res: Response) {
    console.log("Get all");
    return res.json();
  }
  static async generateContent(req: Request, res: Response) {
    return res.json();
  }
}
