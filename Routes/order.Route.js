const express=require("express")
const { RestaurantModel } = require("../Models/restorent.module")
const { OrderModel } = require("../Models/order.module")
const orderRouter=express.Router()

orderRouter.post('/orders',async(req,res)=>{
    const user=req.user
    const {restorentid,name,price,quantity,totalprice,deliveryAddress}=req.body

    try {
      
        const restorents=await RestaurantModel.findById(restorentid)

        if(!restorents){
            return res.status(400).send({message:"Invalid credintials"})
        }

        const newOrder=await OrderModel.insertMany([
           {
             user,restorent:restorentid,
            totalprice:quantity*price,
            deliveryAddress,
            status:"preparing"
            }
        ])

        newOrder[0].items.push({name,price,quantity})
        await newOrder[0].save()
        return res.status(201).send({message:"Order created"})

    } catch (error) {
        return res.status(400).send({message:"Invalid credintials"})
        
    }
})

orderRouter.get('/orders/:id',async(req,res)=>{
    const id=req.params.id
    const user=req.user

    try {
        const order=await OrderModel.find({_id:id,user})
        return res.status(201).send(order)
    } catch (error) {
        return res.status(400).send({message:error.message})
    }
})


orderRouter.patch("/orders/:id",async(req,res)=>{
        const id=req.params.id

        const status=req.body.status

        try {
            const order_status=await OrderModel.findByIdAndUpdate(id,status)
            return res.status(204).send({"message":"order status updated"})
        } catch (error) {
            return res.status(400).send({message:error.message})
        }
})
module.exports={orderRouter}