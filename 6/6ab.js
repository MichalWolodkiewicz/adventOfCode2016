var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('input.txt')
});

var columnCharOccurences = [{},{},{},{},{},{},{},{}];

lineReader.on('close', function () {
	var password = "";
	var maxOccurencesNumber;
	var maxOccurencesNumberChar;
	for(var i=0; i<8; ++i) {
		maxOccurencesNumber = 100;
		for(var charName in columnCharOccurences[i]) {
			if(columnCharOccurences[i][charName] < maxOccurencesNumber) {
				maxOccurencesNumber = columnCharOccurences[i][charName];
				maxOccurencesNumberChar = charName;
			}
		}
		password += maxOccurencesNumberChar;
	}
	console.log(password);
});

lineReader.on('line', function (line) {
	for(var i=0; i<line.length; ++i) {
		if(columnCharOccurences[i][line[i]] !== undefined ) {
			columnCharOccurences[i][line[i]] += 1;
		} else {
			columnCharOccurences[i][line[i]] = 0;
		}
	}
});
