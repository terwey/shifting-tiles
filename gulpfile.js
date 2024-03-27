var gulp = require("gulp"),
    gutil = require("gulp-util"),
    sass = require("gulp-dart-sass"),
    browserify = require("gulp-browserify"),
    livereload = require("gulp-livereload"),
    uglify = require("gulp-uglify"),
    cleanCSS = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    Config = require("./config.json"),
    config = Config.development,
    log_error = function(error) {
      gutil.log(gutil.colors.red(error.toString()));
      return this.emit("end");
    };

gulp.task("styles", function() {
  return gulp
    .src("styles/[^_]*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.directory))
    .pipe(livereload());
});

gulp.task("scripts", function() {
  return gulp
    .src("scripts/*.js")
    .pipe(
      browserify(config.browserify).on("error", log_error)
    )
    .pipe(gulp.dest(config.directory))
    .pipe(livereload());
});

gulp.task("minify-css", function() {
  return gulp
    .src(config.directory + "/*.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.directory));
});

gulp.task("minify-js", function() {
  return gulp
    .src(config.directory + "/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.directory));
});

gulp.task("development", function(done) {
  config = Config.development;
  done();
});

gulp.task("production", function(done) {
  config = Config.production;
  done();
});

gulp.task("watch", function() {
  livereload.listen();
  gulp.watch(["scripts/**/*"], gulp.series("scripts"));
  gulp.watch("styles/**/*", gulp.series("styles"));
});

gulp.task("build", gulp.series([
  "styles",
  "scripts"
]));

gulp.task("build-prod", gulp.series([
  "production", 
  "build"
]));

gulp.task("build-min", gulp.series([
  "build-prod",
  gulp.parallel(["minify-css", "minify-js"])
]));

gulp.task("build-dev", gulp.series("build", "watch"));
gulp.task("default", gulp.series("build-dev"));
