const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error :"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50 ;i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author :'65015ebbff049474af76c836',          
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //  image:'https://source.unsplash.com/collection/483251',
            description:'What is Your name',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dy6d527va/image/upload/v1694784950/mdyykabzbpy5qmplz514.jpg',
                  filename: 'mdyykabzbpy5qmplz514',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dy6d527va/image/upload/v1694784949/ufw0eue2bcgg2xo3hkh4.jpg',
                  filename: 'ufw0eue2bcgg2xo3hkh4',
                
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})