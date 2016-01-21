var config =	require('../config.json'),
gulp =	require('gulp'),
jeditor = require('gulp-json-editor'),
fs =	require('fs'),
watcher =	require('chokidar').watch;

var testWatch = function(){
	watcher(config.path.html.watch)
	.on('change', path => {
		gulp.start('html-dev');
		console.log(" File was changed: "+"\""+path+"\".");
	});

	watcher(['src/html','!src/html/partials'], {awaitWriteFinish: true, ignoreInitial: true})
	.on('add', path => {gulp.start('add-html')})
	.on('unlink', path => {gulp.start('del-html')});

	watcher(config.path.css.watch)
	.on('change', path => {
		gulp.start('css-dev');
		console.log(" File was changed: "+"\""+path+"\".");
	});

	watcher(config.path.js.watch, {ignoreInitial: true})
	.on('change', path =>{
		gulp.start('js-dev');
		console.log(" File was changed: "+"\""+path+"\".");
	});

	watcher(config.path.img.src, {ignoreInitial: true})
	.on('all', path =>{
		gulp.start('img');
		console.log(" File was changed: "+"\""+path+"\".");
	});

	watcher(config.path.fonts.src, {ignoreInitial: true})
	.on('all', path =>{
		gulp.start('fonts');
		console.log(" File was changed: "+"\""+path+"\".");
	});
};

gulp.task('watch', testWatch);
module.exports =	testWatch;
