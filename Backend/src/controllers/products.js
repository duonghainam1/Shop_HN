import { StatusCodes } from "http-status-codes";
import Products from '../models/products'
export const addProducts = async (req, res) => {
    try {
        const data = await Products(req.body).save();

        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const data = await Products.find({});
        if (data.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có sản phẩm nào" });
        }
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}

export const getProductsById = async (req, res) => {
    try {
        const data = await Products.findOne({ _id: req.params.id })
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}
export const deleteProducts = async (req, res) => {
    try {
        const data = await Products.findOneAndDelete({ _id: req.params.id })
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}
export const updateProducts = async (req, res) => {
    try {
        const data = await Products.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        return res.status(StatusCodes.OK).json(data)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}