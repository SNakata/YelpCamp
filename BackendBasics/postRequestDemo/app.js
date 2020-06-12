var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended: true}))

var friends = ["Tony", "Dave", "Justin", "Lily"];

app.get("/", function(req, res){
	res.render("home");
});


app.post("/addfriend" , function(req, res){
	var newFriend = req.body.newfriend;
	friends.push(newFriend)
	res.redirect("/friends")
});

app.get("/friends", function(req, res){
	res.render("friendspage", {friends : friends}) 
});

app.listen(3000,function(){
	console.log("server listening to port 3000")
});