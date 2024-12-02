import express from "express";

const PORT = 3000
const app = express()

app.get('/',(req , res)=>{
    console.log(req)

    return res.status(234).send("this page has been update")
})

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})
