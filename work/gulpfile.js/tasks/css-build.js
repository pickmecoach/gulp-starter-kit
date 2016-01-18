// Таск для сборки главного CSS-файла для продакшена.
// В него не включаются критические CSS-файлы.
// На выходе в Build будет два файла:
// Один main.css - не подключается к проекту. для ознакомления.
// Второй mian.min.css - сжатый, оптимизированный. подключается к проекту.
// Может генерировать мапы, если убрать комментарии.

var config	=	require('../config.json'),
		gulp	=	require('gulp'),
		sass	=	require('gulp-sass'),
		prefix	=	require('gulp-autoprefixer'),
		csso	=	require('gulp-csso'),
		rename	=	require('gulp-rename'),
		sourceMap	=	require('gulp-sourcemaps'),
		bsync	=	require('browser-sync');

var cssBuildTask	=	function(){
	return gulp
				.src(config.path.css.src)
				.pipe(sass())
				.pipe(prefix(config.prefixer))
				.pipe(gulp.dest(config.path.css.build))
				// .pipe(sourceMap.init())
				.pipe(csso())
				// .pipe(sourceMap.write())
				.pipe(rename("main.min.css"))
				.pipe(gulp.dest(config.path.css.build));
};

gulp.task('css-build',cssBuildTask);
module.exports	=	cssBuildTask;