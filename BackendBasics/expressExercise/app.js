var express = require("express")

var app = express()

app.get("/", function(req, res){
	res.send("Hello world, Welcome to my assignment")
})

app.get("/speak/:animal", function(req, res){
		var sounds = {
			pig: "oink",
			cow: "moo",
			dog: "woof woof",
			cat: "I hate humans",
			fish: "...",
			horse: "neighhh"
		}
		var animal = req.params.animal.toLowerCase();
		var sound = sounds[animal]
		res.send("The " + animal + " says " + sound)
});

app.get("/repeat/:phrase/:number", function(req, res){
		var phrase = req.params.phrase
		var numRepeat = Number(req.params.number)
		var returnText = []

		for(i = 0; i < numRepeat; i++){
			returnText += phrase + " "
		}
		res.send(returnText)
});

app.get("*", function(req, res){
	res.send("Sorry page not found.. What are you doing with your life")
})


app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});