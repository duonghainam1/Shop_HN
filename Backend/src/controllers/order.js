import Order from "../models/order.js";
import { StatusCodes } from "http-status-codes";

export const createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice, customerInfo } = req.body;
        const order = await Order.create({ userId, items, totalPrice, customerInfo });
        return res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
export async function get_orders_client(req, res) {
    const {
        _page = 1,
        _limit = 7,
        _sort = '',
        _search = '',
        _status = ''
    } = req.query;

    const options = {
        page: _page,
        limit: _limit,
        sort: _sort ? { [_sort]: 1 } : { createdAt: -1 }  // Sắp xếp theo trường _sort nếu có, mặc định sắp xếp theo ngày tạo mới nhất
    };

    const query = {};

    // if (_search) {
    //   query._id = { $regex: _search, $options: 'i' };  // Tìm kiếm theo tên khách hàng
    // }

    if (_status) {
        query.status = _status;  // Lọc theo trạng thái đơn hàng
    }

    try {
        const data = await Order.paginate(query, options);

        if (!data || data.docs.length < 1) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Không có dữ liệu!"
            });
        }

        return res.status(StatusCodes.OK).json({
            message: "Hoàn thành!",
            data,
            totalDocs: data.totalDocs, // Tổng số đơn hàng
            totalPages: data.totalPages // Tổng số trang
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || "Lỗi server!"
        });
    }
}
export const getOrderById = async (req, res) => {
    try {
        const { userId, orderId } = req.params;
        const order = await Order.findOne({ userId, _id: orderId });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Không tìm thấy đơn đặt hàng" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
            new: true,
        });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Không tìm thấy đơn đặt hàng" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatus = ["Chờ xử lý", "Xác nhận", "Đang vận chuyển", "Đã giao hàng", "Hủy đơn hàng"];

        if (!validStatus.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Trạng thái không hợp lệ" });
        }

        const order = await Order.findOne({ _id: orderId });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Không tìm thấy đơn đặt hàng" });
        }

        if (order.status === "Đã giao hàng" || order.status === "Hủy đơn hàng") {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Không thể cập nhật đơn hàng" });
        }

        order.status = status;
        await order.save();

        return res.status(StatusCodes.OK).json({ message: "Trạng thái đơn hàng đã được cập nhật thành công" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};