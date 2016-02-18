var path = require('path');

module.exports = function() {
	global.globalRequire = function(pathName) {
		return require(path.join(__dirname, pathName));
	};
}();