import express from "express"
import { addCategory, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controllers/category"



const router = express.Router()
router.get('/category', getAllCategory)
router.get('/category/:id', getCategoryById)
router.post('/category', addCategory)
router.delete('/category/:id', deleteCategory)
router.put('/category/:id', updateCategory)

export default router