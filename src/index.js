import express from 'express'


const PORT = 1111
const app = express()
app.use("/test",(req , res)=>{
    res.send("hello")
})
app.use("/test2",(req , res)=>{
    res.send("hello2")
})
app.use("/test3",(req , res)=>{
    res.send("hello3")
})


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})