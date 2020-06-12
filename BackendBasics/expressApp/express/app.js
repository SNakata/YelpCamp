var express = require("express");
var app = express();

app.get("/", function(request, response){
	response.send("Hi there, how are you?")
})

app.get("/r/:subredditName", function(request, response){
	var subReddit = request.params.subredditName;
	response.send("Welcome to the " + subReddit.toUpperCase() + " Subreddit")
})

app.get("*", function(request, response){
	response.send("Error 404 page not found")
})


app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});