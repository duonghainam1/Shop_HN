import mongoose from "mongoose";
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        // required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required: true
    },
    description: {
        type: String,
    },
    discount: {
        type: Number,
        default: 0
    },
    gallery: {
        type: Array
    },
    featured: {
        type: Boolean,
        default: false,
    },
    countInStock: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array
    }


}, { timeseries: true, versionKey: false })

export default mongoose.model("Products", productsSchema)