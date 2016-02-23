var gulp = require('gulp');
var server = require('gulp-express');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

/*************************************************************************
FRONT-END JAVASCRIPT
*************************************************************************/

gulp.task('frontEndJavascript', function(){
	return gulp.src('src/js/*.js')
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('public/js'));
})

/*************************************************************************
SERVER
*************************************************************************/

gulp.task('server', function(){
	server.run(['server.js']);
	gulp.watch(['server.js'], server.notify);
	gulp.watch(['public/**/*.html'], server.notify);
	gulp.watch(['public/js/*.js'], server.notify);
	gulp.watch(['server.js', 'routes/**/*.js', 'config/**/*.js', 'middlewares/**/*.js'], [server.run]);
})

/*************************************************************************
WATCH
*************************************************************************/

gulp.task('watch', function(){
	gulp.watch(['src/js/*.js'], ['frontEndJavascript']);
})

gulp.task('default', ['server', 'frontEndJavascript', 'watch']);