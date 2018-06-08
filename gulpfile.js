const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");
const tslint = require("gulp-tslint");
const mocha = require("gulp-mocha");
const filter = require("gulp-filter");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("build", ["clean", "lint"], () => {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(filter(["**", "!test/**/*.spec.d.ts"]))
    .pipe(gulp.dest("dist"));
});

gulp.task("clean", () => {
  return del(['dist/**/*']);
});

gulp.task("lint", () => {
  return tsProject.src()
    .pipe(tslint({
      configuration: "tslint.json",
    }))
    .pipe(tslint.report());
});

gulp.task("test", ["build"], () => {
  return gulp.src("dist/test/**/*.spec.js")
    .pipe(mocha());
});
