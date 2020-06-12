const express = require('express')
const router  = express.Router({mergeParams:true});
const campground = require("../models/campground")
const comment =require("../models/comment")
const middleware = require("../middleware")

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground, })
		}
	});
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req,res){
		campground.findById(req.params.id, function(err, campground){
			if(err){
				console.log(err)
				res.redirect("/campgrounds")
			} else {
			comment.create(req.body.comment, function(err,comment){
				if(err){
					req.flash("error", "Something went wrong")
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save(comment);
					req.flash("success", "succesfully added comment")
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});


// EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back")
		} else{
		 res.render("comments/edit", {campground_id:req.params.id, comment: foundComment})
		}
	});
});

// UPDATE ROUTE

router.put("/:comment_id", middleware.checkCampgroundOwnership, function(req, res){
	comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
		if(err){
			res.redirect("back")
		} else {
			res.redirect("/campgrounds/" + req.params.id)
		};
	});
});

// DESTROY ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back")
		} else{
			req.flash("success", "Comment deleted succesfully")
			res.redirect("/campgrounds/" + req.params.id)		
		};
	});
});

module.exports = router;