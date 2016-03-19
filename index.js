var path = require('path');
var insert = require('gulp-insert');

var cssComment = function(filePath, contents) {
	var commentsBegin = '/* ' + filePath + ':begin */\n',
		commentsEnd = '/* ' + filePath + ':end */';
	return commentsBegin + contents + commentsEnd;
};

var jsComment = function(filePath, contents) {
	var commentsBegin = '/* begin: ' + filePath + ' */\n',
		commentsEnd = '\n/* end: ' + filePath + ' */';
	return commentsBegin + contents + commentsEnd;
};

var comment = function(bundlePath, commentFn) {
    return insert.transform(function(contents, file) {
        var filePath = bundlePath ? path.relative(bundlePath, file.path) : file.path;
		return commentFn(filePath, contents);
    });
};

module.exports = function(bundlePath) { return comment(bundlePath, cssComment); };
module.exports.css = function(bundlePath) { return comment(bundlePath, cssComment); };
module.exports.js  = function(bundlePath) { return comment(bundlePath, jsComment); };
