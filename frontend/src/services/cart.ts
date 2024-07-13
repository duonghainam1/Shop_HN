import instance from "@/config/axios"


export const getAllCart = async (): Promise<number[]> => {
    try {
        const response = await instance.get(`/cart`)
        return response.data
    } catch (error) {
        return []
    }
}