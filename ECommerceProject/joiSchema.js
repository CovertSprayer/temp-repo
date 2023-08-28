const joi = require('joi');

module.exports.productSchema = joi.object({
    name:joi.string().required(),
    price:joi.number().min(0).required(),
    img:joi.string().required(),
    desc:joi.string().required(),

})
module.exports.reviewSchema = joi.object({
    rating:joi.number().min(0).max(5),
    Comment:joi.string().required()
})