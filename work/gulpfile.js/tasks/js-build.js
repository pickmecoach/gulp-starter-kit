// Таск для сборки JS для продакшена.
// Как и в сборке для разработки, все зависимости подключаемых файлов
// прописываются в самом mian.js при помощи директивы плагина File-include.
// 
// На выходе получаем два файла в build.
// Один main.js - не подключается к проекту, для ознакомительных целей.
// Второй main.min.js - минифицированный файл, подключаемый к проекту.
// Может генерировать мапы, если убрать комментарии

var config	=	require('../config.json'),
	gulp	=	require('gulp'),
	include	=	require('gulp-file-include'),
	uglify	=	require('gulp-uglify'),
	sourceMap	=	require('gulp-sourcemaps'),
	rename	=	require('gulp-rename');

var jsBuildTask	=	function(){
	return gulp
		.src(config.path.js.src)
		.pipe(include(config.fileInclude))
		.pipe(gulp.dest(config.path.js.build))
		// .pipe(sourceMap.init())
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		// .pipe(sourceMap.write())
		.pipe(gulp.dest(config.path.js.build));
};

gulp.task('js-build', jsBuildTask);
module.exports	=	jsBuildTask;
