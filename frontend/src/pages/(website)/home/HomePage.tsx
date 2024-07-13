
import { Banner, Blog, ProductsList, Services, Shop } from "../../../components/HomePages/index"


const HomePage = () => {
    return (
        <>
            <Banner />
            <ProductsList featured={true} />
            <Shop />
            <Blog />
            <Services />
        </>
    )
}

export default HomePage