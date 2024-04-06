const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(express.json())
const tesseract = require('./tesseract')
const path = require('path')
const fs = require('fs')
app.get('/api/v1/image/:id',async(req,res)=>{
    const {id} = req.params
    console.log(id);
    res.sendFile(path.join(__dirname,'images',id+'.png'))
})
// 
app.post('/api/v1/ocr',async(req,res)=>{
    try {
        const {img} = req.body;
        
       
        if(!img) return res.json({status:400,message:'please provide img param'})
        
        
         const id = 'fsdsdfsdfsdf'
    
        const base64Image = img.replace(/^data:image\/png;base64,/, '');

//       Write buffer to file
       fs.writeFileSync('./images/'+id+'.png', Buffer.from(base64Image, 'base64'));

         const url = 'http://127.0.0.1:'+port+'/api/v1/image/'+id
         console.log(url)
        //  return res.json({success:true,message:'This is message.'})
        const res1 = await tesseract(url);
        return res.json({status:200,res1})
        
         
    } catch (error) {
        console.log(error)
        res.json({status:500,message:'server error'})
    }
})

app.listen(port,()=>{
    console.log('server is listening to port:'+ port)
})