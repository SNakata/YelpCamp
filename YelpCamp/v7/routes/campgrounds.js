const express = require('express');
const router  = express.Router();
const campground = require("../models/campground");
const comment = require("../models/comment")


// INDEX ROUTE 
router.get("/", function(req,res){
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err)
		} else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});
});

// CREATE ROUTE
router.post("/", function(req,res){
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
router.get("/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new")	
});


// SHOW ROUTE
router.get("/:id", function(req, res){
	campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		} else { 
			res.render("campgrounds/show", {campground : foundCampground});
		}
	});
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};


module.exports = router;
