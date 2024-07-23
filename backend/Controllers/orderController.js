import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js';

//@desc create new order
//@route POST /api/orders
//@access private
const addOrderItems=asyncHandler(async(req,res)=>{
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  }=req.body;
  
  if(orderItems && orderItems.length === 0){
    res.status(400);
    throw new Error("No order Items")
  }else{
  const order=new Order({
    orderItems:orderItems.map((x)=>({
        ...x,
        product:x._id,
        _id:undefined
    })),
    user:req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice

  })

  const createOrder=await order.save();
  res.status(201).json(createOrder)
}
})
//@desc get logged in user order
//@route GET /api/orders/myorders
//@access private
const getMyOrders=asyncHandler(async(req,res)=>{
  const orders=await Order.find({user:req.user._id});
  res.status(200).json(orders)
})
//@desc get orderby id
//@route GET /api/orders/:id
//@access private
const getOrderById=asyncHandler(async(req,res)=>{
   const order=await Order.findById(req.params.id).populate('user','name email')
   if(order){
    res.status(200).json(order)
   }else{
    res.status(404);
    throw new Error("order not found")
   }
})
//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access private   
const updateOrderToPaid=asyncHandler(async(req,res)=>{
  const order=await Order.findById(req.params.id);
  if(order){
    order.isPaid=true;
    order.paidAt=Date.now();
    order.paymentResult={
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.email_address
    }
    const updateOrder=await order.save();
    res.status(200).json(updateOrder)
  }else{
    res.status(404);
    throw new Error("Order not found")
  }
})
//@desc update order to deliver
//@route GET /api/orders/:id/deliver
//@access private/admin
const updateOrderToDeliver=asyncHandler(async(req,res)=>{
    res.send('update order to deliver')
})
//@desc grt all orders
//@route GET /api/orders
//@access private/admin
const getAllOrders=asyncHandler(async(req,res)=>{
    res.send('get All orders')
})

export {addOrderItems,getMyOrders,getOrderById,updateOrderToPaid,updateOrderToDeliver,getAllOrders};