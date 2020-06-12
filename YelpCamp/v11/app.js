const   express       = require("express"),
        campground    = require("./models/campground"),
   	    comment       = require("./models/comment"),
        flash         = require("connect-flash"),
	      app           = express(),
        passport      = require("passport"),
        localStrategy = require("passport-local"),
  	    bodyParser    = require("body-parser"), 
	      mongoose      = require("mongoose"),
        User          = require("./models/user"),
  	    seedDB        = require("./seeds"),
      methodOverride  = require("method-override");

// REQUIRING ROUTES
const indexRoutes      = require("./routes/index"),
      commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds");
  



mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp_v11", { 
	useNewUrlParser: true,
	useFindAndModify: false});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


// SERVER 

app.listen(3000, function(){
	console.log("YelpCamp is running")
});
