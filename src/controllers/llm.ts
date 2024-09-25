import { type Request, type Response } from "express";
import { RequestParam } from "../types/req";
import { generateText } from "../lib/gemini/gemini";
export class llmController {
  static async generateResponse(req: Request<{}, {}, {}, RequestParam>, res: Response) {
    try {
      const text = await generateText()
      res.json({
        status:"200",
        data:text
      })
  }catch(e){
console.log(e)
  }
  }

}
