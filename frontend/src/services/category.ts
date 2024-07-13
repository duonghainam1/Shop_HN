
import instance from "@/config/axios"
import { ICategory } from "@/intertaces/Icategory"

export const getAllCategory = async () => {
    try {
        const response = await instance.get("/category")
        return response.data
    } catch (error) {
        return []

    }
}
export const getCategoryById = async (id: number | string) => {
    try {
        const response = await instance.get(`/category/${id}`)
        return response.data
    } catch (error) {
        return error

    }
}
export const addCategory = async (category: ICategory) => {
    try {
        const response = await instance.post(`/category`, category)
        return response.data
    } catch (error) {
        return error

    }
}
export const deleteCategory = async (id: number | string) => {
    try {
        const response = await instance.delete(`/category/${id}`)
        return response.data
    } catch (error) {
        return error

    }
}


export const updateCategory = async (category: ICategory) => {
    try {
        const response = await instance.put(`/category/${category._id}`, category)
        return response.data

    } catch (error) {

    }
}