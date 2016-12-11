var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('input.txt')
});

lineReader.on('close', function () {
	console.log(bots);
});

var bots = {};

var instructions = [];

lineReader.on('line', function (line) {
		parseLine(line);
});

function parseLine(line) {
	if(line.startsWith('val')) {
		var botId = parseInt(line.match(/\d+/g)[0]);
		var value = parseInt(line.match(/\d+/g)[1]);
		if(bots[botId]) {
			bots[botId].addValue(value);
		} else {
			bots[botId] = createBotWithValue(value);
		}
	}
}

function createBotWithValue(value) {
	return {
		values: [value],
		addValue: function(value) {
			values.push(value);
		}
	};
}