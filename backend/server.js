import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./Config/db.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from './Routes/productsRoutes.js'
import userRoutes from './Routes/userRoutes.js'

const port=process.env.PORT;
connectDB();
const app=express();
//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Api is running......")
})
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>console.log(`server running on port ${port}`));