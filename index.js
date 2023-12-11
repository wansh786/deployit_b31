const express=require("express")
const cors=require("cors");
const {connection}=require("./db")
const {userRouter}=require("./routes/userRoutes")
const {postRouter}=require("./routes/post.router")
const app=express()
app.use(cors())


app.use(express.json())
app.use("/users",userRouter)
app.use("/posts",postRouter)


app.listen(4545,async()=>{
   try {
    await connection
    console.log("connected to server")
   } catch (error) {
    console.log(error)
   }
})