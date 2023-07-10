const express=require("express")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcypt=require("bcrypt")
const { UserModel } = require("../Models/user.module")
require("dotenv").config()


userRouter.post("/register",async(req,res)=>{
    const {name,email,password,address}=req.body

    let user_exists=await UserModel.findOne({email})

    try {
        if(user_exists){
            return res.status(400).send({message:"User exists Please login "})
        }

        const hash=bcypt.hashSync(password,5)
        if(!hash){
            return res.status(400).send({message:"Please check password"}) 
        }
        const newUser=new UserModel({...req.body,password:hash})
        await newUser.save()

        return res.status(201).send({message:"Registration successfull"}) 

    } catch (error) {
        return res.status(400).send({message:error.message}) 
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    let user_exists=await UserModel.findOne({email})

    try {
        if(!user_exists){
            return res.status(400).send({message:"Please register first"})
        }

        const decode=bcypt.compareSync(password,user_exists.password)
        if(!decode){
            return res.status(400).send({message:"Wrong Credintials"}) 
        }
        
        const AccessToken=jwt.sign({email,userId:user_exists._id},process.env.key)
        res.cookie("AccessToken",AccessToken)

        return res.status(201).send({message:"Login successfull",AccessToken,user_exists}) 
        
    } catch (error) {
        return res.status(400).send({message:error.message}) 
    }
})
userRouter.patch('/user/:id/reset',async(req,res)=>{
    const userId=req.params.id;
    let currentPassword=req.body.currentPassword;
    let newPassword=req.body.newPassword

    let user_exists=await UserModel.findOne({_id:userId})

    try {
        if(!newPassword || !currentPassword){
            return res.status(400).send({"message":"Please enter currentPassword & newPassword in same format"})
        }


        const decode=bcypt.compareSync(currentPassword,user_exists.password)
        if(!decode){
            return res.status(400).send({message:"Password not matching"}) 
        }
        

        const hash=bcypt.hashSync(newPassword,5)
        if(!hash){
            return res.status(400).send({"message":"Enter valid password"})
        }
        const userpass=await UserModel.findByIdAndUpdate(userId,{password:hash})
        console.log(userpass)
        if(!userpass){
            return res.status(400).send({message:"Error"})
        }
        res.status(204).send({message:'password changed'})

    } catch (error) {
        return res.status(400).send({"message":error.message})
    }
})



module.exports={userRouter}