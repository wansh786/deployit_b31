const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const {UserModel}=require("../models/userModels");


const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(200).send({"error":err})
            }
            else{
                const user=new UserModel({name,email,gender,password:hash})
                await user.save()
                res.status(200).send({"msg":"The new user has been added","User":user})
            }
        })
    } catch (error) {
        res.status(400).send({"error":error})
    } 
})
userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user._id,name:user.name},"masai")
                    res.status(200).send({"msg":"Login Successful...!","token":token})
                }
                else{
                    res.status(200).send({"msg":"Wrong Creanditial..."})
                }

            })
        }
        else{
            res.status(200).send({"msg":"please register firts"})
        }
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

module.exports={
    userRouter
} 