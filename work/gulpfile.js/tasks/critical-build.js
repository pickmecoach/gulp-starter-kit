// Таск для сборки критического CSS для продашена.
// Отдельно собирает общий критический CSS (гриды, фреймворки, нормалайзы), удаляет из них
// неиспользуемые ни на одной странице проекта стили, ставит префиксы, минимизирует.
// Дальше идет по стилям для отдельных страниц (стили до сгиба), ставит префиксы, минимизирует.
// Выводит соответствующие файлы CSS в те же папки, где были и SCSS-файлы для временного хранения.

var config	=	require('../config.json'),
	gulp	=	require('gulp'),
	sass	=	require('gulp-sass'),
	plumber	=	require('gulp-plumber'),
	prefix =	require('gulp-autoprefixer'),
	rename	=	require('gulp-rename'),
	uncss	=	require('gulp-uncss'),
	merge = require('merge-stream'),
	uncss	=	require('gulp-uncss'),
	csso	=	require('gulp-csso');

var criticalBuildTask	=	function(cb){
	var html	=	gulp
	.src(config.path.html.src)
	.pipe(gulp.dest(config.path.html.build));

	var general	=	gulp
	.src(config.path.critical.general.raw)
	.pipe(sass())
	.pipe(prefix(config.prefixer))
	.pipe(uncss(config.uncss))
	.pipe(csso())
	.pipe(gulp.dest(config.path.critical.general.build));

	var merged	=	merge(html, general);

	config.page_names.forEach(function(page_name){
		merged.add(
			gulp
			.src(config.path.critical[page_name]["raw"])
			.pipe(sass())
			.pipe(prefix(config.prefixer))
			.pipe(csso())
			.pipe(gulp.dest(config.path.critical[page_name]["build"]))
			);
	});

	return merged;
};

gulp.task('critical-build', criticalBuildTask);
module.exports	=	criticalBuildTask;