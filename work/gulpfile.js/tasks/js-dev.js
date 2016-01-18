// Таск для сборки JS в ходе разработки.
// Обрабатывает только файл main.js, в котором должны быть подключены
// все вспомогательные скрипты посредством директивы плагина File-include.
// Таким образом получаем простую реализацию зависимостей скриптов друг от друга.
// На выходе получаем собранный из вспомогательных файл main.js, несжатый.
// Выводится в build.

var config	=	require('../config.json'),
		gulp	=	require('gulp'),
		plumber	=	require('gulp-plumber'),
		include	=	require('gulp-file-include'),
		bsync	=	require('browser-sync');

var jsDevTask	=	function(){
	return gulp
				.src(config.path.js.src)
				.pipe(plumber({
					errorHandler: function(e) {
						console.log(e.message);
						this.emit('end');
					}}))
				.pipe(include(config.fileInclude))
				.pipe(gulp.dest(config.path.js.build))
				.pipe(bsync.reload({stream: true}));
};

gulp.task('js-dev', jsDevTask);
module.exports	=	jsDevTask;
