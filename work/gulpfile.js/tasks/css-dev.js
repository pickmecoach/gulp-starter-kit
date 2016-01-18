// Таск для обработки sass-файлов при разработке.
// Собирает sass-файлы из папки critical(один общий, для сетки, normaliz'a и т.д., остальные в зависимости
// от того, сколько отдельных страниц будет у проекта, по умолчанию добавлена папка index для index.html)
// Далее критические файлы склеиваются с main.scss, и выводятся в build.
// На выходе получаем несжатый css, с добавлением префиксов.
// По оконачние всего - релоад браузера.

// При добавлении страницы в проект следует добавить ее название в config.json к свойству
// "page_names", а так же прописать пути в объекте path в том же файле.

var config	=	require('../config.json'),
		gulp	=	require('gulp'),
		sass	=	require('gulp-sass'),
		concat	=	require('gulp-concat'),
		plumber	=	require('gulp-plumber'),
		bsync	=	require('browser-sync'),
		streamQueue	=	require('streamqueue'),
		prefix=	require('gulp-autoprefixer');

var cssDevTask	=	function(){
	var stream 	=	streamQueue({objectMode: true});

	stream.queue(
		gulp.src(config.path.critical.general.raw)
			.pipe(plumber({
					errorHandler: function(e){
						console.log(e.message);
						this.emit('end');
				}}))
			.pipe(sass(config.sass))
			.pipe(prefix(config.prefixer))
		);

	config.page_names.forEach(function(page_name){
		return stream.queue(
		gulp.src(config.path.critical[page_name]["raw"])
			.pipe(plumber({
					errorHandler: function(e){
						console.log(e.message);
						this.emit('end');
				}}))
			.pipe(sass(config.sass))
			.pipe(prefix(config.prefixer))
		);
	});
	
	stream.queue(
		gulp.src(config.path.css.src)
			.pipe(plumber({
					errorHandler: function(e){
						console.log(e.message);
						this.emit('end');
				}}))
			.pipe(sass(config.sass))
			.pipe(prefix(config.prefixer))
		);
	
	return stream.done()
			.pipe(concat('main.css'))
			.pipe(gulp.dest(config.path.css.build))
			.pipe(bsync.reload({stream: true}));
};

gulp.task('css-dev', cssDevTask);
module.exports	=	cssDevTask;