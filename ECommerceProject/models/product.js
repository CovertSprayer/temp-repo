const  mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        min:0,
        default:0
    },
    img:{
        type:String

    },
    desc:{
        type:String,
        trim:true
    },
    avgRating:{
        type:Number,
        default:0
    },
    reviews:[{
      
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }

    
})
const Product = mongoose.model('Product',productSchema)
module.exports = Product;
