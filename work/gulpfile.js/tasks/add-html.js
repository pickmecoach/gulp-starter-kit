var config =	require('../config.json'),
gulp 	=require('gulp'),
fs =	require('fs'),
jeditor = require('gulp-json-editor');



var addFiles =	function(){
	var existingPages = [];
	var currentPages = [];

fs.readdir('src/sass/critical/pages', (err, files) =>{
	files.forEach(function(file){
		if(file.indexOf('.') === -1){
			existingPages.push(file);
		}
	});
});

	fs.readdir('src/html', (err, files) => {
		files.forEach(function(file){
			if(file.indexOf('.html')!= -1){
				currentPages.push(file.slice(0, file.indexOf('.')));
			}
		});
	});

		return gulp
		.src('gulpfile.js/config.json')
		.pipe(jeditor(function(json){
			json.page_names =	currentPages;
			currentPages.forEach(function(singlePage){
				json.path.critical[singlePage] = {
					raw: "src/sass/critical/pages/"+singlePage+"/"+singlePage+"_critical.scss",
					build: "src/sass/critical/pages/"+singlePage,
					src: "src/sass/critical/pages/"+singlePage+"/"+singlePage+"_critical.css"
				};
				if(existingPages.indexOf(singlePage) === -1){
					fs.mkdir("src/sass/critical/pages/"+singlePage);
					fs.writeFile("src/sass/critical/pages/"+singlePage+"/"+singlePage+"_critical.scss",
						"@import '../../../partials/base/_index.scss';",
						err => {
							if(err){
								console.log(err);
								return;
							}
						});
					console.log("Folder "+singlePage.toUpperCase()+" was created");
				}
			});
			return json;
		},{
			'indent_size': 0
		}))
		.pipe(gulp.dest('gulpfile.js'));
};

gulp.task('add-html', addFiles);
module.exports =	addFiles;
