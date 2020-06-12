var    	express = require("express"),
     campground = require("./models/campground"),
   	    comment = require("./models/comment"),
	          app = express(),
  	 bodyParser = require("body-parser"), 
	     mongoose = require("mongoose"),
  	     seedDB = require("./seeds");


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v5", { useNewUrlParser: true });

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"));
// seedDB();

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

// INDEX ROUTE 

app.get("/campgrounds", function(req,res){
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err)
		} else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds})
		}
	});
});

// CREATE ROUTE

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

// NEW ROUTE

app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new")	
});


// SHOW ROUTE

app.get("/campgrounds/:id", function(req, res){
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		} else { 
			res.render("campgrounds/show", {campground : foundCampground});
		}
	});
});

// ============COMMENTS-ROUTES=================

// NEW ROUTE

app.get("/campgrounds/:id/comments/new", function(req,res){
campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground})
		}
	});
});

// CREATE ROUTE

app.post("/campgrounds/:id/comments",function(req,res){
		campground.findById(req.params.id, function(err, campground){
			if(err){
				console.log(err)
				res.redirect("/campgrounds")
			} else {
			comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err)
				} else {
					campground.comments.push(comment);
					campground.save(comment);
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});


app.listen(3000, function(){
	console.log("YelpCamp is running")
});