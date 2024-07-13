import { getAllCategory, getCategoryById } from "@/services/category"
import { useQuery } from "@tanstack/react-query"

const useCategoryQuery = (id?: number | string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["CATEGORY_KEY", id],
        queryFn: async () => (id ? await getCategoryById(id) : await getAllCategory())

    })
    return { data, ...rest }
}
export default useCategoryQuery