var express = require('express')
var router = express.Router()
var database  = require('../db/model')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page router
router.get('/', function (req, res) {
  res.send('user home page')
})

// define the about route
router.post('/profile/getInfo', function (req, res) {
  var id = req.body.id.toString();
  database.getUserInfo(res,id)
  // res.send();
})

router.post('/profie/getHistory',function(req,res){
  var id = req.body.id.toString();
  database.getUserhistory(res,id);
})

router.post('/profile/getAddress',function(req,res){
  var id = req.body.id.toString();
  database.getUserAddress(res,id);
})


router.post('/profile/getAppointments',function(req,res){
  var id = req.body.id.toString();
  database.getUserAppointments(res,id);
})

router.post('/profile/bookApp',function(req,res){
  var uid = req.body.uid;
  var did = req.body.did;
  var slot = req.body.slot;
  var msg = req.body.msg;
  var medium = req.body.medium;

  database.bookAppoinment(res, uid, did, start, end, msg, medium);
})


module.exports = router;