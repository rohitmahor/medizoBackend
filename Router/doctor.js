var express = require('express')
var database = require('../db/model')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', function (req, res) {
  res.send('doctor home page')
})

// define the about route
router.post('/profile/getInfo', function (req, res) {
  var id = req.body.id.toString();
  database.getDocInfo(res,id)
  // res.send();
})

router.post('/profile/getAddress',function(req,res){
  var id = req.body.id.toString();
  database.getDocAddress(res,id);
})

router.post('/profile/getAppointments',function(req,res){
  var id = req.body.id.toString();
  database.getDocAppointments(res,id);
})

router.post('/profile/updateAvailiability', function(req,res){
  var id = req.body.id.toString();
  var val = req.body.val;
  database.updateAvailability(res,id,val);
})

module.exports = router;