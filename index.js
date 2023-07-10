const express=require("express")
const { connection } = require("./Configs/db")
const { userRouter } = require("./Routes/user.Router")
const cookieParser=require("cookie-parser")
const { restorentRouter } = require("./Routes/restorent.Router")
const { orderRouter } = require("./Routes/order.Route")
const { auth } = require("./middleware/auth.middleware")
const app=express()

app.use(express.json())
app.use(cookieParser())

app.get('/',async(req,res)=>{
    res.status(200).send({"message":"Welcome to Food backend"})
})

app.use('/api',userRouter)

app.use('/api',auth,restorentRouter)

app.use('/api',auth,orderRouter)


const port=process.env.PORT || 3001
app.listen(port,async()=>{
    try {
        await connection
        console.log(`connected to port ${port}`)
        console.log(`connected to port db`)
    } catch (error) {
        console.log("Unable to connect to DB")
        console.log(error.message)
    }
})