import { json, type Request, type Response } from "express";
import { RequestBody } from "../types/req";
import { generateText } from "../lib/gemini/gemini";
export class llmController {
  static async generateResponse(req: Request<RequestBody>, res: Response) {
    try {
      const {questionPrompt,dataArticles} = req.body
      if(!questionPrompt || !dataArticles){
        return res.json({
          status:"303",
          data:"Faltan campos"
        })
      }
      const generateTextParams={questionPrompt,dataArticles}
      const text = await generateText(generateTextParams)
      res.json({
        status:"200",
        data:text
      })
  }catch(e){
console.log(e)
  }
  }

}
