var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('input.txt')
});

var SCREEN_ROW = 50;
var SCREEN_COLUMNS = 6;

var screen = {
	pixels: [],
	init: function() {
		for(var i=0; i< SCREEN_ROW*SCREEN_COLUMNS; ++i) {
			this.pixels[i] = 0;
		}
	},
	turnOnPixels: function(x, y) {
		var offset = 0;
		for(var i=0; i< y; ++i) {
			for(var j=0; j< x; ++j) {
				this.pixels[offset+j] = 1;
			}
			offset += SCREEN_ROW;
		}
	},
	shiftColumn: function(columnIndex, shift) {
		this.shiftColumnValues(columnIndex, this.copyColumn(columnIndex), shift);
	},
	shiftRow: function(rowIndex, shift) {
		this.shiftRowValues(rowIndex, this.copyRow(rowIndex), shift);
	},
	copyColumn: function(columnIndex) {
		var columnCopy = '';
		var offset = 0;
		for(var i=0; i< SCREEN_COLUMNS; ++i) {
			columnCopy += this.pixels[offset + columnIndex];
			offset += SCREEN_ROW;
		}
		return columnCopy;
	},
	copyRow: function(rowIndex) {
		var rowCopy = '';
		for(var i=0; i< SCREEN_ROW; ++i) {
			rowCopy += this.pixels[rowIndex * SCREEN_ROW + i];
		}
		return rowCopy;
	},
	shiftColumnValues: function(columnIndex, columnCopy, shift) {
		if(shift > SCREEN_COLUMNS) {
			shift -= shift/SCREEN_COLUMNS*SCREEN_COLUMNS;
		}
		for(var i=0; i< columnCopy.length; ++i) {
			var newIndex = i + shift;
			if(newIndex > SCREEN_COLUMNS -1) {
				newIndex -= SCREEN_COLUMNS;
			}
			this.pixels[newIndex * SCREEN_ROW + columnIndex] = columnCopy[i];
		}
	},
	shiftRowValues: function(rowIndex, rowCopy, shift) {
		if(shift > SCREEN_ROW) {
			shift -= shift/SCREEN_ROW*SCREEN_ROW;
		}
		for(var i=0; i< rowCopy.length; ++i) {
			var newIndex = i + shift;
			if(newIndex > SCREEN_ROW -1) {
				newIndex -= SCREEN_ROW;
			}
			this.pixels[newIndex + SCREEN_ROW*rowIndex] = rowCopy[i];
		}
	},
	print: function() {
		var offset = 0;
		for(var i=0; i< SCREEN_COLUMNS; ++i) {
			var row = "";
			for(var j=0; j< SCREEN_ROW; ++j) {
				row += this.pixels[offset++] == 0 ? '.' : '*';
			}
			console.log(row);
		}
	},
	getActivePixelsCount() {
		var activePixels = 0;
		for(var i=0; i< this.pixels.length; ++i) {
			activePixels += this.pixels[i] > 0 ? 1 : 0;
		}
		return activePixels;
	}
};

screen.init();

lineReader.on('close', function () {
	
});


lineReader.on('line', function (line) {
	if(line.indexOf('rect') > -1 ) {
		var squareDimension = line.replace('rect ', '').split('x');
		screen.turnOnPixels(parseInt(squareDimension[0]), parseInt(squareDimension[1]));
	} else if(line.indexOf('rotate column') > -1) {
		var columnShiftData = line.replace('rotate column x=', '').split(' by ');
		screen.shiftColumn(parseInt(columnShiftData[0]), parseInt(columnShiftData[1]));
	} else {
		var rowRotateData = line.replace('rotate row y=', '').split(' by ');
		screen.shiftRow(parseInt(rowRotateData[0]), parseInt(rowRotateData[1]));
	}
	console.log(screen.getActivePixelsCount());
	screen.print();
});