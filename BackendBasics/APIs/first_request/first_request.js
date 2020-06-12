var request = require('request');

request('http://api.openweathermap.org/data/2.5/forecast?id=2759794&appid=9f54a959699fa73883dea2c7d1faef73', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  var parsedData = JSON.parse(body)
	const res = parsedData["list"]
		.map(({ main: { temp, feels_like }}) => ({ temp, feels_like }))
	console.log('body:', res) 
});

