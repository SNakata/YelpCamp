var express = require("express");
var app = express();


app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", function(req,res){
	res.render("home");
})

app.get("/fellinlovewith/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar: thing})
})

app.get("/posts", function(req, res){
	var posts = [
		{title: "First Post", author: "Susie"},
		{title: "Dancing Dauwg", author: "Mary Poppins"},
		{title: "Top 10 SEO performance tips", author: "Businessman Bob"}		
	]
	
	res.render("posts", {posts: posts})
});


app.get("*", function(req, res){
	
	res.render("404")
	
	
})

app.listen(3000, function(){
	console.log("the server is listen on port 3000")
});
