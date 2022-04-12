const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const http = require("http");
var uuid = require('uuid');
var cors = require('cors')

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// use cors for communication with backend
app.use(cors())

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/flight-ticket-portal-app";

// define a simple route
app.get('/flights', (req, res) => {
  MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("flight-ticket-portal-app");
      dbo.collection("flights").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json({"flights": result})
        db.close();
      });
    });   
});

// define a simple route
app.post('/login', (req, res) => {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("flight-ticket-portal-app");
        var query = { username: req.body.username };
        dbo.collection("users").find(query).toArray(function(err, result) {
          if (err) throw err;
          if (result[0].password == req.body.password) {
            res.json({"user_info": result[0]})
          }
          db.close();
        });
      });   
});

// TO DO
app.delete('/user/:uid/cancel/:bid', (req, res) =>  {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err,db){
        if (err) { throw err; }
        else {
          var dbo = db.db("flight-ticket-portal-app");
            dbo.collection("users").findOneAndDelete(
                { booking_id : req.params.bid },
                { $pull: { booking_history: object } }, function(err,doc) { 
                if (err) { throw err; }
                else { console.log("Deleted"); }
            });    
        }
      });

})

// books the ticket
// params: username, 
app.put('/user/:username/book', (req, res) =>  {
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err,db){
        if (err) { throw err; }
        else {
          var dbo = db.db("flight-ticket-portal-app");
          var object = { booking_id: uuid.v1(), source: req.body.source, destination: req.body.destination, departure: req.body.departure, 
            arrival: req.body.arrival };
            dbo.collection("users").update(
                { username: req.params.username },
                { $push: { booking_history: object } }, function(err,doc) { 
                if (err) { throw err; }
                else { console.log("Updated"); }
            });    
        }
      });
})


// listen for requests
app.listen(5500, () => {
    console.log("Server is listening on port 5500");
});