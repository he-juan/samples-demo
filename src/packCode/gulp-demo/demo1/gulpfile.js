/**************************************   方案一  ***************************************/

const gulp = require('gulp');
const babel = require('gulp-babel');    // 语法转换
const uglify = require('gulp-uglify');  // 压缩文件
const rename = require('gulp-rename');
const concat = require('gulp-concat');   // 合并文件

gulp.task('combine',function(){
    return gulp.src('js/*.js')
        .pipe(babel())
        .pipe(concat('gsRTC.min.js'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('copy',function(){
    return gulp.src('js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist/api'))
})

gulp.task('default',gulp.series('combine', 'copy'), function() {
    console.log("default");
})


/*****************************************   方案二  ***********************************************/

// const { src, dest } = require('gulp');
// const babel = require('gulp-babel');    // 语法转换
// const uglify = require('gulp-uglify');  // 压缩文件
// const rename = require('gulp-rename');
// const concat = require('gulp-concat');   // 合并文件
// // const foreach = require('gulp-foreach');  // 文件循环
//
// exports.default = function() {
//     return src('js/*.js')
//         .pipe(babel())
//         .pipe(dest('output/api/'))
//         .pipe(concat('gsRTC.min.js'))
//         .pipe(dest('output/'))
// }
//
// exports.default = function() {
//     return src('js/*.js')
//         .pipe(babel())
//         .pipe(dest('output/api'))
//         .pipe(uglify())
//         .pipe(rename({ extname: '.min.js' }))
//         .pipe(dest('output/'));
// }


