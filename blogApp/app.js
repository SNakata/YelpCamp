const  express = require("express"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer")
    bodyParser = require("body-parser"),
 	    mongoose = require("mongoose"),  
           app = express();


// APP CONFIG
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.use(expressSanitizer())

// MONGOOSE & MODEL CONFIG

const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created:{type: Date, default: Date.now}
});

const blog = mongoose.model("Blog", blogSchema);

// blog.create({
// 	title: "Test Blog",
// 	image: "https://images.unsplash.com/photo-1589987637306-05ee56dab871?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
// 	body: "Hello this is a blogpost!"
// });

// RESTFULL ROUTING CONFIG

app.get("/", function(req,res){
	res.redirect("blogs")
});

// INDEX ROUTE

app.get("/blogs", function(req, res){
	blog.find({}, function(err, blogs){
		if(err){
			console.log(err)
		} else{
			res.render("index", {blogs: blogs})
		}
	});
});

// CREATE ROUTE

app.get("/blogs/new", function(req, res){
	res.render("new")
});

app.post("/blogs", function(req,res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	blog.create(req.body.blog, function(err,newBlog){
		if(err){
			console.log(err)
		} else {
			res.redirect("/blogs")
		}
	});	
});

// SHOW ROUTE

app.get("/blogs/:id",function(req,res){
	blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			console.log(err);
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		};
	});
});

// EDIT & UPDATE ROUTE

app.get("/blogs/:id/edit", function(req,res){
	blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			res.redirect("/blogs")
		} else {
				res.render("edit", {blog: foundBlog})
		}
	});
})

app.put("/blogs/:id", function(req,res){
		req.body.blog.body = req.sanitize(req.body.blog.body);
	blog.findByIdAndUpdate(req.params.id, req.body.blog,function(err,updatedBlog){
		if(err){
			res.redirect("/blogs")
		} else{
			res.redirect("/blogs/" + req.params.id);
		};
	});
});

// DELETE ROUTE

app.delete("/blogs/:id", function(req, res){
	blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs")
		} else {
			res.redirect("/blogs")
		}
	});
});


app.listen(3000, function(){
	console.log("Blogpost App is running")
})