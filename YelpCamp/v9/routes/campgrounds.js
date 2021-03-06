const express = require('express');
const router  = express.Router();
const campground = require("../models/campground");
const comment = require("../models/comment")
const middleware = require("../middleware")


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
router.post("/", middleware.isLoggedIn, function(req,res){
	const name = req.body.name
	const image = req.body.imageurl
	const desc = req.body.description
	const author= {
			id: req.user._id,
			username: req.user.username,
		}
	const newCampground = {name: name, image: image, description: desc, author: author}
		campground.create(newCampground,function(err,newlyCreated){
			if(err){
				console.log(err)
			} else{
			res.redirect("campgrounds")
			}
		});
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  campground.findById(req.params.id, function(err, foundCampground){
  	if(err){
  		console.log(err)
  	}else{
  		res.render("campgrounds/edit", {campground: foundCampground});
			}
 	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});


module.exports = router;
