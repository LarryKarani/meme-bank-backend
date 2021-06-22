const mongoose = require('mongoose');

const MemeSchema = mongoose.Schema({
    "tag": String,
    "image": String,
    "caption": String
},{
    //timestamps: true
});

module.exports = mongoose.model('Meme', MemeSchema);
