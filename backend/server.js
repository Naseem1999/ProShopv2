import express from "express";
import path from 'path'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./Config/db.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from './Routes/productsRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
import uploadRoute from './Routes/uploadRoute.js'





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
app.use('/api/orders',orderRoutes);
app.use('/api/upload', uploadRoute);

app.get('/api/config/paypal' ,(req,res)=>
res.send({clientId:process.env.PAYPAL_CLIENT_ID}))
const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>console.log(`server running on port ${port}`));