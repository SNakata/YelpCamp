const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useUnifiedTopology', true);

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
});

const post = mongoose.model("Post", postSchema);

const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [	
		{ 
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
});

const user = mongoose.model("User", userSchema);

user.create({
	email: "Steve@hotmail.com",
	name: "Steve stevenson"
});

// post.create({
// 	title: "How to sail pt.3",
// 	content: "Understand the tides",
// },function(err,post){
// 		if(err){
// 		 console.log(error)
// 		} else {
// 				 user.findOne({email:"Steve@hotmail.com"}, function(err,foundUser){
// 					if(err){
// 						console.log(err)
// 				} else{
// 				foundUser.posts.push(post)
// 				foundUser.save(function(err,data){
// 					if(err){
// 						console.log(data)
// 					} else {
// 						console.log(data)
// 					}
// 				});
// 			};
// 		});
// 	};
// });

user.findOne({email:"Steve@hotmail.com"}).populate("posts").exec(function(err,userData){
	if(err){
		console.log(err)
	} else{
		console.log(userData)
	};
});
