var config =	require('../config.json'),
gulp 	=require('gulp'),
fs =	require('fs'),
jeditor = require('gulp-json-editor');

var delFiles =	function(){
	var existingFolders = [];
	var remainingFiles = [];

fs.readdir('src/sass/critical/pages', (err, files) =>{
	files.forEach(function(file){
		if(file.indexOf('.') === -1){
			existingFolders.push(file);
		}
	});
});

fs.readdir('src/html', (err, files) =>{
	files.forEach(function(file){
		if(file.indexOf('.html') != -1){
			remainingFiles.push(file.slice(0, file.indexOf('.')));
		}
	});
});

	return gulp
		.src('gulpfile.js/config.json')
		.pipe(jeditor(function(json){
			json.page_names =	remainingFiles;
			for(var i = 0; i<existingFolders.length; i++){
				if(remainingFiles.indexOf(existingFolders[i]) === -1){
					delete json.path.critical[existingFolders[i]];
				}
			}
				return json;
		},{
			'indent_size': 0
		}))
		.pipe(gulp.dest('gulpfile.js'));

};

gulp.task('del-html', delFiles);
module.exports =	delFiles;