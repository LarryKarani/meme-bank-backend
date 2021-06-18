const memes = require('./controller.js');

module.exports = (app) => {

    // Retrieve all memes
    app.get('/', memes.allMemes);
    
    // Add a new fav' meme
    app.post('/fav-memes', memes.create);
    
    // Retrieve all my fav' memes
    app.get('/fav-memes', memes.findAll);

    // Retrieve a single meme with ID
    app.get('/fav-memes/:memeId', memes.findOne);

    //Update a meme with ID
    app.put('/fav-memes/:memeId', memes.update);

    //Delete a meme with ID
    app.delete('/fav-memes/:memeId', memes.delete);
}