var grades = [90, 98, 89, 100, 100, 86, 94];

var grades2= [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];


function average(scores){
	var totalScore = 0
	scores.forEach(function(score){
		totalScore += score	
	});
	var avg = totalScore / scores.length 
	return Math.round(avg);
}

console.log(average(grades))
console.log(average(grades2))