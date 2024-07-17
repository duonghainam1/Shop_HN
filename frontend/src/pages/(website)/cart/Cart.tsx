import useCart from "@/hooks/carts/useCartQuery"
import { Banner, Services } from "../../../components/HomePages"
import "@/style/cart.css"
import { Link } from "react-router-dom";
const Cart = () => {
    const { data, isLoading, mutate, calcuateTotal } = useCart();
    console.log(data);

    if (isLoading) return <div>...Loading</div>
    return (
        <>
            <Banner />
            <section className="cart">
                <div className="container">
                    <div className="cart-block">
                        <div className="cart-detalis">
                            <table className="cart-detalis-table relative">
                                <thead className="table-thead">
                                    <tr>
                                        <th />
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th />
                                    </tr>
                                </thead>
                                {!data?.products || data?.products.length === 0 ? (
                                    <div className=" w-full flex justify-center py-10 absolute">
                                        <div className="">
                                            <img
                                                src="../../src/assets/no_products.png"
                                                className="w-44 h-40"
                                                alt=""
                                            />
                                            <p>Chưa có sản phẩm nào</p>
                                        </div>
                                    </div>
                                ) : (
                                    <tbody className="table-tbody">
                                        {data?.products.map((product: any, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="table-tbody__img">
                                                            <img src={product.image} alt="" />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="table-tbody__name">{product.name}</span>
                                                    </td>
                                                    <td>
                                                        <span className="table-tbody__name">{product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                                    </td>
                                                    <td className="quantity">
                                                        <button className="btn reduce" onClick={() => mutate({ action: "reduce", product: product.product })}>-</button>
                                                        <div>{product.quantity}</div>
                                                        <button className="btn increase" onClick={() => mutate({ action: "increase", product: product.product })}>+</button>
                                                    </td>
                                                    <td>
                                                        <span className="table-tbody__name">{(product.price * product.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                                    </td>
                                                    <td>
                                                        <div className="table-body__icon">
                                                            <button onClick={() => mutate({ action: "delete", product: product.product })}><i className="fa-solid fa-trash" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                )}

                            </table>
                        </div>
                        <div className="cart-totals">
                            <h2 className="cart-totals__heading">
                                Cart Totals
                            </h2>
                            <div className="cart-totals-block">
                                <div className="cart-totals-block__text">
                                    <p className="cart-totals-block__name">Subtotal</p>
                                    <p className="cart-totals-block__name">Total</p>
                                </div>
                                <div className="cart-totals-block__number">
                                    <p className="cart-totals-block__number--name price">25.000.000đ</p>
                                    <p className="cart-totals-block__number--name color">${calcuateTotal().toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                            </div>
                            <Link to={`/checkout`}><button className="cart-totals__btn">Check Out</button></Link>
                        </div>
                    </div>
                </div>
            </section>
            <Services />
        </>
    )
}

export default Cart