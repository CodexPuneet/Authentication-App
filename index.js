const express = require("express");
const {connection}=require('./Config/db')
const {userRouter}= require('./Routes/user.routes')
const {profileRouter}=require('./Routes/profile.routes')
const {authenticate}= require('./Middleware/autenticate.user')


const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Wlecome to Authentication App");
})

app.use('/user', userRouter)
app.use(authenticate)
app.use('/', profileRouter)




app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log("Connected to database")
    }
    catch(err){
        console.log(err)
        console.log("Error while connecting to DB")
    }
    console.log(`Running on port ${process.env.PORT}`)
});