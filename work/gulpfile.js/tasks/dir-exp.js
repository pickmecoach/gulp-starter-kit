var config	=	require('../config.json'),
		gulp	=	require('gulp'),
		path = require('path'),
		folders = require('gulp-folders'),
		jeditor = require('gulp-json-editor'),
		mkdirs	=	require('directory-structure');

		var pages = [];

gulp.task('dir-exp', folders("src/sass/critical/pages", function(folder){
	
	pages.push(folder);
	return gulp
				.src('gulpfile.js/config.json')
				.pipe(jeditor(function(json){
					json.page_names = pages;
					return json;
				},{
  			  'indent_size': 0
  			}))
				.pipe(gulp.dest('gulpfile.js'));
	
	
}));