var gulp	=	require('gulp'),
		config	=	require('../config.json'),
		bsync	=	require('browser-sync').create('server');

gulp.task('tunnel', function(){
	bsync.init(config.tunnel);
});
