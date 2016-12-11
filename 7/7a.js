var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('input.txt')
});

var numberOfValidIP7 = 0;

var lines = [];

lineReader.on('close', function () {
	console.log("numberOfValidIP7 " + numberOfValidIP7);
});

lineReader.on('line', function (line) {
	var squareWords = getSquareWords(line);
	console.log(squareWords);
	if(hasPalindrome(squareWords)) {
		return;
	}
	var palindromeFounded = false;
	var words = removeSquareBrackets(line).split('*');
	for(var i=0; i<words.length && !palindromeFounded; ++i) {
		for(var j=0; j+4<=words[i].length && !palindromeFounded; ++j) {
				if(isPalindrome(words[i].substr(j, 4))) {
					++numberOfValidIP7;
					palindromeFounded = true;
				}
		}
	}
});

function hasPalindrome(squareWords) {
	for(var i=0; i<squareWords.length; ++i) {
		for(var j=0; j+4<=squareWords[i].length; ++j) {
			if(isPalindrome(squareWords[i].substr(j, 4))) {
				return true;
			}
		}
	}
	return false;
}

function removeSquareBrackets(line) {
	while(line.match(/(\[(.*?)\])/) !== null) {
		line = line.replace(/(\[(.*?)\])/, '*');
	}
	return line;
}

function getSquareWords(line) {
	var textInBrackets = line.match(/\[(.*?)\]/gi);
	for(var i=0; i<textInBrackets.length; ++i) {
		textInBrackets[i] = textInBrackets[i].replace('[', '').replace(']','');
	}
	return textInBrackets;
}

function isPalindrome(word) {
	return word[0] == word[3] && word[1] == word[2] && word[0] != word[1];
}
