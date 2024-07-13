import { Router } from "express";
import { createOrder, get_orders_client, getOrderById, } from "../controllers/order";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", get_orders_client);
router.get("/orders/:id", getOrderById);
export default router;