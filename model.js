const mongoose = require('mongoose');

const MemeSchema = mongoose.Schema({
    "id": String,
    "name": String,
    "tag": String,
    "url": String,
    "width": Number,
    "height": Number,
    "box_count": Number
},{
    timestamps: true
});

module.exports = mongoose.model('Meme', MemeSchema);
