const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp-db', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const randomCities = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            auther: '61a619d6092853108b8ae036',
            location: `${cities[randomCities].city}, ${cities[randomCities].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel. That makes me feel angry! Anyhoo, your net-suits will allow you to experience.",
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dglsuv87x/image/upload/v1638443190/YALPCAMP/nqtdpagymqc8dekcwkus.jpg',
                  filename: 'YALPCAMP/nqtdpagymqc8dekcwkus',
                },
                {
                  url: 'https://res.cloudinary.com/dglsuv87x/image/upload/v1638443191/YALPCAMP/jvtnn32kuz2gzttq4srn.jpg',
                  filename: 'YALPCAMP/jvtnn32kuz2gzttq4srn',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})