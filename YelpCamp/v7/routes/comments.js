const express = require('express')
const router  = express.Router({mergeParams:true});
const campground = require("../models/campground")
const comment =require("../models/comment")

// NEW ROUTE
router.get("/new", isLoggedIn, function(req,res){
campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground, })
		}
	});
});

// CREATE ROUTE
router.post("/", isLoggedIn, function(req,res){
		campground.findById(req.params.id, function(err, campground){
			if(err){
				console.log(err)
				res.redirect("/campgrounds")
			} else {
			comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err)
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save(comment);
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// MIDDLEWARE
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};

module.exports = router;