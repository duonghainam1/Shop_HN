
import { Query_Orders } from "@/hooks/order/Querry_Order";
import { useParams } from "react-router-dom";
const Order_Detail = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = Query_Orders(id);
    if (!data) return <p>Loading...</p>;
    return (
        <>
            <h1 className="font-bold text-3xl text-orange-400 mt-16 text-center">Chi tiết đơn hàng</h1>
            <div className="overflow-x-auto my-6 shadow-lg p-[20px] rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 h-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh sản phẩm</th>
                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.items.map((item: any) => (
                            <tr key={item._id}>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900 flex justify-center">
                                    <img src={item.image} alt="" className="w-[50px] h-[50px] object-cover " />
                                </td>
                                <td className="py-4 px-6 text-sm  text-gray-500 text-left">{item.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-500 text-center">{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                <td className="py-4 px-6 text-sm text-gray-500 text-center">{item.quantity}</td>
                                <td className="py-4 px-6 text-sm text-gray-500 text-center">{(item.price * item.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="bg-white divide-y divide-gray-200">
                    <div className="flex justify-between py-4">
                        <p>Đơn vị vận chuyển</p>
                        <p>Giao hàng tiết kiệm: 20000 đ</p>
                    </div>
                    <div className="flex gap-8 py-4">
                        <span className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-ticket text-orange-300">
                                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                                <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
                            </svg>
                            <p>Voucher</p>
                        </span>
                        <p>Mã voucher:</p>
                    </div>
                    <p className="flex justify-end py-4 font-bold">Tổng tiền:<span className="text-orange-300 pl-2"> {data.totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })} </span></p>
                </div>
            </div>
            <div className="overflow-x-auto my-6 shadow-lg p-[20px] rounded-lg">
                <div className="flex items-center gap-4 my-3 border-b py-3">
                    <p>Phương thức thanh toán</p>
                    <p className="w-auto p-3 border-2 border-orange-300 text-orange-300">{data.customerInfo.payment}</p>
                </div>
                <div className="flex items-center gap-4 border-b py-3">
                    <p>Trạng thái đơn hàng</p>
                    <p className="w-auto p-3 border-2 border-orange-300 text-orange-300">{data?.status}</p>
                </div>
                <div className="flex justify-between my-4">
                    <div className="flex gap-6">
                        <div>
                            <p>Tên khách hàng:</p>
                            <p>Số điện thoại:</p>
                            <p>Địa chỉ Email:</p>
                            <p>Địa chỉ khách hàng:</p>
                        </div>
                        <div>
                            <p>{data.customerInfo.name}</p>
                            <p>{data.customerInfo.phone}</p>
                            <p>{data.customerInfo.email}</p>
                            <p>{data.customerInfo.address}</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <p>Tổng tiền hàng:</p>
                            <p>Tổng giảm giá:</p>
                            <p>Phí vận chuyển:</p>
                            <p>Tổng thanh toán:</p>
                        </div>
                        <div>
                            <p>{data.totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            <p>10000</p>
                            <p>20000 đ</p>
                            <p className="text-orange-300">{(data.totalPrice - 10000 + 20000).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 justify-center mt-[60px]">
                    <button className="w-auto p-3 bg-yellow-500 rounded-lg text-white">
                        Xác nhận
                    </button>
                </div>

            </div>
        </>
    );
};

export default Order_Detail;
