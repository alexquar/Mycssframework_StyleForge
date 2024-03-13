const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

/* A minified version is created + clean comments */
function buildStyles() {
  return src("StyleForge/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(purgecss({ content: ['*.html'] }))
    .pipe(dest("css"))
    .pipe(cleanCSS({
        level: {
            1: {
                specialComments: 0
            }
        }
    }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("css"));
}

function watchTask() {
  watch(["StyleForge/**/*.scss", "*.html"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
