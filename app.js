const express = require('express')
const database = require('./db/model')
const bodyParser = require('body-parser')
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());

//doctors
var user = require('./Router/user')
app.use('/user', user)

var doctor = require('./Router/doctor')
app.use('/doctor',doctor);

database.connectDB(function(){
    app.listen(port,function(err){
        if(err) throw err;
        console.log("server is running on "+port);
    }); 
});