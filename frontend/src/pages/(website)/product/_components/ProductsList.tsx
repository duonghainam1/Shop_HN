import useCartMutations from "@/hooks/carts/useCartMutations";
import { Iproduct } from "@/intertaces/product";
import { getAllProducts } from "@/services/products";
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom";
type ProductListProps = {
    featured?: boolean;
};
const ProductsList = ({ featured }: ProductListProps) => {
    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["PRODUCTS"],
        queryFn: getAllProducts
    });
    const { mutate } = useCartMutations()
    const filteredProducts = featured
        ? products?.filter((product: Iproduct) => product?.featured == featured)
        : products;
    console.log(filteredProducts);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Lỗi rồi</div>
    const newproducts = Object(filteredProducts).slice(0, 4);
    return (
        <section className="new">
            <div className="container">
                <h1 className="new-heading">New</h1>
                <div className="products-body-item">
                    {newproducts?.map((item: Iproduct, index: number) => {
                        return (
                            <div className="products-body" key={index}>
                                <div className="item">
                                    <div className="item__img">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="box__item">
                                        <h1 className="box_heading">{item.name}</h1>
                                        <p className="box_text">Stylish cafe chair</p>
                                        <div className="box_price">
                                            <p className="price_left">{item?.price - (item?.price * (item.discount / 100))}</p>
                                            <p className="price_right"> <s>{item.price}</s> </p>
                                        </div>
                                    </div>
                                    <div className="item_sale">
                                        {item?.discount}%
                                    </div>
                                    {/* hover */}
                                    <div className="add_cart">
                                        <div className="block_add_cart">
                                            <Link to={`/details/${item._id}`}><button>View product</button></Link>
                                            <button onClick={() => mutate({ product: item._id, quantity: 1 })}>Add to cart</button>
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
export default ProductsList