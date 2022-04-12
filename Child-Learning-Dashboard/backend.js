var express = require('express');
var config = require('./config.json');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var cors = require('cors')
var fs = require('fs');
var log = require("json-log").log;
var util = require('util');
const bcrypt = require('bcrypt');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir : config.imagePath.imageUploadSrc
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const date = require('date-and-time');
const now = new Date();

//DB connection establishment
var con = mysql.createConnection({
    host: config.dbData.host,
    user: config.dbData.user,
    password: config.dbData.password,
    database: config.dbData.database //table name used is new_users
});

//Registration API - new user add and existing user updation : 
app.post('/users/register', function(request, response) {
    console.log(request.body);
    //checking whether user already exists : 
    var query = "SELECT * FROM new_users WHERE username='" + request.body.username + "';";
    console.log(query);
    con.query(query, function(err, result, fields){
        if(err) 
        writeErrorLog(log.error("DB insertion failure for user "+request.body.username));
        else writeSuccessLog(log.info("DB insertion success for user "+request.body.username));
        console.log(result);
        if(result.length > 0 && (result[0]['username'] == request.body.username)) {
            updateExistingUser(); //updating existing user info
        }
        else addNewUser(); //new user addition
    });
    function addNewUser(){
        const now = new Date();
        bcrypt.hash(request.body.password, 10, function(err, hash) {
          console.log('The salted password is ' + hash);
        var query1 = 'INSERT IGNORE INTO new_users(name,username,password,image,usertype,active,created) VALUES("'
        + request.body.name + '","' + request.body.username + '","' + hash + '","' + request.body.image +
        '",' + request.body.usertype + ',' + request.body.active + ',"' + date.format(now, 'YYYY/MM/DD HH:mm:ss') + '");';
        console.log(query1);
    con.query(query1, function (err, result, fields) {
      if (err) 
      writeErrorLog(log.error("New user failed:::: "+request.body.username));
      else writeSuccessLog(log.info("New user added:::"+request.body.username));
      console.log("User Registration SUCCESS !!! ");
      setUserLocation();
      assignRole();
       response.send(JSON.stringify({'result':'new user added', 'user':request.body.username, 'type':request.body.usertype}));
    });
    });
    }
    function updateExistingUser(){
        const now = new Date();
        bcrypt.hash(request.body.password, 10, function(err, hash) {
          console.log('The salted password is ' + hash);
        var query2 = 'UPDATE new_users SET name="' + request.body.name + '",password="' + hash +
            '",active=' + request.body.active + ',usertype=' + request.body.usertype + ',created="' + date.format(now, 'YYYY/MM/DD HH:mm:ss') + 
            '" WHERE username="' + request.body.username + '";'
        console.log(query2);
    con.query(query2, function (err, result, fields) {
      if (err) 
      writeErrorLog(log.error("Update user failed:::: "+request.body.username));
      else writeSuccessLog(log.info("Update user done:::"+request.body.username));
      console.log("User Updation SUCCESS !!! ");
      setUserLocation();
      assignRole();
      response.send(JSON.stringify({'result':'existing user updated....', 'user':request.body.username, 'type':request.body.usertype}));
    });
    });
  }
  function assignRole() {
    var query3 = 'INSERT IGNORE INTO roles(username,login,profile,upload) VALUES("' + request.body.username + '",true,true,true);';
    console.log(query3);
  con.query(query3, function (err, result, fields) {
    if (err) 
    writeErrorLog(log.error("Roles assignment failed:::: "+request.body.username));
    else {
      writeSuccessLog(log.info("Roles assignment SUCCESS:::"+request.body.username));
    console.log("Roles assignment SUCCESS !!! ");
    }
     //response.send(JSON.stringify({'result':'Role assignment done', 'user':request.body.username, 'type':request.body.usertype}));
  });
  }
  function setUserLocation() {
    //var query = '"UPDATE new_users SET location="' + request.body.location + '" WHERE username="' + request.body.username + '"';
    var query = 'INSERT IGNORE INTO user_location(username,latitude,longitude) VALUES("' + request.body.username + '",' + 
    request.body.location[0] + ',' + request.body.location[1] + ');';
    console.log(query);
    con.query(query, function(err, result, fields) {
      if (err) writeErrorLog(log.error("location assignment failure:::: "+request.body.username));
      else {
        writeSuccessLog(log.info("location assignment SUCCESS:::"+request.body.username));
        console.log("Location set successfully");
      }
    });
  }
});

//Upload profile picture to server and DB:
app.post('/upload', multipartMiddleware, (req, res) =>{
      console.log('Entering into function upload profile picture');
      writeSuccessLog(log.info("Profile picture uploaded for :::"));
      // res.json({
      //     'message': 'File uploaded successfully.',
      // });
      console.log(req.files.file.path);
      console.log(req.body.username); //use this name as username in query
      if (req.body.username == 'admin') uploadPic();
      else validatePermissions(req.body.username);

      function validatePermissions(username){
        var query = 'SELECT upload FROM roles WHERE username="' + username + '";';
      console.log(query);
      con.query(query, function(err, result, fields){
        if (err) throw err;
        console.log(result);
        console.log(result[0]['upload']);
        if (result[0]['upload'] == 0) {res.send(JSON.stringify({'result':'permission denied for uploading pic...'}));}
        else uploadPic();
        //window.alert('permission denied for upload !!!');
      });
      }
      function uploadPic() {
        var query = "UPDATE new_users SET image='" + req.files.file.path + "' WHERE username='" + req.body.username + "';";
        console.log(query);
        con.query(query, function(err, result, fields){
          if (err) 
          writeErrorLog(log.error("Profic pic failed to upload in DB::: "));
          else {writeSuccessLog(log.info("Profile pic uploaded in DB:::"));
          console.log(result);
          res.send(JSON.stringify({'result':'Upload pic is SUCCESS...'}));
        }
        });
        moveFile(req.files.file.path, config.imagePath.imageUploadDest);
        }

        var moveFile = (file, dir2)=>{
          //include the fs, path modules
          var fs = require('fs');
          var path = require('path');
          //gets file name and adds it to dir2
          var f = path.basename(file);
          var dest = path.resolve(dir2, f);
          fs.rename(file, dest, (err)=>{
            if(err) 
            //throw err; 
            writeErrorLog(log.error("File moved failure"));
            else console.log('Successfully moved');
            writeSuccessLog(log.info('File move is SUCCESS...'));
            // res.send(JSON.stringify({'result':'Upload pic is SUCCESS...'}));
          });
        }
});

//Existing user login API:
app.post('/users/login', function(request, response) {
    console.log(request.body);
    writeSuccessLog(log.info('Login function entering....'));
    if (request.body.username == 'admin') login();
    else validatePermissions(request.body.username);
    function login(){
      const now = new Date();
      var query = 'SELECT password,usertype,active FROM new_users WHERE username=' + '"' + request.body.username + '"';
    console.log(query);
    con.query(query, function (err, result, fields) {
      console.log(result[0]['password']);
      console.log(request.body.password);
      let hash = result[0]['password'];
      console.log(result[0]['active']);
      console.log(result[0]['usertype']);
      console.log(result[0]);
      if (err){
          writeErrorLog(log.error('Login failure..'));
          console.log("Login failed......");
          response.send(JSON.stringify({'result':'Login failed'}));
        } else {
          validateUserPass();
      }
      function validateUserPass(){
        bcrypt.compare(request.body.password, hash, function(err, res) {
        if(res) {
          console.log(res);
          console.log('Password match');
          //return true;
          if (res == true && result[0]['active'] == false) {
            console.log("Inactive user::::");
            response.send(JSON.stringify({'result':'inactive user'}));
          }
          if (res == true && result[0]['active'] == true) {
            if (result[0]['usertype'] == 2) {
            console.log("You are a USER !!!! User Login SUCCESS !!! ");
            writeSuccessLog(log.info('Logged user' + request.body.username));
            response.send(JSON.stringify({'result':'existing user logged in','usertype':'user'}));
            addLoginTimeStamp();
            }
            if (result[0]['usertype'] == 1) {
            console.log("You are a ADMIN !!!! Admin Login SUCCESS !!! ");
            writeSuccessLog(log.info('Logged admin' + request.body.username));
            response.send(JSON.stringify({'result':'existing admin logged in','usertype':'admin'}));
            addLoginTimeStamp();
          }
        }
        } else {
          console.log(err);
          console.log('Password not match');
          //return false;
          response.send(JSON.stringify({'result':'incorrect login..please try again'}));
        }
        });
    }
    });
      function addLoginTimeStamp() {
        const now = new Date();
        var query = 'UPDATE new_users SET login_time="' + date.format(now, 'YYYY/MM/DD HH:mm:ss') + '" WHERE username="' + 
        request.body.username + '";';
        console.log(query);
        con.query(query, function(err,result,fields){
          if (err) throw err;
          else console.log(result);
        });
      }
    }
    function validatePermissions(username){
      var query = 'SELECT login FROM roles WHERE username="' + username + '";';
      console.log(query);
      con.query(query, function(err, result, fields){
        if (err) throw err;
        console.log(result);
        if (result[0]['login'] == true) login();
        else {response.send(JSON.stringify({'result':'permission denied...'}));
        //window.alert('permission denied for login');
      }
      });
    }
});

//Single user GET:
app.post('/users/info', function(request,response) {
  const now = new Date();
    console.log("Entering profile information function:::")
    console.log(request.body);
    writeSuccessLog(log.info('Profile info displayed.....'));
    validatePermissions(request.body.username);
    function showProfile(){
    var query = 'SELECT * FROM new_users WHERE active=1 AND username=' + '"' + request.body.username + '"';
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) 
        //throw err;
        writeErrorLog(log.error('Profile info DB query failed'));
        else {
            userInfo = {
                name: result[0]['name'],
                username: result[0]['username'],
                password: result[0]['password'],
                active: result[0]['active'],
                image: result[0]['image']
            };
          console.log("User profile info retrieval SUCCESS");
          writeSuccessLog(log.info('Profile info DB query SUCCESS'));
          console.log(userInfo);
          response.send(JSON.stringify({'result' : userInfo, 'status' : 'completed'}));
        }
      });
    }
    function validatePermissions(username){
        var query = 'SELECT profile FROM roles WHERE username="' + username + '";';
      console.log(query);
      con.query(query, function(err, result, fields){
        if (err) throw err;
        console.log(result);
        if (result[0]['profile'] == true) showProfile();
        else {response.send(JSON.stringify({'result' : 'permission denied'}));
        //window.alert('permission denied for profile');
      }
      });
      }
});

//All users GET
app.post('/users/admininfo', function(request,response) {
  const now = new Date();
  console.log("Entering profile information function:::")
  console.log(request.body);
  writeSuccessLog(log.info('Profile info displayed.....'));
  var query = 'SELECT * FROM new_users WHERE usertype=2;';   //usertype 2 is child
  console.log(query);
  con.query(query, function (err, result, fields) {
      if (err) 
      //throw err;
      writeErrorLog(log.error('Profile info DB query failed'));
      else {
          console.log(result);
        console.log("User profile info retrieval SUCCESS");
        writeSuccessLog(log.info('Profile info DB query SUCCESS'));
        response.send(JSON.stringify({'result' : result, 'status' : 'completed'}));
      }
    });
});

//Notify users added/deleted
app.post('/users/notifications', function(request,response) {
  const now = new Date();
  console.log("Entering notifications function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('notification info displayed.....'));
  var query1 = 'SELECT usertype from new_users WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    if (result[0]['usertype'] == 1) {
    console.log('Authorized to view notifications...');
  //   var query = "SELECT * from new_users WHERE usertype=2 AND created BETWEEN '" + new Date().toISOString().slice(0,10) + 
  // " 00:00:00' AND '" + new Date().toISOString().slice(0,10) + " 23:59:00';";
     var query = "SELECT * from new_users WHERE usertype=2 AND created BETWEEN '" + date.format(now, 'YYYY/MM/DD 00:00:00') + 
   "' AND '" + date.format(now, 'YYYY/MM/DD 23:59:00') + "';";

  console.log(query);
  con.query(query, function (err, result, fields) {
      if (err) 
      //throw err;
      writeErrorLog(log.error('Profile info DB query failed'));
      else {
          console.log(result);
        console.log("User profile info retrieval SUCCESS for NOTIFICATIONS");
        writeSuccessLog(log.info('Profile info DB query SUCCESS for NOTIFICATIONS'));
        response.send(JSON.stringify({'result' : result, 'status' : 'completed notifications'}));
      }
    });
  }
    else
    console.log('Not authorised to view notifications...');
  });
  //var query = 'SELECT * FROM new_users WHERE usertype=2 AND created="' + new Date().toISOString().slice(0,10) + '";';   //usertype 2 is child
});

//activates/deactivates users - by admin
app.post('/user/activation', function(request,response) {
  const now = new Date();
  console.log("Entering activate user function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('notification info displayed.....'));
  var query1 = 'UPDATE new_users SET active=' + request.body.active + ' WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields){
    if (err) throw err;
    else {
      console.log(result);
      // response.send('Profile activated/deactivated SUCCESS');
      response.send(JSON.stringify({'result' : result, 'status' : 'User activation done'}));
    }
  });
});

//Add role/assign role for users - by admin
app.post('/users/assignroles', function(request,response) {
  const now = new Date();
  console.log("Entering assign roles function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('notification info displayed.....'));
  var query1 = 'SELECT usertype from new_users WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    if (result[0]['usertype'] == 1) {
    console.log('Authorized to assign roles...');
    if (request.body.role == 'login')
    var query = 'UPDATE roles SET login=true WHERE username="' + request.body.user + '";';
    if (request.body.role == 'profile')
    var query = 'UPDATE roles SET profile=true WHERE username="' + request.body.user + '";';
    if (request.body.role == 'upload')
    var query = 'UPDATE roles SET upload=true WHERE username="' + request.body.user + '";';
  console.log(query);
  con.query(query, function (err, result, fields) {
      if (err) 
      //throw err;
      writeErrorLog(log.error('Assign role DB query failed'));
      else {
          console.log(result);
        console.log("Assign role SUCCESS");
        writeSuccessLog(log.info('Assign role SUCCESS'));
        response.send(JSON.stringify({'result' : result, 'status' : 'completed assignment'}));
      }
    });
  }
    else
    console.log('Not authorised to view notifications...');
  });
  //var query = 'SELECT * FROM new_users WHERE usertype=2 AND created="' + new Date().toISOString().slice(0,10) + '";';   //usertype 2 is child
});

//Removes roles fpr user - by admin
app.post('/users/removeroles', function(request,response) {
  const now = new Date();
  console.log("Entering remove roles function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('remove role displayed.....'));
  var query1 = 'SELECT usertype from new_users WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    if (result[0]['usertype'] == 1) {
    console.log('Authorized to remove roles...');
    if (request.body.role == 'login')
    var query = 'UPDATE roles SET login=false WHERE username="' + request.body.user + '";';
    if (request.body.role == 'profile')
    var query = 'UPDATE roles SET profile=false WHERE username="' + request.body.user + '";';
    if (request.body.role == 'upload')
    var query = 'UPDATE roles SET upload=false WHERE username="' + request.body.user + '";';
  console.log(query);
  con.query(query, function (err, result, fields) {
      if (err) 
      //throw err;
      writeErrorLog(log.error('remove role DB query failed'));
      else {
          console.log(result);
        console.log("remove role SUCCESS");
        writeSuccessLog(log.info('remove role SUCCESS'));
        response.send(JSON.stringify({'result' : result, 'status' : 'completed removal of role'}));
      }
    });
  }
    else
    console.log('Not authorised to remove role...');
  });
  //var query = 'SELECT * FROM new_users WHERE usertype=2 AND created="' + new Date().toISOString().slice(0,10) + '";';   //usertype 2 is child
});

//Fetch all tasks from tasks table - by admin
app.post('/users/tasks', function(request,response) {
  const now = new Date();
  console.log("Entering tasks function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('notification info displayed.....'));
  var query1 = 'SELECT usertype from new_users WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    if (result[0]['usertype'] == 1) {
    console.log('Authorized to view all tasks...');
    var query = "SELECT tasks from tasks;";
    console.log(query);
    con.query(query, function (err, result, fields) {
      if (err) 
      //throw err;
      writeErrorLog(log.error('Tasks info DB query failed'));
      else {
          console.log(result);
        console.log("Tasks info retrieval SUCCESS from TASK table");
        writeSuccessLog(log.info('Tasks info retrieval SUCCESS from TASK table'));
        response.send(JSON.stringify({'result' : result, 'status' : 'completed tasks retrieval'}));
      }
    });
  }
    else
    console.log('Not authorised to view all tasks...');
  });
  //var query = 'SELECT * FROM new_users WHERE usertype=2 AND created="' + new Date().toISOString().slice(0,10) + '";';   //usertype 2 is child
});

//Assign a task to user - by admin
app.post('/users/assigntasks', function(request,response) {
  const now = new Date();
  console.log("Entering assign tasks function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('assign tasks info displayed.....'));
  var query1 = 'SELECT usertype from new_users WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    if (result[0]['usertype'] == 1) {
    console.log('Authorized to assign task...');
    const task_end_time = date.addMinutes(now, 5);
    var query = 'INSERT INTO user_tasks(assigned_tasks,start_time,end_time) VALUES("' + request.body.taskname + '","' + 
    date.format(now, 'YYYY/MM/DD HH:mm:ss') + '","' + date.format(task_end_time, 'YYYY/MM/DD HH:mm:ss') + '");';
    console.log(query);
    con.query(query, function (err, result, fields) {
      if (err) 
      //throw err;
      writeErrorLog(log.error('assign task DB query failed'));
      else {
          console.log(result);
        console.log("Assign task SUCCESS");
        writeSuccessLog(log.info('Assign task SUCCESS'));
        response.send(JSON.stringify({'result' : result, 'status' : 'Assign task SUCCESS'}));
      }
    });
  }
    else
    console.log('Not authorised to Assign task...');
  });
  //var query = 'SELECT * FROM new_users WHERE usertype=2 AND created="' + new Date().toISOString().slice(0,10) + '";';   //usertype 2 is child
});

//View all assigned tasks - by users
app.post('/users/viewassignedtasks', function(request,response) {
  const now = new Date();
  console.log("Entering to view assigned task function for users:::")
  console.log(request.body);
  writeSuccessLog(log.info('view assign tasks info displayed.....'));
  var query1 = 'SELECT usertype from new_users WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    if (result[0]['usertype'] == 2) {
    console.log('Authorized to view all assigned tasks...');
    assignTaskToUser();
  } else console.log('Not authorised to view all tasks...');
  });
  function assignTaskToUser(){
    console.log('Inside assign task to user function....first getting logged in users...');
    var query = 'SELECT login_time FROM new_users WHERE username="' + request.body.username + '";';
    console.log(query);
    con.query(query, function(err, result, fields){
      if (err) throw err;
      console.log(result[0]['login_time']);
      console.log(date.format(now, 'YYYY/MM/DD HH:mm:ss'));
      //return result;
      //if (result[0]['login_time'] < date.format(now, 'YYYY/MM/DD HH:mm:ss')){
        var query = 'SELECT * from user_tasks;'
        console.log(query);
        con.query(query, function (err, result, fields) {
          if (err) 
      //throw err;
          writeErrorLog(log.error('Assigned task info DB query failed'));
          else {
          console.log(result);
          console.log("Assigned Tasks info retrieval SUCCESS from users TASK table");
          writeSuccessLog(log.info('Assigned Tasks info retrieval SUCCESS from users TASK table'));
          response.send(JSON.stringify({'result' : result, 'status' : 'assigned tasks retrieval done'}));
        }
      });
    //}
    });
  }
});

//Add new tasks - by admin
app.post('/users/addnewtask', function(request,response) {
  const now = new Date();
  console.log("Entering add tasks function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('assign tasks info displayed.....'));
  var query1 = 'SELECT usertype from new_users WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    if (result[0]['usertype'] == 1) {
    console.log('Authorized to add task...');
    //const task_end_time = date.addMinutes(now, 5);
    var query = 'INSERT INTO tasks(tasks) VALUES("' + request.body.taskname + '");';
    console.log(query);
    con.query(query, function (err, result, fields) {
      if (err) 
      //throw err;
      writeErrorLog(log.error('add task DB query failed'));
      else {
          console.log(result);
        console.log("add task SUCCESS");
        writeSuccessLog(log.info('add task SUCCESS'));
        response.send(JSON.stringify({'result' : result, 'status' : 'add task SUCCESS'}));
      }
    });
  }
    else
    console.log('Not authorised to Assign task...');
  });
  //var query = 'SELECT * FROM new_users WHERE usertype=2 AND created="' + new Date().toISOString().slice(0,10) + '";';   //usertype 2 is child
});

//Delete users - by admin
app.post('/users/delete', function(request,response) {
  console.log("Entering delete user function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('delete user info displayed.....'));
  var query1 = 'SELECT usertype from new_users WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    if (result[0]['usertype'] == 1) {
    console.log('Authorized to add task...');
    var query = 'DELETE FROM new_users WHERE username="' + request.body.name + '";';
    console.log(query);
    con.query(query, function (err, result, fields) {
      if (err) 
      //throw err;
      writeErrorLog(log.error('delete use DB query failed'));
      else {
          console.log(result);
        console.log("DELETE user SUCCESS");
        writeSuccessLog(log.info('delete task SUCCESS'));
        deleteRoles();
        // response.send(JSON.stringify({'result' : result, 'status' : 'delete task SUCCESS'}));
      }
    });
    function deleteRoles()
    {
      var query = 'DELETE FROM roles WHERE username="' + request.body.name + '";';
      console.log(query);
      con.query(query, function (err, result, fields) {
        if (err) 
        //throw err;
        writeErrorLog(log.error('delete roles DB query failed'));
        else {
            console.log(result);
          console.log("DELETE roles SUCCESS");
          writeSuccessLog(log.info('delete roles SUCCESS'));
          response.send(JSON.stringify({'result' : result, 'status' : 'delete roles SUCCESS'}));
        }
      });
    }
  }
    else
    console.log('Not authorised to Assign task...');
  });
});

//Port 5000 listening for backend:
app.listen(config.serverData.port , function() {
  console.log('Server running at http://127.0.0.1:5000/');
});

//Generic function that logs success info:
function writeSuccessLog(logData){
//fs.appendFile('log.json', logData , function (err) {
  fs.appendFile(config.serverData.logFile, logData , function (err) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
}

//Generic function that logs error info: 
function writeErrorLog(logData){
fs.appendFile(config.serverData.logFile,logData , function (err) {
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
          });
}

//Check if the user is active or inactive:::
app.post('/user/isactive', function(request,response) {
  console.log("Entering to check if user active function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('assign tasks info displayed.....'));
  var query1 = 'SELECT active from new_users WHERE username="' + request.body.username + '";';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    if (result[0]['active'] == true) {
      response.send(JSON.stringify({'result' : true, 'status' : 'user check SUCCESS'}));
      console.log('user is active');
    } else {
      response.send(JSON.stringify({'result' : false, 'status' : 'user check failed'}));
      console.log('user is inactive');
    }
    });
});

//Gets user location details
app.get('/users/location', function(request,response) {
  console.log("User location function for admin user:::")
  console.log(request.body);
  writeSuccessLog(log.info('User location  info displayed.....'));
  var query1 = 'SELECT * from user_location;';
  console.log(query1);
  con.query(query1, function(err, result, fields) {
    if (err) throw err;
    else
    response.send(JSON.stringify({'result' : result}));
    });
});

// //Get all user active/inactive status:
// app.post('/users/status', function(request,response) {
//   console.log("User location function for admin user:::")
//   console.log(request.body);
//   writeSuccessLog(log.info('User location  info displayed.....'));
//   var query1 = 'SELECT active from new_users WHERE username="' + request.body.username + '";';
//   console.log(query1);
//   con.query(query1, function(err, result, fields) {
//     if (err) throw err;
//     else
//     response.send(JSON.stringify({'result' : result}));
//     });
// });
