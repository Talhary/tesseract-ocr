const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(express.json())
const tesseract = require('./tesseract')

app.get('/api/v1/ocr',async(req,res)=>{
    try {
        const {img} = req.query;
        console.log(req.params)
        if(!img) return res.json({status:400,message:'please provide img param'})
        console.log(img)
        const text = await tesseract(img);
        return res.json({status:200,message:text})
    } catch (error) {
        res.json({status:500,message:'server error'})
    }
})

app.listen(port,()=>{
    console.log('server is listening to port:'+ port)
})