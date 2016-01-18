// Таск для сборки HTML в ходе разработки.
// Подключает предварительно собранные в build, css и js файлы в <head> и перед </body>
// соответственно.
// Выводит в build все HTML-файлы
var config	=	require('../config.json'),
		inject	=	require('gulp-inject'),
		gulp	=	require('gulp'),
		plumber	=	require('gulp-plumber'),
		bsync	=	require('browser-sync');

var htmlDevTask	=	function(){
	return gulp
				.src(config.path.html.src)
				.pipe(plumber({
					errorHandler: function(e) {
						console.log(e.message);
						this.emit('end');
					}}))
				.pipe(inject(gulp.src(config.path.css.build+'/main.css', {read: false}), {
					name: "main-dev",
					ignorePath: "../build",
					addRootSlash: false
				}))
				.pipe(inject(gulp.src(config.path.js.build+'/main.js', {read: false}), {
					name: "main",
					ignorePath: "../build",
					addRootSlash: false
				}))
				.pipe(gulp.dest(config.path.html.build))
				.pipe(bsync.reload({stream: true}));
};

gulp.task('html-dev', htmlDevTask);
module.exports	=	htmlDevTask;
