require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const Word = require('./models/word');

mongoose.Promise = global.Promise;
const app = express();
const port = 5000;
const  MONGO_URI  = process.env;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.post('/insert', (req, res) => {
    Word.create(req.body)
    .then(word => res.send(word))
    .catch(err => res.status(500).send(err));
});


app.put('/update', (req, res) => {
    Word.updateBywordid(req.body.id, req.body)
    .then(word => res.send(word))
    .catch(err => res.status(500).send(err));
});
app.post('/count', (req, res) => {
    Word.count(req.body.month, req.body.day)
    .then(count => res.send(count))
    .catch(err => res.status(500).send(err));
});


app.post('/delete', (req, res) => {
    Word.deleteBywordid(req.body.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});
app.get('/select', (req, res) => {
    Word.findAll()
    .then((word) => {
      if (!word) return res.status(404).send({ err: 'word not found' });
      res.send(word);
    })
    .catch(err => res.status(500).send(err));   
});


app.listen(port, () => {
    console.log(`server is Running on Port ${port}`);
});         