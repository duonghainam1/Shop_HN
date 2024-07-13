import useCartMutations from "@/hooks/carts/useCartMutations";
import { Iproduct } from "@/intertaces/product"
import { getAllProducts } from "@/services/products"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

type ProductListProps = {
    featured?: boolean;
    data?: Iproduct[];
};
const ProductsListShop = ({ featured, data }: ProductListProps) => {
    const { mutate } = useCartMutations()
    const { data: products, isLoading } = useQuery({
        queryKey: ["PRODUCTS_KEY"],
        queryFn: getAllProducts
    })
    const filteredProducts = featured
        ? products?.filter((product: Iproduct) => product?.featured == featured)
        : data
            ? data
            : products;
    if (isLoading) return <div>Loading...</div>
    return (
        < section className="new1" >
            <div className="container">
                <div className="products-body-item">
                    {filteredProducts?.map((product: Iproduct, index: number) => {
                        return (

                            <div className="products-body" key={index}>
                                <div className="item">
                                    <div className="item__img">
                                        <img src={product.image} alt="" />
                                    </div>
                                    <div className="box__item">
                                        <h1 className="box_heading">{product.name}</h1>
                                        <p className="box_text">Stylish cafe chair</p>
                                        <div className="box_price">
                                            <p className="price_left">{product?.price - (product?.price * (product.discount / 100))}</p>
                                            <p className="price_right"> <s>{product.price}</s> </p>
                                        </div>
                                    </div>
                                    <div className="item_sale">
                                        -30%
                                    </div>
                                    {/* hover */}
                                    <div className="add_cart">
                                        <div className="block_add_cart">
                                            <Link to={`/details/${product._id}`}><button>View product</button></Link>
                                            <button onClick={() => mutate({ product: product._id, quantity: 1 })}>Add to cart</button>
                                            <div className="operation">
                                                <div className="sections">
                                                    <i className="fa-solid fa-share-nodes" />
                                                    <span>share</span>
                                                </div>
                                                <div className="sections">
                                                    <i className="fa-solid fa-right-left" />
                                                    <span>compare</span>
                                                </div>
                                                <div className="sections">
                                                    <i className="fa-regular fa-heart" />
                                                    <span>like</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </section >

    )
}

export default ProductsListShop