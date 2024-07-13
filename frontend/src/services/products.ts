import instance from "@/config/axios"
import { Iproduct } from "@/intertaces/product";

export const getAllProducts = async (): Promise<Iproduct[]> => {
    try {
        const response = await instance.get("/products")
        return response.data
    } catch (error) {
        return []

    }
}
export const getProductsById = async (_id: number | string) => {
    try {
        const response = await instance.get(`/products/${_id}`)
        return response.data
    } catch (error) {
        return error

    }
}
export const addProducts = async (product: Iproduct) => {
    try {
        const response = await instance.post(`/products`, product)
        return response.data
    } catch (error) {
        return error

    }
}
export const updateProducts = async (product: Iproduct) => {
    try {
        const response = await instance.put(`/products/${product._id}`, product)
        return response.data
    } catch (error) {
        return error

    }
}

export const deleteProducts = async (_id: number | string) => {
    try {
        const response = await instance.delete(`/products/${_id}`)
        console.log(response);

        return response.data
    } catch (error) {
        return error

    }
}