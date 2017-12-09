const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const request  = require('request');

var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));


app.get('/',function(req,res) {
  res.send('Hello World - Vishal');
});

app.get('/authors',function(req,res) {
  var display = "";
  request('https://jsonplaceholder.typicode.com/users',function(error,response,body) {
  if(!error) {
    var authorDetails = JSON.parse(body);

    request('https://jsonplaceholder.typicode.com/posts',function(error,response,body) {
      if(!error) {
        var postDetails = JSON.parse(body);
        var lenAuthors = authorDetails.length;
        var lenPosts = postDetails.length;
        var index = 1;
        for(var i = 0; i < lenAuthors; i++) {
          var count = 0;
        for(var j = 0; j < lenPosts; j++) {
          if(authorDetails[i].id.toString() == postDetails[j].userId.toString())
            count = count + 1;
        }
        display += index + ". " + authorDetails[i].name.toString() + " has posted " + count + " posts." + "<br/>";
        index = index + 1;
      }
      res.send(display);
    }
  });
  }
  });

});


app.get('/setcookie',function(req,res) {
  res.cookie('name','vishal');
  res.cookie('age','19');
  res.send('Cookies has been set successfully!');

});


app.get('/getcookies',function(req,res) {

  res.send('Name : ' + JSON.stringify(req.cookies.name) + '<br/>' + 'Age : ' + JSON.stringify(req.cookies.age));
});


app.get('/robots.txt',function(req,res) {
  res.status(403);
  res.send('Access Denied !');
});


app.get('/html',function(req,res){
  res.sendFile(path.join(__dirname + '/simple.html'));
});


app.get('/image',function(req,res) {
  res.sendFile(path.join(__dirname + '/img.png'));
});


app.get('/input',function(req,res){
  res.sendFile(path.join(__dirname + '/inputfile.html'));
});


app.post('/output',function(req,res) {
  var data = req.body.name;
  console.log(JSON.stringify(data));
  res.send('Data Received');
});


app.listen(8080,function() {
  console.log('App is listening on port 8080!');
});
