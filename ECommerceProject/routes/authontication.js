const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');

router.get('/login',(req,res)=>{
    res.render('auth/login')
})
router.get('/register',(req,res)=>{
    res.render('auth/register');
})
router.post('/register',async(req,res)=>{
    const {username,email,password,role} = req.body;
    const user = new User({username,email,role})
    await User.register(user,password);
    req.flash('success','Please login you have registered successfully!')
    res.redirect('/login');
})
router.post('/login',passport.authenticate('local',{
    failureRedirect:'/login',
failureFlash:true

}),
(req,res)=>{
    req.flash('success','Welocome!',req.user.username)
res.redirect('/products')

})
router.get('/logout',(req,res)=>{
    req.logout(function(err){
        if(err){
            return next (err);
        }
        res.redirect('/')
        req.flash('success','you have logged out!')
    })
})
module.exports = router;