const { src, dest } = require('gulp');
const babel = require('gulp-babel');    // 语法转换
const uglify = require('gulp-uglify');  // 压缩文件
const rename = require('gulp-rename');
const concat = require('gulp-concat');   // 合并文件
// const foreach = require('gulp-foreach');  // 文件循环

exports.default = function() {
    return src('js/*.js')
        .pipe(babel())
        .pipe(dest('output/api/'))
        .pipe(concat('gsRTC.min.js'))
        .pipe(dest('output/'))
}

exports.default = function() {
    return src('js/*.js')
        .pipe(babel())
        .pipe(dest('output/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest('output/'));
}

