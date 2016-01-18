var gulp	=	require('gulp'),
		config	=	require('../config.json'),
		runSequence	=	require('run-sequence');

gulp.task('build', function(){
	runSequence(
		'clean',		//Очищаем build от файлов разработки

		'critical-build',		//Собираем временные файлы критического CSS для каждой страницы проекта

		'js-build',		//Собираем JS

		'css-build',		//Собираем CSS

		'html-build',		//Импортируем стили и скрипты и минимизируем код
		
		['img', 'fonts']
		);
});