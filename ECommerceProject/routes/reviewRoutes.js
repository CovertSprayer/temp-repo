const express = require('express');
// const mongoose = require('mongoose');
const Review = require('../models/reviews');
const Product = require('../models/product');
const router = express.Router();
const {validateReview,isLoggedIn} = require('../middleware');
router.post('/products/:productId/reviews',isLoggedIn,validateReview, async(req,res)=>{
    const {productId} = req.params;
    const product =await Product.findById(productId);
    const newReview = new Review(req.body);
    await newReview.save();
    const newAvgRating =(( product.avgRating*product.reviews.length)+parseFloat(req.body.rating))/(product.reviews.length+1);
    product.reviews.push(newReview);
product.avgRating = parseFloat(newAvgRating.toFixed(1));
    await product.save();
    await newReview.save();
req.flash('success','Review Added Successfully!');
    res.redirect('back')
})

module.exports = router;