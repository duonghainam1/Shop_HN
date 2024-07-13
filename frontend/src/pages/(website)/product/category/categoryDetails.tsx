import instance from "@/config/axios"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import ProductsListShop from "../../../../components/ShopPages/ProductsListShop"
import { Banner } from "../../../../components/HomePages"

const CategoryDetails = () => {
    const { id } = useParams()
    const { data, isLoading } = useQuery({
        queryKey: ["CATEGORY_DETAILS", id],
        queryFn: async () => {
            const { data } = await instance.get(`/category/${id}`)
            return data
        }
    })
    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <Banner />
            <section className="new">
                <div className="container">
                    <h1 className="new-heading">Danh mục: {data.category.name} </h1>
                </div >
                <div>
                    <ProductsListShop data={data.product} />
                </div>
            </section >
        </>
    )
}

export default CategoryDetails