var    	express = require("express"),
     campground = require("./models/campground"),
   	    comment = require("./models/comment"),
	          app = express(),
       passport = require("passport"),
  localStrategy = require("passport-local"),
  	 bodyParser = require("body-parser"), 
	     mongoose = require("mongoose"),
           User = require("./models/user"),
  	     seedDB = require("./seeds"); 
  

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v6", { useNewUrlParser: true });

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"));
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"satoru_nakata",
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});


// ============ ROUTES =================


app.get("/", function(req,res){
	res.render("landing")
});

// ============ CAMPGROUNDS ROUTES =================


// INDEX ROUTE 

app.get("/campgrounds", function(req,res){
	campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err)
		} else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground: campground})
		}
	});
});

// CREATE ROUTE

app.post("/campgrounds/:id/comments", isLoggedIn, function(req,res){
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

// ============== AUTH ROUTE=====================


// REGISTER ROUTES

app.get("/register", function(req, res){
	res.render("register")
});

app.post("/register", function(req,res){
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

app.get("/login", function(req,res){
	res.render("login")
});

app.post("/login", passport.authenticate("local",
	 { successRedirect:"/campgrounds",
		 failureRedirect:"/login", 
 	}), function(req,res){
});

// LOGOUT Route

app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds")
});


// IS LOGGED IN FUNCITON

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};


// SERVER 

app.listen(3000, function(){
	console.log("YelpCamp is running")
});
