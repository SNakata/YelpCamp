var faker = require('faker');

	console.log("=============================================")
	console.log("Welcome to the grand shop of magical products")	
	console.log("=============================================")

for(i = 0; i <= 10; i++){
	console.log(faker.commerce.product()+ " " + faker.commerce.product()+  " " + "-" + " " + "€" + faker.commerce.price())
}

