import express from "express"
import { addProducts, deleteProducts, getAllProducts, getProductsById, updateProducts } from "../controllers/products";


const router = express.Router()
router.get('/products', getAllProducts)
router.get('/products/:id', getProductsById)
router.post('/products', addProducts)
router.delete('/products/:id', deleteProducts)
router.put('/products/:id', updateProducts)

export default router