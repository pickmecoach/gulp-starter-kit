// Таск, запускающий watcher.
// Следим за обновлениями, применяем, релоадим.
// Все пути в файле config.json.

var gulp	=	require('gulp'),
		config	=	require('../config.json');

var watchTask	=	function(){
	gulp.watch([config.path.css.watch], ['css-dev']);
	gulp.watch([config.path.js.watch], ['js-dev']);
	gulp.watch([config.path.html.watch], ['html-dev']);
	gulp.watch([config.path.img.src], ['img']);
	gulp.watch([config.path.fonts.src], ['fonts']);
}

gulp.task('watch', watchTask);
module.exports	=	watchTask;