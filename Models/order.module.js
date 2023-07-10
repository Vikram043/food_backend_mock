const mongoose=require("mongoose")


const addressSchema=mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
})

const orderSchema=mongoose.Schema({
        user : 
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        restaurant : 
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'restaurant' 
        },

      items: [{
        name: String,
        price: Number,
        quantity: Number
      }],

      totalPrice: Number,

      deliveryAddress:addressSchema,
      status: 
      {
        type:String,
         enum:["placed", "preparing", "on the way", "delivered"]
      }
})

const OrderModel=mongoose.model('order',orderSchema)

module.exports={OrderModel}