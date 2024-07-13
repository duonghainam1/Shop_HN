import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routers/auth"
import productsRouter from "./routers/products"
import categoryRouter from "./routers/category"
import cartRouter from "./routers/cart"
import orderRouter from "./routers/order"
import { connectDB } from "./config/db";
import morgan from "morgan";

const app = express();
dotenv.config()
//middleware
app.use(express.json())
app.use(cors());
app.use(morgan('tiny'))
// connectDB
connectDB(process.env.DB_URI)
// router
app.use('/api/v1', authRouter)
app.use('/api/v1', productsRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', cartRouter)
app.use('/api/v1', orderRouter)



export const viteNodeApp = app