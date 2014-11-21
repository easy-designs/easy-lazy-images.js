var gulp = require('gulp'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    handleErrors = require('../utils/handleErrors'),
    source_folder = 'src',
    destination_folder = 'min';

gulp.task('scripts', function(){
    return gulp.src(source_folder + '/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({
            preserveComments: 'some'
         }))
        .pipe(gulp.dest(destination_folder))
        .pipe(notify({ message: 'Scripts task complete' }))
        .on('error', handleErrors);
});