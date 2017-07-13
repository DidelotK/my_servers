import gulp from 'gulp';
import jshint from 'gulp-jshint';
import eslint from 'gulp-eslint';
import run from 'run-sequence';
import rimraf from 'rimraf';
import server from 'gulp-live-server';
import babel from 'gulp-babel';
import stylish from 'jshint-stylish';

const paths = {
  src: './src',
  dest: './dist',
  bundle: 'bundle.js',
  bundleDest: './dist',
};

// Catch the server instance
let express;

gulp.task('default', (cb) => {
  run('server', 'build', 'watch', cb);
});

gulp.task('build', (cb) => {
  run('clean', 'lint', 'babel', 'restart', cb);
});

// build when a file has changed
gulp.task('watch', () => {
  gulp.watch([
    `${paths.src}/**.js`,
  ], ['build']);
});

/*
 Server
 */
gulp.task('server', () => {
  express = server.new(paths.dest);
});

gulp.task('restart', () => {
  express.start.bind(express)();
});

// Clean the app destination, to prepare for new files
gulp.task('clean', (cb) => {
  rimraf(paths.dest, cb);
});

// Lint the code
gulp.task('jshint', () => gulp.src('./lib/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish)));

gulp.task('lint', () => gulp.src(['**/*.js', '!node_modules/**'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish))
  .pipe(eslint())
  .pipe(eslint.format()));

// Transform back-end ES6 to ES5
// only transform features not supported by node v5
gulp.task('babel', () => gulp.src(`${paths.src}/**/*.js`)
  .pipe(babel({
    presets: ['es2015-node5', 'stage-0'],
  }))
  .pipe(gulp.dest(paths.dest)));
