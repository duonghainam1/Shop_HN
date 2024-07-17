
import instance from "@/config/axios";
import { Banner, Services } from "../../../components/HomePages"
import "@/style/checkout.css"
import { useMutation } from "@tanstack/react-query";
import useCart from "@/hooks/carts/useCartQuery";
import { useLocalStorage } from "@/hooks/useStorage";
import { useForm } from "react-hook-form";
import { Iproduct } from "@/intertaces/product";
import { useToast } from "@/components/ui/use-toast";

const CheckOut = () => {
    const { toast } = useToast()
    const form = useForm();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, calcuateTotal } = useCart();
    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await instance.post("/orders", order);
            return data;
        },
        onSuccess: () => {
            // navigate("/thankyou")
            toast({
                title: "Đặt hàng thành công",
                variant: "success"
            })
        },
    });

    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calcuateTotal(),
            customerInfo: formData,
        });
    };
    return (
        <>
            <Banner />
            <section className="checkout">
                <div className="container">
                    <div className="checkout-block">
                        <div className="bill">
                            <h2 className="bill-heading">Billing details</h2>
                            <form className="form-bill" onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="faaaa">
                                    <div className="bill-body">
                                        <span className="bill-body__name">Name</span>
                                        <input type="text" className="bill-body__input" {...form.register("name")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Email</span>
                                        <input type="text" className="bill-body__input" {...form.register("email")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Phone</span>
                                        <input type="text" className="bill-body__input" {...form.register("phone")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">Address</span>
                                        <input type="text" className="bill-body__input" {...form.register("address")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">City</span>
                                        <input type="text" className="bill-body__input" {...form.register("city")} />
                                    </div>
                                    <div className="bill-body">
                                        <span className="bill-body__name">ZIP code</span>
                                        <input type="text" className="bill-body__input" {...form.register("code")} />
                                    </div>
                                </div>

                                <div className="bill-products">
                                    {data?.products?.map((item: Iproduct, index: number) => (
                                        <div className="bill-products-heading" key={index}>

                                            <div className="bill-products-heading__left">
                                                <p className="heading__left--title">Product</p>
                                                <p className="heading__left--text color">{item.name}</p>
                                                <p className="heading__left--text">Số lượng</p>
                                                <p className="heading__left--text">Ảnh sản phẩm</p>
                                            </div>
                                            <div className="bill-products-heading__right">
                                                <p className="heading__right--title">Subtotal</p>
                                                <p className="heading__right--text">{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                                <p className="heading__right--text">{item.quantity}</p>
                                                <p className="heading__right--text">{
                                                    <img src={item.image} width={100} alt="" />
                                                }</p>

                                            </div>
                                        </div>
                                    ))}
                                    <div className="totals">
                                        <p className="heading__left--text">Total</p>
                                        <p className="heading__right--text orange">{calcuateTotal().toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                    <div className="bill-products-desc">
                                        <div className="w-full p-2 border rounded-t text-xs mb-2">
                                            <div className="w-full">
                                                <div className="border-b mb-2  p-2 w-full">
                                                    <label className="flex items-center w-full">
                                                        <input type="radio" value="vnpay" className="mr-2" defaultChecked {...form.register("payment", { required: true })} />
                                                        <p className="flex-1 text-sm">Thanh toán qua thẻ, ứng dụng ngân hàng VNPAY</p>
                                                    </label>
                                                </div>
                                                <div className="border-b p-2 mb-2 w-full">
                                                    <label className="flex items-center w-full">
                                                        <input type="radio" value="vnpay-qr" className="mr-2" {...form.register("payment", { required: true })} />
                                                        <p className="flex-1 text-sm">Thanh toán qua VNPAY-QR</p>
                                                    </label>
                                                </div>
                                                <div className="mb-2 p-2 w-full">
                                                    <label className="flex items-center w-full">
                                                        <input type="radio" value="Thanh toán tiền mặt" className="mr-2" {...form.register("payment", { required: true })} />
                                                        <p className="text-sm">Thanh toán khi nhận hàng (COD)</p>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <button type="submit" className="desc__btn hover:bg-slate-100">Place order</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
            <Services />
        </>


    )
}

export default CheckOut