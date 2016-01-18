// Таск для глобальной очистки содержимого build-каталога.
// Удаляет все файлы в build и вложенных папках, не удаляя саму структуру
var gulp	=	require('gulp'),
		rimraf	=	require('rimraf');

var cleanTask	=	function(cb){
	rimraf('../build/**/**.*',cb);
};

gulp.task('clean', cleanTask);

module.exports	=	cleanTask;