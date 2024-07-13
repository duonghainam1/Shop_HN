
import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlenth: 3,
        maxlenth: 30
    },
    password: {
        type: String,
        minlenth: 6,
        required: true,
    },
    role: {
        type: String,
        emun: ["user", "admin"],
        default: "user"
    },
    avatar: {
        type: String,
        default: "../upload/default-avatar.jpg"
    }

}, { timestamps: true, versionKey: false })


export default mongoose.model("User", userSchema)