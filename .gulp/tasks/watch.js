var gulp = require('gulp');

gulp.task('watch', ['setWatch'], function() {
	gulp.watch('src/*', ['scripts']);
});