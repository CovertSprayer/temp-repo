const mongoose = require('mongoose');
const product = require('./models/product')
mongoose.connect('mongodb://127.0.0.1:27017/ECommerce')
.then(()=>{
    console.log('DB COnnected!')
})
.catch((err)=>console.log(err));
const AddingProducts =  [
    {
        name:'Iphone 14',
        img:'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price:200,
        desc:'The iPhone 14 was made available on September 16, 2022, and iPhone 14 Plus was made available on October 7, 2022,'
    },

    {
        name: 'Mackbook Pro',
        img:'https://images.unsplash.com/photo-1420406676079-b8491f2d07c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hY2tib29rJTIwcHJvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:1000,
        desc:'The new M2 chip makes the 13‑inch MacBook Pro more capable than ever. The same compact design supports up to 20 hours of battery life1 and an active cooling system to sustain enhanced performance. Featuring a brilliant Retina display.'
    },

    {
        name:'Nike Shoes',
        img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5pa2UlMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price:200,
        desc:'Twenty years later and these low tops are back. Inspired by the original Wings logo and design of the Jordan 1, these all-day, everyday shoes are ready for whatever. Rock em with some baggy jeans, skate in em or just look fly—its up to you.'
    },

    {
        name:'OnePlus TWS',
        img:'https://images.unsplash.com/photo-1655560378428-7605bda51749?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHdzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:80,
        desc:'The bold Radiant Silver colorway exemplifies a design statement without words. Replicating the compelling look and smooth feel of stainless steel, a new metallization process meticulously combines four distinctive material layers'
    },

    {
        name:'Knife Set',
        img:'https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGtuaWZlJTIwc2V0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:50,
        desc:'Very Sharp nives set in different sizes'
    },

    {
        name:'Cannon Camera',
        img:'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:800,
        desc:'Canon EOS (Electro-Optical System) is an autofocus single-lens reflex camera (SLR) and mirrorless camera series produced by Canon Inc. Introduced in 1987 with the Canon EOS 650, all EOS cameras used 35 mm film until October 1996 when the EOS IX was released using the new and short-lived APS film.'
    },

    {
        name:'Drone',
        img:'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price:1500,
        desc:"Texts from Wikisource 1911 Encyclopædia Britannica/Drone conical drones, and M. Praetorius gives a drawing of a bagpipe, which he calls Grosser Bock, having two drones ending in a curved rams horn. The drone pipe"
    }
];
async function seedDB(){
    await product.deleteMany({});
    await product.insertMany(AddingProducts);
    console.log('DB Seeded!!')
}
seedDB();