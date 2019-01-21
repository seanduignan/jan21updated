var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
  tag: {type: String, required: true},
  gender: String,
  sire: String,
  breed: String,
  dob: String,
  due: String
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);

var userVetSchema = new Schema({
  tag1: {type: String, required: true},
  reason: String,
  vetname: String,
  cost: String,
  date: String
}, {collection: 'user-vetdata'});

var UserVetData = mongoose.model('UserVetData', userVetSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        res.render('index', {items: doc});
      });
});

router.get('/get-vetdata', function(req, res, next) {
  UserVetData.find()
      .then(function(doc) {
        res.render('index', {units: doc});
      });
});

router.post('/insert', function(req, res, next) {
  var item = {
    tag: req.body.tag,
    gender: req.body.gender,
    sire: req.body.sire,
    breed: req.body.breed,
    dob: req.body.dob,
    due: req.body.due
  };

  var data = new UserData(item);
  data.save();

  res.redirect('/');
});


router.post('/insertvet', function(req, res, next) {
  var unit = {
    tag1: req.body.tag1,
    reason: req.body.reason,
    vetname: req.body.vetname,
    cost: req.body.cost,
    date: req.body.date
  };

  var vetdata = new UserVetData(unit);
  vetdata.save();

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.tag = req.body.tag;
    doc.gender = req.body.gender;
    doc.sire = req.body.sire;
    doc.breed = req.body.breed;
    doc.dob = req.body.dob;
    doc.due = req.body.due;
    doc.save();
  })
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
