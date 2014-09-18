var browserify = require( 'browserify' );
var gulp = require( 'gulp' );
var source = require( 'vinyl-source-stream' );
var reactify = require( 'reactify' );
var jshint = require( 'gulp-jshint' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var mocha = require( 'gulp-mocha' );
var mochaPhantomJS = require( 'gulp-mocha-phantomjs' );

gulp.task( 'browserify', function() {
    var b = browserify();
    b.transform( reactify ); // use the reactify transform
    b.add( './src/index.js' );
    b.bundle()
        .pipe( source( 'scReactPresenter.js' ) )
        .pipe( gulp.dest( './dist/' ) );

    var componentFile = browserify();
    componentFile.transform( reactify ); // use the reactify transform
    componentFile.add( './testClient/component/text.jsx' );
    componentFile.bundle()
        .pipe( source( 'text.js' ) )
        .pipe( gulp.dest( './testClient/component/' ) );
} );

gulp.task('build', [ 'browserify', 'lint', 'test', 'clientTest' ], function() {
  return gulp.src( './dist/scReactPresenter.js' )
    .pipe( uglify() )
    .pipe( rename( 'scReactPresenter.min.js' ) )
    .pipe( gulp.dest('./dist') );
});

gulp.task('test', function () {
    return gulp.src( ['./test/**/*.js'] )
            .pipe( mocha() );
});

gulp.task('clientTest', function () {
  return gulp
  .src('testClient/basic-01/runner.html')
  .pipe(mochaPhantomJS());
});

gulp.task('lint', function() {
  return gulp.src( ['./src/**/*.js', './test/*.js'] )
    .pipe( jshint( {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        quotmark: "single",
        noarg: true,
        forin: true,
        newcap: true,
        sub: true,
        undef: false,
        boss: true,
        strict: false,
        unused: false,
        eqnull: true,
        node: true,
        browser: true,
        expr: "warn"
      } ) )
    .pipe( jshint.reporter( 'default' ) );
});

gulp.task( 'default' , [ 'build' ] );