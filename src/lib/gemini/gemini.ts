// Importa las dependencias necesarias
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { PublicationDataFromFront } from "../../types/publicationData";
import { type GenerateTextParams } from "../../types/geminiLlm";

export const generateText = async ({dataArticles,questionPrompt}:GenerateTextParams) => {

  if (!process.env.API_KEY_GEMINI) {
    throw new Error("API_KEY_GEMINI is missing");
  }
  console.clear()
  console.count("default")
  console.log('Por parametors a la funcion de generateText llego: \n',dataArticles,"\n",questionPrompt,"\n")
  const schema = {
    description: "Response with message and articles",
    type: SchemaType.OBJECT,
    properties: {
      message: {
        type: SchemaType.STRING,
        description: "Respuesta a la pregunta hecha por el usuario",
        nullable: false,
      },
      articlesResponse: {
        type: SchemaType.ARRAY,
        description: "Arreglo con los uuid de los articulos de facebook",
        nullable: false,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            uuid: {
              type: SchemaType.STRING,
              description: "uuid de un articulo",
              nullable: false,
            },
          },
          required: ["uuid"],
        },
      },
    },
    required: ["message", "articlesResponse"],
  };

  const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });
  const prompt = `Recibirás una lista de objetos y una pregunta. Responde únicamente con el uuid del artículo o los artículos que respondan a la pregunta. Por ejemplo, si se proporciona un arreglo de artículos de limpieza y se pregunta "¿Cuál es el más barato?", responde con el uuid del más barato. Ejemplo: si llega [{articulo1: "300$",uuid:"43943"}, {articulo2: "1200$,uuid:"43941"}], responde: "El artículo más barato es el artículo 1, que cuesta 300$", uuid:"43943". Pregunta: ${questionPrompt}`;

  const result = await model.generateContent([
    prompt,
    JSON.stringify(dataArticles),
  ]);
  const responseString = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text
  if(responseString){
    const response = JSON.parse(responseString)
    console.log('response parts:\n',responseString)
    console.log('---------------')
    return response
  }

return responseString;

};
1