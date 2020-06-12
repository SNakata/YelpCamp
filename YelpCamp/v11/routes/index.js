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
router.post("/register", function(req, res){
    var newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username)
           res.redirect("/campgrounds"); 
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
	req.flash("success", "Logged out succesfully")
	res.redirect("/campgrounds")
});



module.exports = router;
