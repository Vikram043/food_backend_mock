const mongoose=require("mongoose")

const addressSchema=mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
})

const restorentSchema=mongoose.Schema({
        name: String,
        address: addressSchema,
        menu: [{
          name: String,
          description: String,
          price: Number,
          image: String
        }]
})

const RestaurantModel=mongoose.model('restorent',restorentSchema)

module.exports={RestaurantModel}