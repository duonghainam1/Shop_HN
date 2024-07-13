
import { Iproduct } from "@/intertaces/product";
import { getAllProducts } from "@/services/products";
import { useQuery } from "@tanstack/react-query";


const DetailsList = () => {

    const { data: products, isLoading } = useQuery({
        queryKey: ["PRODUCTS_KEY"],
        queryFn: getAllProducts
    });
    if (isLoading) return <div>Loading...</div>
    const newproducts = Object(products).slice(0, 4);
    return (
        <section className="products">
            <div className="container">
                <div className="products-heading">
                    <p>Related Products</p>
                </div>
                <div className="products-body">
                    <div className="products-body-item">
                        {newproducts?.map((product: Iproduct, index: number) => {
                            return (
                                <div className="products-body">
                                    <div className="item" key={index}>
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
                                            {product.discount}%
                                        </div>
                                        {/* hover */}
                                        <div className="add_cart">
                                            <div className="block_add_cart">
                                                <button>View product</button>
                                                <button>Add to cart</button>
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
                    <div className="item-block-button">
                        <button className="item-block-bnt">Show More</button>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default DetailsList