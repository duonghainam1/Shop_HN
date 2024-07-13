import { StatusCodes } from "http-status-codes"
import Cart from "../models/cart"


export const cartById = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate("products.product")
        const cartData = {
            products: cart.products.map((item) => ({
                product: item.product._id,
                name: item.product.name,
                image: item.product.image,
                price: item.product.price,
                quantity: item.quantity
            }))

        }
        console.log(cartData);

        return res.status(StatusCodes.OK).json(cartData)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })

    }
}
export const addToCart = async (req, res) => {
    const { userId, product, quantity } = req.body
    try {
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, products: [] })
        }
        const existProductsIndex = cart.products.findIndex(
            (item) => item.product.toString() == product
        )
        if (existProductsIndex !== -1) {
            cart.products[existProductsIndex].quantity += quantity
        } else {
            cart.products.push({ product, quantity })
        }
        await cart.save()
        return res.status(StatusCodes.OK).json({ cart })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
    }
}
export const deleteCart = async (req, res) => {
    const { userId, product } = req.body
    try {
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Giỏ hàng trống" })
        }
        cart.products = cart.products.filter(
            (productInCart) => productInCart.product && productInCart.product.toString() !== product
        )
        await cart.save()
        return res.status(StatusCodes.OK).json({ cart })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Internal Server Error" });
    }
}
export const updateProductQuantity = async (req, res) => {
    const { userId, product, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Giỏ hàng trống" })
        }
        const products = cart.products.find((item) => item.product.toString() === product);
        if (!products) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Không tìm thấy sản phẩm" });
        }
        products.quantity = quantity;
        await cart.save();
        return res.status(StatusCodes.OK).json({ cart });
    } catch (error) { }
};


export const increaseCart = async (req, res) => {
    const { userId, product } = req.body
    try {
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Giỏ hàng không tồn tại"
            })
        }
        const productCart = cart.products.find((productsitem) => productsitem.product.toString() === product)
        if (!productCart) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: " Sản phẩm ko tồn tại"
            })
        }
        productCart.quantity++
        await cart.save()
        return res.status(StatusCodes.OK).json({
            message: "Tăng sản phẩm thành công",
            productCart
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}
export const reduceCart = async (req, res) => {
    const { userId, product } = req.body
    try {
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Giỏ hàng không tồn tại"
            })
        }
        const productCart = cart.products.find((productsitem) => productsitem.product.toString() === product)
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: " Sản phẩm ko tồn tại"
            })
        }
        if (productCart.quantity > 1) {
            productCart.quantity--
        }
        await cart.save()
        return res.status(StatusCodes.OK).json({
            message: "Tăng sản phẩm thành công",
            productCart
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
}