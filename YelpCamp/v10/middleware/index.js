var campground = require("../models/campground");
var comment = require("../models/comment");


var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				res.redirect("back")
			}else{
// 				DOES THE USER OWN THE CAMPGROUND
				if(foundCampground.author.id.equals(req.user._id)){
					next();
			} else{
					req.flash("error", "You don't have permission to do that")
					res.redirect("back")
				}
			}
		});
	} else {
		res.redirect("/login")
	}
};

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "campground not found")
				res.redirect("back")
			}else{
// 				DOES THE USER OWN THE COMMENT?
				if(foundComment.author.id.equals(req.user._id)){
					next();
			} else{
				req.flash("error", "You don't have permission to do that")
				res.redirect("back")
				}
			}
		});
	}else {
		req.flash("error", "You need to be logged in to do that")
		res.redirect("/login")
	}
};


middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
		req.flash("error", "You need to be logged in to do that")
		res.redirect("/login")
};

module.exports = middlewareObj