// Таск для запуска локального сервера Browser-sync.
// Настройки в файле config.json -> "server"
var config = require('../config.json'),
		gulp	=	require('gulp'),
		bsync	=	require('browser-sync');

var serverTask	=	function(){
	bsync(config.server);
};

gulp.task('server', serverTask);
module.exports	=	serverTask; 