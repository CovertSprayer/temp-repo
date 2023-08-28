const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware')
const User = require('../models/users')

router.post('/user/:productId/add', isLoggedIn, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;
    console.log(productId)

    const user = await User.findById(userId);
    console.log(user)

    const cartItem =await user.cart.find((item) =>
       item.productId.toString() === productId
)

    if (cartItem) {
        cartItem.quantity++;
    }
    else {
        user.cart.push({ productId })
    }

    await user.save();

    req.flash('success', 'Item added to cart successfully!');
    res.redirect('back')
    // res.send('added')
});


module.exports = router;