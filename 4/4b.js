_ = require('lodash');
fs = require('fs');

var Z_CODE = "z".charCodeAt(0),
A_CODE = "a".charCodeAt(0);

fs.readFile('input.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var rooms = JSON.parse(data).input;
  var decodedNames = decodeRoomsNames(rooms);
  var searchedNames = findNamesWithExpression(decodedNames, 'orth');
  console.log(searchedNames);
});

function findNamesWithExpression(decodedNames, expression) {
	var result = [];
	for(var i=0; i< decodedNames.length; ++i) {
		if(decodedNames[i].name.match(expression)) {
			result.push(decodedNames[i].sectorId);
		}
	}
	return result;
}

function decodeRoomsNames(rooms) {
	var result = [];
	for(var i=0; i< rooms.length; ++i) {
		result.push({ name: decodeName(rooms[i].name, rooms[i].number), sectorId: rooms[i].number});
	}
	return result;
}

function decodeName(name, times) {
	var result = "";
	for(var i=0; i< name.length; ++i) {
		var code = shiftNumber(name.charCodeAt(i), times);
		result += String.fromCharCode(code);
	}
	return result;
}

function shiftNumber(letter, times) {
	for(var i=0; i< times; ++i) {
		if(letter == Z_CODE) {
			letter = A_CODE;
		} else {
			++letter;
		}
	}
	return letter;
}