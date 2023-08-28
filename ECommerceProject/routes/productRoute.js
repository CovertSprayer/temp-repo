const express = require('express');
const product = require('../models/product');
const { findById } = require('../models/reviews');
const router = express.Router();
const {validateProduct,isLoggedIn,isSeller,isAuthor} = require('../middleware')
router.get('/products',async(req,res)=>{
    try {
        const products =await product.find({});
        res.render('products/index',{products});
    } catch (e) {
        res.render('error', { err: e.message });
        
    }

})


router.get('/products/new',isLoggedIn,isSeller,(req,res)=>{
    try {
        res.render('products/new')
        
    } catch (e) {
        res.render('error',{ err: e.message})
        
    } 
    
})
router.post('/products',isLoggedIn,isSeller,validateProduct,async(req,res)=>{
    try {
        await product.create({...req.body,author:req.user._id});
req.flash('success','product Added Successfully!!');

        res.redirect('/products')
    } catch (e) {
        res.render('error',{ err: e.message})
    }
  
})
router.get('/products/:id', async(req,res)=>{
    try {
        const {id} = req.params;
    const product1 = await product.findById(id).populate('reviews');
    res.render('products/show', {product1,msg:req.flash('msg')});
    } catch (e) {
        res.render('error',{ err: e.message})
        
    }
    
})
router.get('/products/:id/edit',isLoggedIn,isSeller,isAuthor,async(req,res)=>{
    try {
        const {id} = req.params;
        const product2 =  await product.findById(id);
        res.render('products/edit',{product2});
     
    } catch (e) {
        res.render('error',{ err: e.message})
    }
   
})
router.patch('/products/:id',isLoggedIn,validateProduct,isAuthor,async(req,res)=>{
    try {
        const {id} = req.params;
req.flash('success','product Edited Successfully!!');

        await product.findByIdAndUpdate(id,req.body);
        res.redirect('/products')
    } catch (e) {
        res.render('error',{ err: e.message})
    }
})
router.delete('/products/:id',isLoggedIn,isSeller,isAuthor, async (req, res) => {
    try {
        const { id } = req.params;

        const producta = await product.findById(id);
    
        for (let reviewId of producta.reviews) {
            await product.findByIdAndDelete(reviewId);
        }
req.flash('success','product Deleted Successfully!!');
    
        await product.findByIdAndDelete(id);
        res.redirect('/products');
    } catch (e) {
        res.render('error', {err: e.message})
        
    }
   
})
module.exports = router;