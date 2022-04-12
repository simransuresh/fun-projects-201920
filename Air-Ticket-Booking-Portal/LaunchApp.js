const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const http = require("http");

// create express app
const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

// declare mongo client
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/flight-ticket-portal-app";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("flight-ticket-portal-app");
//     dbo.createCollection("users", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       db.close();
//     });
//   });
// MongoClient.connect(url, function(err, db) {
// if (err) throw err;
// var dbo = db.db("flight-ticket-portal-app");
// dbo.createCollection("flights", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
// });
// });

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("flight-ticket-portal-app");
//     var myobj = { username: "simran", password: "simsim", booking_history: {} };
//     dbo.collection("users").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });

  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("flight-ticket-portal-app");
  //   var myobj = { source: "CHENNAI", destination: "DELHI" , departure: "24/06/2020", arrival: "25/06/2020"};
  //   dbo.collection("flights").insertOne(myobj, function(err, res) {
  //     if (err) throw err;
  //     console.log("1 document inserted");
  //     db.close();
  //   });
  // });

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("flight-ticket-portal-app");
    var myobj = { source: "MUMBAI", destination: "DELHI" , departure: "24/06/2020", arrival: "25/06/2020"};
    dbo.collection("flights").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });


// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});