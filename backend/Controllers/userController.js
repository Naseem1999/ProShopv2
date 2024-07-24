import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from '../utills/generateToken.js'
//@desc auth & get token
//@route Post /api/users/login
//@access public
const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user && (await user.matchPassword(password))){
       generateToken(res,user._id);
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(401);
        throw new Error("Invalid email or password")
    }
    res.send('auth user')
})
//@desc Register User
//@route Post /api/users
//@access public
const registerUser=asyncHandler(async(req,res)=>{
 const {email,password,name}=req.body;

 const userExist=await User.findOne({email});
 if(userExist){
    res.status(400);
    throw new Error("user already exist")
 }
 const user=await User.create({
    name,
    email,
    password
 });
 if(user){
    generateToken(res,user._id);
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    })
 }else{
    res.status(400);
    throw new Error("invalid user data")
 }



})
//@desc Logout User & clear cookie
//@route Post /api/users/logout
//@access public
const logoutUser=asyncHandler(async(req,res)=>{
   res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0) 
   })

   res.status(200).json({message:"logout successfully"})
})

//@desc get user profile
//@route Get /api/users/profile
//@access private
const getUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin    
        })
    }else{
        res.status(404);
        throw new Error("User not Found")
    }
})

//@desc update user profile
//@route Put /api/users/profile
//@access Private
const updateUserProfile=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id);
  if(user){
      user.name=req.body.name || user.name;
      user.email=req.body.email || user.email;
     
      if(req.body.password){
        user.password=req.body.password;
      };

      const updatedUser=await user.save();
      
      res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin    
    })
  }else{
    res.status(404);
    throw new Error("User not Found")
  }
})

//@desc get users   
//@route Get /api/users
//@access Private/admin
const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({});
    res.status(200).json(users);
})
//@desc get user by Id
//@route Get /api/users/:id
//@access Private/admin
const getUserByid=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select('-password');
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404);
        throw new Error("user not Found")
    }
})

//@desc delete user 
//@route delete /api/users/:id
//@access Private/admin
const deleteUser=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.id);
    if(user){
    if(user.isAdmin){
        res.status(400)
        throw new Error("can not delete a admin user")
    }
    await User.deleteOne({_id:user._id})
    res.status(200).json({message:"user deleted successfully"})

}else{
    res.status(404);
    throw new Error("user not found")
}
})

//@desc update user 
//@route Put /api/users/:id
//@access Private/admin
const updateUser=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
})


export {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile,getUsers,getUserByid,deleteUser,updateUser};

