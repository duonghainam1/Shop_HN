
import Joi from "joi"

export const productsSchema = Joi.object({
    // name: Joi.string().required().messages({
    //     "and.required": "Tên sản phẩm bắt buộc phải nhập",
    //     "string.empty": "Tên sản phẩm không được để trống"
    // }),
    // price: Joi.number().required().messages({
    //     "number.empty": "Giá sản phẩm bắt buộc phải là số",
    //     "and.required": "Giá sản phẩm bắt buộc phải nhập"

    // }),
    // category: Joi.required(),
    // image: Joi.string().messages({
    //     "string.empty": "Ảnh sản phẩm không được để trống"
    // }),
    // description: Joi.string().messages({
    //     "string.empty": "Mô tả sản phẩm không được để trống"
    // }),
    // discount: Joi.number(),
    // countInStock: Joi.number(),
    // featured: Joi.boolean()
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string(),
    gallery: Joi.array().items(Joi.string()),
    image: Joi.string(),
    description: Joi.string(),
    discount: Joi.number(),
    featured: Joi.boolean(),
    countInStock: Joi.number(),


})