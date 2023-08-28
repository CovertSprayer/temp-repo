const mongoose = require('mongoose');
const passlocmongoose = require('passport-local-mongoose')
const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            trim:true,
            required:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        role:{
            type:String,
            default:'buyer',
            required:true
        },
    
        wishList:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
            }
        ],
        cart:[
            {
                productId: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Product',
                    required:true
                },
                quantity: {
                    type:Number,
                    default:1,
                }
            }
        ]
    }
);
userSchema.plugin(passlocmongoose)

const User = mongoose.model('User',userSchema);

module.exports  = User;