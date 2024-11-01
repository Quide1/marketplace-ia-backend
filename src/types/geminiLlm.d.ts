import { PublicationDataFromFront } from "./publicationData";

export interface GenerateTextParams {
    questionPrompt:string,
    dataArticles:PublicationDataFromFront[]
}