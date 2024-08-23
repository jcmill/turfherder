const { src, dest, watch, series } = require ('gulp');
const sass = require('gulp-sass')(require('sass'));
const browsersync = require("browser-sync").create();

//Options variables
const options = {
	styles: {
		src: "app/styles/**/*.scss",
		dest: "public/styles"
	},
  browserSync: {
		baseDir: "public"
	}
};

// Styles Task
function buildStyles() {
  return src(options.styles.src, {sourcemaps: true})
    .pipe(sass())
    .pipe(dest(options.styles.dest), {sourcemaps: '.'})
    .pipe(
			browsersync.reload({
				stream: true
			})
		);
};

//Browsersync Tasks
function browsersyncServer(cb) {
  browsersync.init({
    server: {
      baseDir: options.browserSync
    }
  });
  cb();
}

function browsersyncRelaod(cb) {
  browsersync.reload();
  cb();
}

// Watch task
function watchStyles() {
  watch('public/*.html', browsersyncRelaod);
  watch([options.styles.src], series(buildStyles, browsersyncRelaod));
};

//Default Gulp task
exports.default = series(buildStyles, browsersyncServer, watchStyles);