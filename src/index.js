import express from 'express'


const PORT = 1111
const app = express()

// params 
app.get("/abc/:userId/:password",(req , res)=>{
   console.log(req.params);
   
    res.send("hello")
})

//query 
// In query , we get parameters through req body
app.get("/abc",(req , res)=>{
   console.log(req.query);
    res.send("hello")
})


// app.use("/test2",(req , res)=>{
//     res.send("hello2")
// })
// app.use("/test3",(req , res)=>{
//     res.send("hello3")
// })


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})