 require('dotenv').config()
 const expect = require('chai').expect;
 const request = require('supertest');
 const app = require('../server.js');

 //Database configuration
const dbConfig = require('../dbConfig');
const mongoose = require('mongoose');

 const connect = () => {
     return new Promise((resolve, reject) => {
         mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true})
         .then((res, err) => {
             if(err) return reject(err)
             resolve();
         })
     });
 }

const close = () => mongoose.disconnect();

describe('POST /fav-memes', () => {
    before((done) => {
         connect().then(() => done())
         .catch((err) => done(err));
    });
    after((done) => {
        close().then(() => done())
        .catch((err) => done(err));
   });

   it('Ok, adding a meme to your collection works', (done) => {
       request(app).post('/fav-memes')
       .send({
            id: "61574",
            name: "One Does Not uuu  Simply",
            url: "https://i.imgflip.com/1bij.jpg",
            tag: "Obama",
            width: 568,
            height: 335,
            box_count: 2
       }).then((res) => {
           const body = res.body;
           expect(body).to.contain.property('_id');
           done();
       })
       .catch((err) => done(err));
   });
})