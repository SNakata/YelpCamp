const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useUnifiedTopology', true);




const postSchema = new mongoose.Schema({
	title: String,
	content: String,
});

const post = mongoose.model("Post", postSchema);

const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

const user = mongoose.model("User", userSchema);


var newUser = new user({
	email: "KKRool@dk.com",
	name: "King K Rool"
})

newUser.posts.push({
	title: "How to blow up DK's island",
	content: "By using the laser beam"
});

newUser.save(function(err,user){
	if(err){
		console.log(err)
	} else{
		console.log(user)
	};
});

// var newPost = new post({
// 	title: "Schulterbrauw te duur",
// 	content: "bier is te duur"
// });

// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err)
// 	} else{
// 		console.log(post)
// 	};
// });


// user.findOne({name:"King K Rool" }, function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else{
// 		user.posts.push({
// 			title:"The best crown wax",
// 			content:"Goldshine pro makes sure the crown keeps shining",
// 			});
// 		} user.save(function(err,user){
// 			if(err){
// 				console.log(err)
// 			} else{
// 				console.log(user)
// 			};
// 		});
// });
