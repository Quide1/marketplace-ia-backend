// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateText = async ()=>{
    if(!process.env.API_KEY_GEMINI){
        return 
    }
    const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = "Nombre de messi";
    
    const result = await model.generateContent(prompt);
   return result
}