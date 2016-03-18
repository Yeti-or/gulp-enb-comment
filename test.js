var assert = require('assert');
var gulpUtil = require('gulp-util');
var enbComment = require('.');

var content = 'ENB is not BEM';

it('should wrap content with comment', function(done) {
	var stream = enbComment();

	stream.on('data', function(file) {
		console.log(file.contents.toString());
		assert.notEqual(file.contents.toString(), content);
	});
	stream.on('end', done);

	stream.write(new gulpUtil.File({
		path: '/file.js',
		contents: new Buffer(content)
	}));

	stream.end();
});
