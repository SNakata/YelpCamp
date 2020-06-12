const   express                    = require("express"),
        mongoose                   = require("mongoose"),
        passport                   = require("passport"),
        bodyParser                 = require("body-parser"),
        User                       = require("./models/user"),
        localStrategy              = require("passport-local"),  
        passportLocalMongoose      = require("passport-local-mongoose");
        
const app = express();

app.use(require("express-session")({
	secret: "My family is amazing",
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}))

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });
app.set("view engine", "ejs");


app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// ================ ROUTES ========================


app.get("/", function(req,res){
	res.render("home")
});


app.get("/secret", isLoggedIn, function(req,res){
	res.render("secret")
});

// REGISTER ROUTES

app.get("/register", function(req,res){
	res.render("register")
});

app.post("/register",function(req,res){
		User.register(new User({username: req.body.username}),req.body.password,                  		function(err,user){
			if(err){
				console.log(err)
				res.render("register")
			} else{
				passport.authenticate("local")(req,res,function(){
					res.redirect("/secret")
				});
			};
		});
	});

// LOGIN ROUTES

app.get("/login", function(req,res){
	res.render("login")
})

// Middleware
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login",
	}) ,function(req,res){
});

// LOGOUT ROUTE

app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/")
});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
};


app.listen(3000, function(){
	console.log("Server has started")
});