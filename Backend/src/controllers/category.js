import { StatusCodes } from "http-status-codes";
import Category from '../models/category'
import Products from '../models/products'
import slugify from "slugify"
export const addCategory = async (req, res) => {
    try {
        const category = await Category.create({ name: req.body.name, slug: slugify(req.body.name, "-") });

        return res.status(StatusCodes.CREATED).json({
            message: "Thêm thành công",
            category
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const category = await Category.find({});
        if (category.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có danh mục nào" });
        }
        return res.status(StatusCodes.OK).json(category)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const product = await Products.find({ category: req.params.id })
        const category = await Category.findOne({ _id: req.params.id })
        return res.status(StatusCodes.OK).json({
            category,
            product
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id })
        return res.status(StatusCodes.OK).json(category)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        return res.status(StatusCodes.OK).json({
            message: "Cập nhật thành công",
            category
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}