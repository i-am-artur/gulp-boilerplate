// import webpack from 'webpack-stream';

import eslint from 'gulp-eslint';
import babel from 'gulp-babel';

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>'
      })
    ))

    .pipe(eslint({}))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())

    .pipe(babel({
      presets: ['@babel/env']
    }))

    // .pipe(app.gulp.dest(app.path.build.js))

    // use webpack
    // .pipe(webpack({
    //   mode: app.isBuild ? 'production' : 'development',
    //   optimization: {
    //     minimize: true,
    //   },
    //   output: {
    //     filename: 'app.min.js'
    //   }
    // }))

    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};