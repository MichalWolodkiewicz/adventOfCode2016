var md5 = require("blueimp-md5");

var INPUT = 'wtnhxymk';
var INPUT_TEST = 'abc';

var index = 0;
var postFix = 0;
var password = "";
var passwordNumber;
var md5Temp;

while(password.length < 8) {
	md5Temp = md5(INPUT + postFix);
	if(hasPasswordNumber(md5Temp)) {
		password = password + md5Temp[5];
		console.log(password);
	}
	++postFix;
}

function hasPasswordNumber(md5Hash) {
	for(var i=0; i<5; ++i) {
		if(md5Hash[i] != '0') {
			return false;
		}
	}
	return true;	
}

console.log("password is " + password);