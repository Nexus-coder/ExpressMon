const express = require('express');
const path =require('path');
const app = express();

const mongoose = require('mongoose');

const Product = require("./models/product");

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/farmProducts')
.then(() => {
    console.log("Server opened successfully")
})
.catch((err) => {
    console.log("Caught error: " + err)
})

var fruits = [{
    name:'Watermelon',
    price:100.99,
    category:'fruit'
},
{
    name:'Potatoes',
    price:10.99,
    category:'vegetables'
},{
    name:'Eggs',
    price:11.99,
    category:'dairy'
},{
    name:'Tomato',
    price:5.99,
    category:'fruit'
},{
    name:'Orange',
    price:50.99,
    category:'fruit'
}];

Product.insertMany(fruits).then(r => {
    console.log(r)
});