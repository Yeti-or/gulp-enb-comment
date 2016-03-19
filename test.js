var expect = require('chai').expect;
var gulpUtil = require('gulp-util');
var enbComment = require('.');

var content = 'ENB is not BEM';

it('should wrap content with comment', function(done) {
	var stream = enbComment();

	stream.on('data', function(file) {
		expect(file.contents.toString()).not.to.equal(content);
	});
	stream.on('end', done);

	stream.write(new gulpUtil.File({
		path: '/file.js',
		contents: new Buffer(content)
	}));

	stream.end();
});

it('should add relative path to comment', function(done) {
	var bundlePath = 'bundle/assets';
	var stream = enbComment(bundlePath);

	stream.on('data', function(file) {
		var strings = file.contents.toString().split('\n');
		expect(strings[0]).to.include('../file.js');
	});
	stream.on('end', done);

	stream.write(new gulpUtil.File({
		path: 'bundle/file.js',
		contents: new Buffer(content)
	}));

	stream.end();
});

it('should have js-comments', function(done) {
	var bundlePath = 'bundle/assets';
	var stream = enbComment.js(bundlePath);

	stream.on('data', function(file) {
		var content = file.contents.toString();
		expect(content).to.eql('/* begin: ../file.js */\nENB is not BEM\n/* end: ../file.js */');
	});
	stream.on('end', done);

	stream.write(new gulpUtil.File({
		path: 'bundle/file.js',
		contents: new Buffer(content)
	}));

	stream.end();
});

it('should have css-comments', function(done) {
	var bundlePath = 'bundle/assets';
	var stream = enbComment.css(bundlePath);

	stream.on('data', function(file) {
		var content = file.contents.toString();
		expect(content).to.eql('/* ../file.js:begin */\nENB is not BEM/* ../file.js:end */');
	});
	stream.on('end', done);

	stream.write(new gulpUtil.File({
		path: 'bundle/file.js',
		contents: new Buffer(content)
	}));

	stream.end();
});
