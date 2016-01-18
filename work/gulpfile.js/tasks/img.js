// Таск для сборки изображений. (и для разработки и для продакшена)
// Просто выводит в build все изображения из src, предварительно
// сжимая их.

var config	=	require('../config.json'),
		gulp	=	require('gulp'),
		imagemin	=	require('gulp-imagemin'),
		png 		=	require('imagemin-pngquant'),
		bsync	=	require('browser-sync');

var imgTask	=	function(){
	return gulp
				.src(config.path.img.src)
				.pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [png()],
            interlaced: true
        }))
				.pipe(gulp.dest(config.path.img.build))
				.pipe(bsync.reload({stream: true}));
};

gulp.task('img', imgTask);
module.exports	=	imgTask;
