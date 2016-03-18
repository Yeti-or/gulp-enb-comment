var path = require('path');
var insert = require('gulp-insert');

var comment = function(bundlePath ) {
    return insert.transform(function(contents, file) {
        var filePath = bundlePath ? path.relative(bundlePath, file.path) : file.path,
            commentsBegin = '/* ' + filePath + ':begin */\n',
            commentsEnd = '\n/* ' + filePath + ':end */';
        return commentsBegin + contents + commentsEnd;
    });
};

module.exports = comment;
