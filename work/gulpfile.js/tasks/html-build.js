var config	=	require('../config.json'),
		gulp	=	require('gulp'),
		include	=	require('gulp-file-include'),
		inject	=	require('gulp-inject'),
		merge = require('merge-stream'),
		series	=	require('stream-series'),
		htmlmin	=	require('gulp-htmlmin');

var htmlBuildTask	=	function(){

	var merged	=	merge();

	var general = gulp.src(config.path.critical.general.src);

	var mainCSS	=	gulp.src(config.path.css.build+"/main.min.css");

	var mainJS	=	gulp.src(config.path.js.build+"/main.min.js", {read: false});

	config.page_names.forEach(function(page_name){		
		var current	=	gulp.src(config.path.critical[page_name]["src"]);
		merged.add(
			gulp
				.src(config.path.html.build + "/" + page_name + ".html")
				.pipe(inject(series(general, current),{
					name: page_name,
					removeTags: true,
					transform: function(filePath, file){
						return "<style>"+"\n"+file.contents.toString('utf8')+ "\n"+ "</style>"
					}
				}))
				.pipe(inject(series(mainCSS),{
					name: "main_prod",
					removeTags: true,
					relative: true,
					transform: function(filepath){
						return	'<script>'+'\n'+
  					'var css_link=document.createElement("link");'+'\n'+
  					'css_link.rel="stylesheet";'+'\n'+
  					'css_link.href="'+filepath+'";'+'\n'+
  					'document.getElementsByTagName("head")[0].appendChild(css_link);'+'\n'+
  					'</script>'
					}
				}))
				.pipe(inject(series(mainJS),{
					name: "main",
					removeTags: true,
					relative: true
				}))
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest(config.path.html.build))
			);
	});

	return merged;
};

gulp.task('html-build', htmlBuildTask);
module.exports	=	htmlBuildTask;
