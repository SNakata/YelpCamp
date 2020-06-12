var express = require("express");
var app = express();
var bodyParser = require("body-parser")

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))


var campgrounds =[
		{name: "Goat Hill", image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
		{name: "Lazy Fields", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
		{name: "Dessert Wind", image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
		{name: "Hollowood Forrest", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"}
	]

app.get("/", function(req,res){
	res.render("landing")
});

app.get("/campgrounds", function(req,res){
	res.render("campgrounds", {campgrounds:campgrounds})
});

app.post("/campgrounds", function(req,res){
	const name = req.body.name
	const image = req.body.imageurl
	const newCampground = {name: name, image: image}
	campgrounds.push(newCampground)
	res.redirect("campgrounds")
});

app.get("/campgrounds/new", function(req, res){
	res.render("new")	
});


app.listen(3000, function(){
	console.log("YelpCamp is running")
})