const express = require('express')
const router  = express.Router();
const user = require("../models/user")
const passport = require("passport")

router.get("/", function(req,res){
	res.render("landing")
});

// REGISTER ROUTES
router.get("/register", function(req, res){
	res.render("register")
});

// HANDING SIGN UP LOGIC
router.post("/register", function(req,res){
	const newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render("/register")
		} 
			passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds")
		});
	});
});


// LOGIN ROUTES
router.get("/login", function(req,res){
	res.render("login")
});

// HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local",
	 { successRedirect:"/campgrounds",
		 failureRedirect:"/login", 
 	}), function(req,res){
});

// LOGOUT Route
router.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds")
});


//MIDDLEWARE
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};


module.exports = router;
