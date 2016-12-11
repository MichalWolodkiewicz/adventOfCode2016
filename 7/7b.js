var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('input.txt')
});

var numberOfSupportingSSL = 0;

var lines = [];

lineReader.on('close', function () {
	console.log("numberOfSupportingSSL " + numberOfSupportingSSL);
});

lineReader.on('line', function (line) {
	var squareWords = getSquareWords(line);
	var words = removeSquareBrackets(line).split('*');
	var abas = findPalindromes(words);
	var babs = findPalindromes(squareWords);
	var supportSSL = false;
	for(var i=0; i<abas.length && supportSSL == false; ++i) {
		for(var j=0; j<babs.length && supportSSL == false; ++j) {
			if(checkSupportSSL(abas[i], babs[j])) {
				supportSSL = true;
				++numberOfSupportingSSL;
			}
		}
	}
});

function checkSupportSSL(aba, bab) {
	return aba[0] == bab[1] && aba[1] == bab[0];
}

function findPalindromes(words) {
	var abas = [];
	for(var i=0; i<words.length; ++i) {
		for(var j=0; j+3<=words[i].length; ++j) {
			if(isAba(words[i].substr(j, 3))) {
				abas.push(words[i].substr(j, 3));
			}
		}
	}
	return abas;
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

function isAba(word) {
	return word[0] == word[2] && word[0] != word[1];
}
