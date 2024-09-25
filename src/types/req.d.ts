import { type PublicationData } from "./publicationData"
export interface RequestParam {
    link:string
    timeScroll:number
}

export interface RequestBody {
    body:PublicationData[]
}