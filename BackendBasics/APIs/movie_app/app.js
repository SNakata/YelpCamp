const express = require("express");
const app = express();
const request = require("request");
app.set("view engine", "ejs");



app.get("/", function(req,res){
	res.render("search")
	
});


app.get("/results", function(req, res){
	var query = req.query.search
	var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
	
	request(url, function(error, response, body){
		console.error('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode);
		
		var parsedData = JSON.parse(body)
		// const results = parsedData["Search"].map(({Title, Year}) => ({Title, Year}))
		const data = parsedData
		
		res.render("results", {data: data})
	})
});

app.listen(3000, function(){
	console.log("Serverer listening on port 3000")
});