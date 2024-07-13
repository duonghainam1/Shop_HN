import { Router } from "express";
import { addToCart, cartById, deleteCart, increaseCart, reduceCart, updateProductQuantity } from "../controllers/cart";


const router = Router()
router.get("/cart/:userId", cartById);
router.post('/cart/add', addToCart)
router.post('/cart/delete', deleteCart)
router.put('/cart/edit', updateProductQuantity)
router.post('/cart/increase', increaseCart)
router.post('/cart/reduce', reduceCart)

export default router