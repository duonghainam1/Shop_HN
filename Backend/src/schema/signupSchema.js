import Joi from "joi";


export const signUpSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Trường email bắt buộc phải nhập",
        "string.empty": "Trường email không được để trống",
        "string.email": "Trường email không hợp lệ",
    }),
    name: Joi.string().min(3).max(30).required().messages({
        "any.required": "Trường name bắt buộc phải nhập",
        "string.empty": "Trường name không được để trống",
        "string.min": "Trường name phải có ít nhất {#limit} ký tự",
        "string.max": "Trường name không được vượt quá {#limit} ký tự",
    }),
    password: Joi.string().min(6).max(30).required().messages({
        "any.required": "Trường password bắt buộc phải nhập",
        "string.empty": "Trường password không được để trống",
        "string.min": "Trường password phải có ít nhất {#limit} ký tự",
        "string.max": "Trường password không được vượt quá {#limit} ký tự",
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        "any.required": "Trường confirmpassword bắt buộc phải nhập",
        "any.only": "Trường confirmpassword phải giống với trường password",
        "string.empty": "Trường confirmpassword không được để trống",
    }),
    avatar: Joi.string().uri().messages({
        "any.required": "Trường avatar bắt buộc phải nhập",
        "string.uri": "Đường dẫn không hợp lẹ"
    }),
})



