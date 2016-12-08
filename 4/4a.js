_ = require('lodash');
fs = require('fs');
fs.readFile('input.js', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var rooms = JSON.parse(data).input;
  var realRooms = getRealRooms(rooms);
  console.log(getSectorsIdsSum(realRooms));
});

function getRealRooms(rooms) {
	var realRooms = [];
	for(var i=0; i<rooms.length; ++i) {
		if(isRoomReal(rooms[i])) {
			realRooms.push(rooms[i]);
		} else {
			console.log(rooms[i].hash);
		}
	}
	return realRooms;
}

function isRoomReal(room) {
	var charsInRoomName = countCharsInName(room.name);
	return hashContainsFirstFive(charsInRoomName, room.hash) ? true : false;
}

function hashContainsFirstFive(charsInRoomName, hash) {
	var first5Letters = getNameLetters(charsInRoomName);
	if(hash !== first5Letters) {
			return false;
	}
	return true;
}

function getNameLetters(charsInRoomName) {
	var result = "";
	for(var i= 0; i < 5; ++i) {
		result += charsInRoomName[i].letter;
	}
	return result;
}

function countCharsInName(name) {
	var result = {};
	for(var i=0; i<name.length; ++i) {
		if(result[name[i]]) {
			++(result[name[i]].occurences);
		} else {
			result[name[i]] = {occurences:1, letter: name[i]};
		}
	}
	return _.orderBy(result, ["occurences", "letter"], ['desc', 'asc']);
} 

function getSectorsIdsSum(realRooms) {
	var sum = 0;
	for(var i=0; i<realRooms.length; ++i) {
		sum += realRooms[i].number;
	}
	return sum;
}  