const { src, dest, watch, parallel, series } = require('gulp');

const scss = require("gulp-sass")(require("sass"));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const fs = require('fs');
const groupMedia = require("gulp-group-css-media-queries");
const glob = require("gulp-sass-glob");
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fileInclude = require("gulp-file-include");


function scripts(){
	return src("app/js/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(concat("script.min.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(dest("public/js"))
		.pipe(browserSync.stream());
}

function images(){
	return src(["app/img/**/*.*", "!app/img/**/*.svg"])
		// .pipe(newer("public/img"))
		// .pipe(avif({ quality: 50 }))

		.pipe(src("app/img/**/*.*"))
		.pipe(newer("public/img"))
		.pipe(webp())

		.pipe(src("app/img/**/*.*"))
		.pipe(newer("public/img"))
		.pipe(imagemin())

		.pipe(dest("public/img"));
}




function html(){
	return src([
		"app/html/**/*.html",
		"!app/html/modules/*.html",
	])
		.pipe(
			fileInclude({
				prefix: "@@",
				basepath: "@file",
			})
		)
		.pipe(dest("public"))
		.pipe(browserSync.stream());
}

function styles(){
	return src("app/scss/style.scss")
		.pipe(glob())
		.pipe(scss())
		.pipe(groupMedia())
		.pipe(sourcemaps.init())
		.pipe(concat("style.min.css"))
		.pipe(scss({ outputStyle: "compressed" }))
		.pipe(autoprefixer({ overrideBrowserslist: ["last 5 version"] }))
		.pipe(sourcemaps.write())
		.pipe(dest("public/css"))
		.pipe(browserSync.stream());
}

function watching(){
		browserSync.init({
			server: {
				baseDir: "public",
			},
		});
	watch(["app/scss/**/*.scss"], styles);
	watch(["app/img/**/*.*"], images);
	watch(["app/html/*.html", "app/html/modules/*.html"], html);
	watch(["app/js/**/*.js"], scripts);
	watch(["app/**/*.html"]).on("change", browserSync.reload);
	watch(["app/scss/**/*.scss"]).on("change", browserSync.reload);
}

function cleaner(done) {
	if(fs.existsSync('public/')){
		return src("public/", {read: false}).pipe(clean({force: true}));
	}
	done();
}

// function building() {
// 	return src(
// 		[
// 			"app/css/style.min.css",
// 			"app/js/script.min.js",
// 			"app/img/dist/**/*.*", 
// 			"app/html/index.html",
// 		],
// 		{
// 			base: "app",
// 		}
// 	).pipe(dest("public"));
// }

exports.cleaner = cleaner;
exports.styles = styles;
exports.html = html;
exports.images = images;
exports.scripts = scripts;
exports.watching = watching;

// exports.build = series(cleaner, building);
exports.default = series(
	cleaner,
	parallel(html, styles, images, scripts, watching)
);