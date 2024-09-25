
export interface PublicationData {
    uuid:string
    link:string,
    title:string,
    price:string,
    description:string
    image:string
}

export type PublicationDataExclude = Omit<PublicationData,"link"|'uuid'>


export interface PublicationDataFromFront extends PublicationData {
    isFavorite:boolean
}