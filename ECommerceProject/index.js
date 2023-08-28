
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const connectflash = require('connect-flash');
const passport = require('passport')
const passportLocal = require('passport-local');
const User = require('./models/users');

const PORT = 4000;

mongoose.connect('mongodb://127.0.0.1:27017/ECommerce')
    .then(()=>{console.log('DB connected!')})
    .catch(e => console.log(e));


  
app.engine('ejs', ejsMate);
const methodOverRide = require('method-override')

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(methodOverRide('_method'))

app.use(session({secret:'thisIsOurSecret',
resave:false,
saveUninitialized:true}));
app.use(passport.initialize())
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectflash());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    // console.log(req.session);
    next();
})


const productRoutes = require('./routes/productRoute');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authontication');
const cartRoutes = require('./routes/cart');

const productAPI = require('./routes/api/productAPI');

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productAPI);


app.get('/',(req,res)=>{
    res.render('products/home')
})

app.listen(PORT, ()=>{
    console.log('Server is Up at port ', PORT);
})


