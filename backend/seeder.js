import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors';
import users from "./Data/users.js";
import products from "./Data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./Config/db.js";

dotenv.config();

connectDB();

const importData=async ()=>{
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createUsers=await User.insertMany(users);
        const adminUser=createUsers[0]._id;
        const sampleProducts=products.map((product)=>{
            return {...product,User:adminUser}
        })
        await Product.insertMany(sampleProducts);
        console.log("Data imported!".green.inverse)
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}

const destroyData=async ()=>{
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

       
        console.log("Data destroyed".green.inverse)
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    destroyData();

}else{
    importData();
}