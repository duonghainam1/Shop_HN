
import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Products"
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamps: true, versionKey: false })
export default mongoose.model("Cart", cartSchema)