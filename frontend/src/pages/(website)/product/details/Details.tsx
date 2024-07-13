import useCartMutations from "@/hooks/carts/useCartMutations";
import useProductsQuery from "@/hooks/products/useProductsQuery";
import { useParams } from "react-router-dom";


const Details = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useProductsQuery(id!);

    const { mutate } = useCartMutations()
    if (isLoading) return <div>Loading...</div>
    return (
        <section className="products-detalis" >
            <div className="container" >
                <div className="products-detalis__item">
                    <div className="prodcus-detalis__left">
                        <div className="prodcus-detalis__left__img--small">
                            {product.gallery.map((item: any, index: number) => (
                                <img key={index} src={item} alt="" />
                            ))}
                        </div>
                        <div className="prodcus-detalis__left__img--big">
                            <img src={product.image} alt="" />
                        </div>
                    </div>
                    <div className="prodcus-detalis__right">
                        <p className="tilte__name">{product.name}</p>
                        <p className="price__color">{product.price}</p>
                        <div className="prodcus-detalis__right-evaluste">
                            <div className="evaluste__star">
                                <img src="img/products_detalis/Vector.png" alt="" />
                                <img src="img/products_detalis/Vector.png" alt="" />
                                <img src="img/products_detalis/Vector.png" alt="" />
                                <img src="img/products_detalis/Vector.png" alt="" />
                                <img src="img/products_detalis/Vector 1.png" alt="" />
                            </div>
                            <span className="evaluste__text">5 Customer Review</span>
                        </div>
                        <p className="desc">
                            {product.description}
                        </p>
                        <div className="prodcus-detalis__right-size">
                            <p className="size__name">Size</p>
                            <div className="size__button">
                                <button className="size__button--btn">S</button>
                                <button className="size__button--btn">XL</button>
                                <button className="size__button--btn">XS</button>
                            </div>
                        </div>
                        <div className="prodcus-detalis__right-color">
                            <p className="size__name">Color</p>
                            <div className="size__button">
                                <button className="color__button--color blue" />
                                <button className="color__button--color black" />
                                <button className="color__button--color orange" />
                            </div>
                        </div>
                        <div className="prodcus-detalis__right-cart">
                            <div className="cart__btn--quality">
                                <button className="btn--quality__box"> - </button>
                                <button className="btn--quality__box">1</button>
                                <button className="btn--quality__box"> + </button>
                            </div>
                            <button className="cart__btn" onClick={() => mutate({ product: product._id, quantity: 1 })}>Add To Cart</button>
                            <button className="cart__btn">+ Compare</button>
                        </div>
                        <div className="prodcus-detalis__right-block">
                            <div className="block__left">
                                <div className="block--name">SKU</div>
                                <div className="block--name">Category</div>
                                <div className="block--name">Tags</div>
                                <div className="block--name">Share</div>
                            </div>
                            <div className="block__left">
                                <div className="block--name">:</div>
                                <div className="block--name">:</div>
                                <div className="block--name">:</div>
                                <div className="block--name">:</div>
                            </div>
                            <div className="block__left">
                                <div className="block--name">SS001</div>
                                <div className="block--name">Sofas</div>
                                <div className="block--name">Sofa, Chair, Home, Shop</div>
                                <div className="block--name">
                                    <a href="#" className="block--link"><i className="fa-brands fa-facebook" /></a>
                                    <a href="#" className="block--link"><i className="fa-brands fa-invision" /></a>
                                    <a href="#" className="block--link"><i className="fa-brands fa-square-twitter" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Details