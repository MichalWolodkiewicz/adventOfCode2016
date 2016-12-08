function isTriangle(a, b, c) {
	  return a+b > c && b+c > a && a+c>b ? true : false;
}

function countTriangles(rawInput) {
	var input = JSON.parse(rawInput).input;
	var trianglesCount = 0;
	for(var i=0; i<input.length; i+=3) {
		console.log(input[i]+"|"+input[i+1]+"|"+input[i+2]);
	  if(isTriangle(parseInt(input[i]), parseInt(input[i+1]), parseInt(input[i+2]))) {
		++trianglesCount;
	  }
	}
	console.log(trianglesCount);
}

fs = require('fs');
fs.readFile('input.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  countTriangles(data);
});

