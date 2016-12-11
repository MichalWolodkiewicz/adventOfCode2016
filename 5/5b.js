var md5 = require("blueimp-md5");

var INPUT = 'wtnhxymk';
var INPUT_TEST = 'abc';

var index = 0;
var postFix = 0;
var password = [];
var passwordNumber;
var md5Temp;
var passwordLength = 0;

while(passwordLength < 8) {
	md5Temp = md5(INPUT + postFix);
	if(hasPasswordNumber(md5Temp)) {
		if(!password[parseInt(md5Temp[5])]) {
			password[parseInt(md5Temp[5])] = md5Temp[6];
		}
		console.log(password);
		setPasswordLength();
	}
	++postFix;
}

function setPasswordLength() {
	passwordLength = 0;
	for(var i=0; i<password.length; ++i) {
		if(password[i]) {
			++passwordLength;
		}
	}
}

function hasPasswordNumber(md5Hash) {
	if(md5Hash.match('^00000') === null) {
			return false;
	}
	var position = parseInt(md5Hash[5]);
	if( isNaN(position) || position > 7) {
		return false;
	}
	return true;	
}

console.log("password is " + password);