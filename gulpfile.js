var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var bower = require("main-bower-files");
var concat = require("gulp-concat");
var filter = require("gulp-filter");
var rename = require("gulp-rename");

gulp.task("BowerJS",function(){
	jsFilter = filter(["./bower_components/**/*.js"]);
	gulp.src(bower())
	.pipe(jsFilter)
	.pipe(concat('lib.js'))
	.pipe(gulp.dest('vender/src'))
});

gulp.task ('BowerCSS',function(){
  cssFilter = filter(['**/*.css']);
  scssFilter = filter(['**/*.scss']);
  sassFilter = filter(['**/*.sass']);
  gulp.src(bower())
    .pipe(cssFilter)
    .pipe(rename({
      prefix: '_',
      extname: '.scss'}))
    .pipe(gulp.dest('stylesheets/library'))
    .pipe(cssFilter.restore())
    .pipe(scssFilter)
    .pipe(gulp.dest('stylesheets/library'))
    .pipe(cssFilter.restore())
    .pipe(sassFilter)
    .pipe(gulp.dest('stylesheets/library'))
    .pipe(cssFilter.restore());

});

gulp.task("server", function() {
	    browser({
       		 server: {
		 baseDir: "./"
		            }
	});
});

gulp.task("sass",function(){
	gulp.src("sass/**/*scss*")
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest("./css"))
	.pipe(browser.reload({stream:true}))
});

gulp.task("html",function(){
	gulp.src('./*.html')
	.pipe(plumber())
	.pipe(browser.reload({stream:true}))
	});

gulp.task("js",function(){
	gulp.src(["js/**/*.js","!js/min/**/*.js"])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest("./js/min"))
	.pipe(browser.reload({stream:true}))
});

//execute

gulp.task("default",['server'], function() {    
	gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
	gulp.watch(["./*.html"],["html"]);
	gulp.watch("sass/**/*.scss",["sass"]);
});
