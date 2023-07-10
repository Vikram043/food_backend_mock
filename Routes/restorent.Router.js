const express=require("express")
const { RestaurantModel } = require("../Models/restorent.module")
const restorentRouter=express.Router()


restorentRouter.get('/restaurants',async(req,res)=>{
    try {
       const restorents=await RestaurantModel.find()
       res.status(200).send(restorents)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

restorentRouter.get('/restaurants/:id',async(req,res)=>{
    const {id}=req.params
    try {
       const restorents=await RestaurantModel.findById(id)
       res.status(200).send(restorents)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

restorentRouter.get('/restaurants/:id/menu',async(req,res)=>{
    const {id}=req.params
   
    try {
        const restorents=await RestaurantModel.findById(id)

       res.status(200).send(restorents.menu)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

restorentRouter.post('/restaurants/:id/menu',async(req,res)=>{
    const {name,description,price,image}=req.body
    const id=req.params.id

    try {
        const restorent= await RestaurantModel.findById(id)
        restorent.menu.push({name,description,price,image})
        await restorent.save()
        res.status(201).send(restorent)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})


restorentRouter.delete('/restaurants/:id/menu/:id',async(req,res)=>{
    console.log(req.params)
    const {id}=req.params.id
    const menuid=req.params.menuid
    try {
        const restorent= await RestaurantModel.updateOne({_id:id},{
            $pull:{menu:{_id:menuid}}
        })
       
        res.status(201).send({message:"deleted successfully"})

    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

// Optional to add Restotents 
restorentRouter.post('/restaurants',async(req,res)=>{
    const payload=req.body
    try {
        const restorent= new RestaurantModel({...req.body})
        await restorent.save()
        res.status(201).send({message:"Restorent added successfully",restorent})

    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

module.exports={restorentRouter}