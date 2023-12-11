const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const {UserModel}=require("../models/userModels");
const {PostModel}=require("../models/postModel");
const {auth}=require("../middlewere/authMiddlewere")

const postRouter=express.Router();
postRouter.use(auth)

postRouter.post("/add", async(req,res)=>{
    try {
        let post=PostModel(req.body)
        await post.save();
        res.status(200).send({"msg":"New Post added","post":post})
    } catch (error) {
       res.status(400).send({"error":error}) 
    }
})

postRouter.get("/", async(req,res)=>{
    try {
       let post=await PostModel.find({userID:req.body.userID})
       res.status(200).send({"data":post}) 
    } catch (error) {
        res.status(400).send({"error":error}) 
    }
})

postRouter.patch("/update/:id", async(req,res)=>{
    let {id}=req.params
    try {
        const post=await PostModel.findOne({_id:id})
        if(req.body.userID===post.userID){
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":`Post with ${id} has been updated`})
        }
        else{
            res.status(200).send({"msg":`You are not Authorised`})
        }
    } catch (error) {
        res.status(400).send({"error":error}) 
    }
})

postRouter.delete("/delete/:id", async(req,res)=>{
    let {id}=req.params
    try {
        const post=await PostModel.findOne({_id:id})
        if(req.body.userID===post.userID){
            await PostModel.findByIdAndUpdate({_id:id})
            res.status(200).send({"msg":`Post with ${id} has been deleted`})
        }
        else{
            res.status(200).send({"msg":`You are not Authorised`})
        }
    } catch (error) {
        res.status(400).send({"error":error}) 
    }
})


module.exports={
    postRouter
}