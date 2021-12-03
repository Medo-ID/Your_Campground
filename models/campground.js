const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    url: String,
    filename: String
});

ImagesSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema({
    title: String,
    images: [ImagesSchema],
    price: Number,
    description: String,
    location: String,
    auther:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async (doc) => {
    if(doc){
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);