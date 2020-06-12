var    	express = require("express"),
	          app = express(),
  	 bodyParser = require("body-parser"), 
	      mongoose = require("mongoose");

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var campground = mongoose.model("Campground", campgroundSchema);

// campground.create(
// 		{ name : "Dessert Wind", 
// 		 image : "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 		description: "The Dessert Wind enhances the calmness of this beautifull campground"}
// 	, function(err,campground){
// 		if(err){
// 			console.log(err)
// 		} else {
// 			console.log("Newly Created Campground")
// 			console.log(campground)
// 		}
// });


app.get("/", function(req,res){
	res.render("landing")
});

app.get("/campgrounds", function(req,res){
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err)
		} else{
			res.render("index", {campgrounds:allCampgrounds})
		}
	});
});

app.post("/campgrounds", function(req,res){
	const name = req.body.name
	const image = req.body.imageurl
	const desc = req.body.description
	const newCampground = {name: name, image: image, description: desc}
		campground.create(newCampground,function(err,newlyCreated){
			if(err){
				console.log(err)
			} else{
			res.redirect("campgrounds")
			}
		});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new")	
});


app.get("/campgrounds/:id", function(req, res){
	campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err)
		} else { 
			res.render("show", {campground : foundCampground});
		}
	});
});


app.listen(3000, function(){
	console.log("YelpCamp is running")
});