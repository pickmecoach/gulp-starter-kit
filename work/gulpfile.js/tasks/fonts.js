var config	=	require('../config.json'),
		gulp	=	require('gulp'),
		bsync	=	require('browser-sync');

var fontsTask	=	function(){
	return gulp
				.src(config.path.fonts.src)
				.pipe(gulp.dest(config.path.fonts.build))
				.pipe(bsync.reload({stream: true}));
};

gulp.task('fonts', fontsTask);
module.exports	=	fontsTask;
