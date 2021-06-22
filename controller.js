const axios = require('axios');
const Meme = require('./model.js');

//Retrieve all memes
exports.allMemes = (req, res) => {
    console.log('Requested')
    axios.get('http://alpha-meme-maker.herokuapp.com/1')
    .then(memes => {
        res.send(memes.data.data);
    }).catch(error => {
        res.status(500).send({message: error.message || "Some error occurred while retrirving your memes"});
    });

};

//Retrieve and return favourite memes from  the database
exports.findAll = (req, res) => {
    Meme.find()
    .then(favMemes => {
        res.send(favMemes);
    }).catch(error => {
        res.status(500).send({message: error.message || "Some error occurred while retrirving your favourite memes"});
    });

};

//Create and Save a new favourite meme
exports.create = (req, res) => {
    console.log(req.body, '....juiuuiiii')
   if(!req.body.caption){
       return res.status(400).send({
           message: "Meme caption cannot be empty"
       });
   }

   // Create a favmeme
   const meme = new Meme({
       ...req.body
   });

   // save meme in the database as a favourite
   meme.save()
   .then(data => {
       res.send(data);
   }).catch(error => {
       res.status(500).send({
           message: err.message || "some error occurred while  favoriting the meme"
       });
   })


};

// Find a single meme with a memeId
exports.findOne = (req, res) => {
    const id = req.params.memeId
    Meme.findById(id)
    .then(meme => {
        if(!meme) {
            return res.status(404).send({
                message: `Meme with Id ${id} not found`
            });            
        }
        res.send(meme);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
             message: `Meme with Id ${id} not found`
            });                
        }
        return res.status(500).send({
            message: `Meme with Id ${id} could not be deleted`
        });
    });
};


// Update single meme by an ID
exports.update = (req, res) => {
    if(!req.body.caption){
        return res.status(400).send({
            message: "Caption cannot be empty"
        });
    }

    // Find fav meme and update the request
    const id = req.params.memeId
    Meme.findByIdAndUpdate(id, {
        ...req.body
    }, {new: true})
    .then(meme => {
        if(!meme){
            return res.status(404).send({
                message: `Meme with ID ${id}`
            })
        }
        res.send(meme)
    }).catch(error => {
        if(error.kind === 'ObjectId') {
              return res.status(404).send({
                  message: `Meme with ID ${id} not found.`
              });
        }
        return res.status(500).send({
            message: `Error updating meme with ID ${id} not found`
        })
    })

};

// Delete a meme by an ID
exports.delete = (req, res) => {
    const id = req.params.memeId;
    Meme.findByIdAndRemove(id)
    .then(meme => {
        if(!meme) {
            return res.status(404).send({
                message:  `Meme with ID ${id} was not found`
            });
        }
        res.send({message: "Meme deleted successfully!", _id:id});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message:   `Meme with ID ${id} was not found`
            });                
        }
        return res.status(500).send({
            message: `Oops! meme with ID ${id} could not be deleted`
        });
    });
};

// Filter meme
exports.search = (req, res) => {
    const query = req.query.caption;
    const regex = new RegExp(query, 'i');
    Meme.find({caption: {$regex: regex}})
    .then(favMemes => {
        res.send(favMemes);
    }).catch(error => {
        res.status(500).send({message: error.message || "Some error occurred while retrirving your favourite memes"});
    });

    
}
