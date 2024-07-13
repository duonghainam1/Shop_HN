
import User from "../models/user"
import { StatusCodes } from "http-status-codes"
import bcryptjs from "bcryptjs"
import { signUpSchema } from "../schema/signupSchema"
import jwt from "jsonwebtoken"
import { signInpSchema } from "../schema/signinSchema"


export const signup = async (req, res) => {
    const { name, email, password, confirmPassword, avatar } = req.body;
    const { error } = signUpSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errors })
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "email đã tồn tại"
        })
    }
    const hashedPassword = await bcryptjs.hash(password, 12)
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
    const user = await User.create({
        ...req.body,
        password: hashedPassword,
        role,
    })
    user.password = undefined;
    return res.status(StatusCodes.CREATED).json({
        messager: "Đăng ký thành công",
        user
    })
}

export const signin = async (req, res) => {
    const { email, password } = req.body
    const { error } = signInpSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messages: errors })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            messages: ["Email không tồn tại"]
        })
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Mật khẩu không chính xác"]
        })
    }
    const token = jwt.sign({ userId: user._id }, "123456", {
        expiresIn: "3m",
    })
    user.password = undefined
    return res.status(StatusCodes.OK).json({
        user,
        token,
        messages: ["Đăng nhập thành công"]
    })


}

