const mongoose = require("mongoose")
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cats_app", { useNewUrlParser: true });


var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	Temperament: String,
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
// 	name: "Mrs Norris",
// 	age: "13",
// Temperament: "Evil"	
// })

// george.save(function(err, cat){
// 	if(err){
// 	console.log("Something Went Wrong")
// 	} else{
// 		console.log("You just saved a cat to the database")
// 		console.log(cat)
// 	};
// });


Cat.create({
	name:"Steve",
	age: "12",
	Temperament: "Lowzy",
},function(err,cat){
		if(err){
			console.log(err)
		} else {
		console.log("New Cat...")
		console.log(cat)}
});



Cat.find({}, function(err,cats){
	if(err){
		console.log("Someting went wrong")
		console.log(err)
	} else{
		console.log("All The Cats...")
		console.log(cats)
	};
	

});

