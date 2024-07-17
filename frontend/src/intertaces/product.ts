export interface Iproduct {
    _id?: number | string,
    name: string,
    price: number,
    category?: string,
    image: string,
    quantity?: number,
    gallery?: string[],
    description: string,
    discount: number,
    featured?: boolean,
    countInStock: number

}