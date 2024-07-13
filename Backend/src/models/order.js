import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";

const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `${timestamp}-${random}`;
};
const OrderItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})
const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        items: [OrderItemSchema],
        orderNumber: {
            type: String,
            auto: true,
            unique: true,
        },
        customerInfo: {
            type: {
                name: {
                    type: String,
                    required: true,
                },
                phone: {
                    type: Number,
                },
                email: {
                    type: String,
                    required: true,
                },
                payment: {
                    type: String,
                },
                city: {
                    type: String,
                },
                address: {
                    type: String
                },
                code: {
                    type: String
                }
            },
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Chờ xử lý", "Xác nhận", "Đang vận chuyển", "Đã giao hàng", "Hủy đơn hàng"],
            default: "Chờ xử lý",
        },
        datetime: {
            type: Date,
            default: Date.now
        }
    })
// Tạo pre-save hook để sinh orderNumber trước khi lưu vào cơ sở dữ liệu
OrderSchema.pre("save", function (next) {
    if (!this.orderNumber) {
        this.orderNumber = generateOrderNumber();
    }
    next();
})
OrderSchema.plugin(mongoosePaginate)
export default mongoose.model("Order", OrderSchema);