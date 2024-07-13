import { getAllProducts, getProductsById } from "@/services/products"
import { useQuery } from "@tanstack/react-query"

const useProductsQuery = (id?: number | string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["PRODUCT_KEY", id],
        queryFn: async () => (id ? await getProductsById(id) : await getAllProducts())
    });
    return { data, ...rest }
}
export default useProductsQuery