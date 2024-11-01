import { type PublicationData } from "./publicationData"
import { GenerateTextParams } from "./geminiLlm"
export interface RequestParam {
    link:string
    timeScroll:number
}
export interface RequestBody extends GenerateTextParams {}
