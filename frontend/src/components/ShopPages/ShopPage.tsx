import { Banner, Services } from "../HomePages"
import { Filter, ProductsListShop, Next, Category } from "./indexShop"



const ShopPage = () => {
    return (
        <>
            <Banner />
            <Filter />
            <Category />
            <ProductsListShop />
            <Next />
            <Services />
        </>
    )
}

export default ShopPage