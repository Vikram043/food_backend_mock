const mongoose=require("mongoose")

const addressSchema=mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
})

const userSchema=mongoose.Schema({
        name: String,
        email: String,
        password: String,
        address:addressSchema
})

const UserModel=mongoose.model('user',userSchema)

module.exports={UserModel}