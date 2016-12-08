function isTriangle(a, b, c) {
	  return a+b > c && b+c > a && a+c>b ? true : false;
}

function countTriangles(rawInput) {
	var input = JSON.parse(rawInput).input;
	var trianglesCount = 0;
	for(var i=0; i<input.length; ++i) {
	  if(isTriangle(parseInt(input[i]), parseInt(input[i+3]), parseInt(input[i+6]))) {
		++trianglesCount;
	  }
	  if((i+1)%3 == 0) {
		  i+=6;
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

