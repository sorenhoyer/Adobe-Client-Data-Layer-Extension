const { series, src, dest, watch } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
let prod = false;

function appIcons() {
  return src(['./node_modules/@adobe/spectrum-css/dist/components/icon/spectrum-css-icons.svg',
    './node_modules/@adobe/spectrum-css/dist/icons/spectrum-icons.svg'])
    .pipe(dest('./dist/view/resources/icons'));
}

function appScripts() {
  return src(['./node_modules/@adobe/spectrum-css/dist/icons/loadIcons.js',
    './src/view/resources/js/app.js'])
    .pipe(prod ? babel({presets: ['@babel/env']}) : gutil.noop())
    .pipe(concat('app.js'))
    .pipe(dest('./dist/view/resources/js'));
}

function appStyles() {
  return src(['./node_modules/@adobe/spectrum-css/dist/standalone/spectrum-light.css',
    './src/view/resources/css/app.css'])
    .pipe(prod ? cleanCSS({compatibility: 'ie8'}) : gutil.noop())
    .pipe(concat('app.css'))
    .pipe(dest('./dist/view/resources/css'));
}

function clean() {
  return del(['reports/','dist/']);
}

function lib() {
  return src('src/lib/**/*', { base: 'src' })
    .pipe(prod ? babel({presets: ['@babel/env']}) : gutil.noop())
    .pipe(dest('./dist'));
}

function sandbox() {
  return src(['./node_modules/@adobe/adobe-client-data-layer/dist/adobe-client-data-layer.min.js'])
    .pipe(dest('.sandbox'));
}

function setProd(cb) {
  prod = true;
  cb();
}

exports.clean = clean;
exports.build = series(lib, sandbox, appIcons, appScripts, appStyles);
exports.prod = series(setProd, exports.build);
exports.watch = function() {
  watch(['./src/lib/**/*.js','./src/client/*.js',
    './src/view/resources/**/*.*'], { events: 'all' }, function(cb) {
    exports.build();
    cb();
  });
};
exports.default = series(clean, exports.build);
