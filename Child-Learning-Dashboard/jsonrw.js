'use strict';
//Importing various node modules installed for execution purposes:
const fs = require('fs');
var mysql = require('mysql');
var log = require("json-log").log;

//DB connection establishment:
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user_db"
});

//function that writes the user data into json file:
function writeJson(){
    var obj = {
    users: []
    };

    obj.users.push(
        {"name":"ABC","email":"ABC@123.com", "pwd":"XXXX","active":1},
        {"name":"ABC2","email":"ABC2@123.com", "pwd":"XXXX","active":0},
        {"name":"ABC3", "email":"ABC3@123.com", "pwd":"XXXX","active":0},
        {"name":"ABC4", "email":"ABC4@123.com", "pwd":"XXXX","active":1}
    );

    var json = JSON.stringify(obj);

    fs.writeFile('user.json', json, 'utf8', function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
}

//function that reads the user details from Json file for uploading in DB:
function readJson() {
    let data = fs.readFileSync('user.json');
    let userData = JSON.parse(data);

    return userData;
}

//Function that uploads user details into database in localhost: Table name is 'users'
function dbUpload(jsonReadData) {
    jsonReadData['users'].forEach(function(value){
    var query = "INSERT IGNORE into users(name,email,pwd,active) VALUES('" + value['name'] + "','" + value['email'] + "','" + value['pwd'] + "'," + value['active'] + ");";
    con.query(query, function (err, result, fields) {
        if (err) { throw err;
            writeErrorLog(log.error("DB insertion failure for user "+value['name']));
        }
        else 
            writeSuccessLog(log.info("DB insertion success for user "+value['name']));
      });
  });
}

//Generic function that logs success info:
function writeSuccessLog(logData){
    fs.appendFile('log.json', logData , function (err) {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
}

//Generic function that logs error info: 
function writeErrorLog(logData){
    fs.appendFile('log.json',logData , function (err) {
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
              });
}

//Function call execution:
writeJson();
let jsonReadData = readJson();
dbUpload(jsonReadData);

