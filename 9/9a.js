var lineReader = require('readline').createInterface({
	  input: require('fs').createReadStream('input.txt')
});

lineReader.on('close', function () {
	console.log("totalSigns = "+totalSigns);
});

var totalSigns = 0;

lineReader.on('line', function (line) {
		countSigns(line);
});

function countSigns(line) {
	for(var i=0; i< line.length;) {
		if(isMarker(line[i])) {
			var markerLength = getMarkerLength(line, i);
			var marker = line.substr(i, markerLength).replace('(', '').replace(')', '').split('x');
			marker[0] = parseInt(marker[0]);
			marker[1] = parseInt(marker[1]);
			totalSigns += marker[0]*marker[1];
			i += markerLength + marker[0];
		} else {
			++totalSigns;
			++i;
		}
	}
	console.log("line end, signs = "+totalSigns);
}

function isMarker(char) {
	return char == '(';
}

function shouldOmitMarker(line, actualLinePointer, markerLength) {
	return actualLinePointer + markerLength < line.length && isMarker(line[actualLinePointer + markerLength]);
}

function getMarkerLength(line, actualLinePointer) {
	return line.indexOf(')', actualLinePointer) - actualLinePointer +1;
}