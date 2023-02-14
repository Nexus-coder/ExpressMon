const express = require('express');
const path =require('path');
const app = express();
const override = require('method-override');
const mongoose = require('mongoose');

const Product = require("./models/product");
const { urlencoded } = require('express');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/farmProducts')
.then(() => {
    console.log("Server opened successfully")
})
.catch((err) => {
    console.log("Caught error: " + err)
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')

app.use(express.urlencoded({extended:true}));
app.use(override('_method'))

app.get("/products",async (req,res)=>{
const products = await Product.find();
res.render('product/index',{products});
})

app.get("/products/new",(req,res)=> {
    res.render('product/new');
})

app.post("/products",async (req,res) => {
   console.log(req.body);
   const newProduct = new Product(req.body);
   console.log(newProduct);
   await newProduct.save();
   res.redirect(`/products/${newProduct._id}`);

})
app.get("/products/:id",async (req,res) => {
   const {id} = req.params;
   const found = await Product.findById(id);
   res.render('product/show',{found})
   console.log(found);
})

app.get("/products/:id/edit",async (req,res) => {
    const {id} = req.params;
    const found = await Product.findById(id);
    res.render('product/edit',{found})

 })

 app.put('/products/:id',async (req,res) => {
    const {id} = req.params;
    const found = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.redirect(`/products/${found._id}`)
 })
 



app.listen(3000,()=>{
    console.log("PORT 3000 open");
})
