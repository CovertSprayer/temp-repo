const {productSchema,reviewSchema} = require('./joiSchema');
const Product = require('./models/product')
module.exports.validateProduct=(req,res,next)=>{
    const {name,price,img,desc} = req.body;
    const {error} = productSchema.validate({name,price,img,desc});
    if(error){
        res.send('error');
    }
    next();
}
module.exports.validateReview = (req,res,next)=>{
    const{rating,Comment} = req.body;
    const {error} = reviewSchema.validate({rating,Comment});
    if(error){
        res.send('error',error)
    }
    next();
}
module.exports.isLoggedIn = (req,res,next)=>{

    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({
            msg:'You are not authorised'
        })
    }

    if(!req.isAuthenticated()){
        
        req.flash('error','Please Login first!')
        res.redirect('/login')
    
    }else{
        next();
    }
}

module.exports.isSeller = (req,res,next)=>{
    if(req.user.role==='buyer'){
        req.flash('error','You are not authorised to do that!')
        return res.redirect('back');
    }
    next();
}
module.exports.isAuthor =async (req,res,next)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product.author || !product.author.equals(req.user._id)){
        req.flash('error','You are not authorised to do that!')
        return res.redirect('back')
    }
    next();
}