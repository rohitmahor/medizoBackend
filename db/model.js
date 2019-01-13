var pg = require('pg')
var format = require('pg-format')
var PGUSER = 'postgres'
var PGDATABASE = 'zomato'

var config = {
    user: PGUSER, // name of the user account
    database: PGDATABASE, // name of the database
    password:'1234',
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }
  
var pool = new pg.Pool(config)
var myClient

const connectDB = (run_server)=>{
  pool.connect(function (err, client, done) {
    if (err) console.log(err)

    myClient = client
  })
  run_server();
}

const getUserInfo = (res,id)=>{
  var getInfo = format("SELECT * from users where id = "+"'"+id+"'")

  myClient.query(getInfo, function (err, result) {
    if (err) {
      console.log(err)
    } 
    console.log(result.rows[0])
    res.send(result.rows[0]);
  })
}

const getUserHistory = (res,id) => {
  var query = format("SELECT * FROM users as u "+
                      "JOIN history as h ON "+
                      "h.uid = u.id "+
                      "where u.id=" + "'" + id + "'");
 
  myClient.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } 
    res.send(result.rows);
  })
}

const getUserAddress = (res,id) => {
  var query = format("SELECT * FROM users as u "+
                      "JOIN address as a ON "+
                      "u.id = a.id "+
                      "where u.id=" + "'" +id+ "'");

  myClient.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } 
    res.send(result.rows);
  })
}

const getUserAppointments = (res,id)=>{
  var query = format("SELECT * FROM users as u "+
                      "JOIN appointments as a ON "+
                      "u.id = a.patient_id "+
                      "where u.id= " + "'" + id + "'");

  myClient.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } 
    res.send(result.rows);
  })
}



//Doctor
const getDocInfo = (res,id)=>{
  var getInfo = format("SELECT * from doctor where id = "+"'"+id+"'")

  myClient.query(getInfo, function (err, result) {
    if (err) {
      console.log(err)
    } 
    console.log(result.rows[0])
    res.send(result.rows[0]);
  })
}

const getDocAppointments = (res,id)=>{
  var query = format("SELECT u.name as uname, f.name as fname, f.price, a.booked_date, a.start_time, a.end_time, u.dob as udob, u.address as uaddress, d.name as dname, d.dob as ddob, d.experience, d.type, d.email as demail, d.address as daddress "+
                      "FROM facility as f "+
                      "INNER JOIN appointments as a ON "+
                      "f.id = a.facility_id "+
                      "INNER JOIN doctor as d on "+ 
                      "d.id = f.provider " +
                      "INNER JOIN users as u ON "+
                      "f.id = u.id "+
                      "where d.id=" + "'" + id + "'");

  console.log(query);

  myClient.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } 
    res.send(result.rows);
  })
}


const updateAvailability = (res,id,val)=>{
  var query = format("UPDATE doctor "+
                      "SET availability = "+val+" WHERE id = " + "'"+id+"'");

  myClient.query(query, function (err, result) {
    if (err) {
      console.log(err);
    } 
    res.send(result.rows);
  })
}

const bookAppoinment = (res, uid, did, slot, msg, medium)=>{
  var query1 = format("select id from facility where provider_id="+"'" + id + "'");

  var facilityID

  myClient.query(query1, function(err, result){
    if(err){
      console.log(err);
    }
    facilityID = result.row[0].id;
  })

  var query2 = format("insert into appoinments('facility_id', 'pateint_id', 'booked_date', 'start_time', 'end_time', ");

}


module.exports = {
  connectDB,
  getUserInfo,
  getUserHistory,
  getUserAddress,
  getUserAppointments,

  getDocInfo,
  getDocAppointments,
  updateAvailability,
  bookAppoinment
}