const { src, dest, watch, parallel, series } = require("gulp");
const autoPrefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const scss = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const del = require("del");
const realFavicon = require("gulp-real-favicon");
const fs = require("fs");
const FAVICON_DATA_FILE = "faviconData.json";
const svgSprite = require("gulp-svg-sprite");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const fileInclude = require("gulp-file-include");

function styles() {
  return src("app/sass/*.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(autoPrefixer({ overrideBrowserslist: ["last 10 versions"], grid: true }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function images() {
  return src(["app/images/**/*.*"])
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}

function buildRepo() {
  return src(["app/**/*html", "app/css/style.min.css", "app/js/main.min.js"], {
    base: "app",
  }).pipe(dest("dist"));
}

function watching() {
  watch(["app/sass/*.scss"], styles);
  watch(["app/js/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
  watch(["app/images/icons/*.svg"], svgSprites);
  watch(["app/html/**/*.html"], htmlInclude);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/mixitup/dist/mixitup.min.js",
    "node_modules/swiper/swiper-bundle.js",
    "node_modules/ion-rangeSlider/js/ion.rangeSlider.js",
    "node_modules/jquery-form-styler/dist/jquery.formstyler.js",
    "node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js",
    "node_modules/rateyo/min/jquery.rateyo.min.js",
    "app/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function cleanDist() {
  return del("dist");
}

function genFavicon(done) {
  realFavicon.generateFavicon(
    {
      masterPicture: "app/images/Favicon.svg",
      dest: "app/images/favicon",
      iconsPath: "/",
      design: {
        ios: {
          pictureAspect: "noChange",
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {
          design: "raw",
        },
        windows: {
          pictureAspect: "noChange",
          backgroundColor: "#da532c",
          onConflict: "override",
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: "noChange",
          themeColor: "#ffffff",
          manifest: {
            display: "standalone",
            orientation: "notSet",
            onConflict: "override",
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: "blackAndWhite",
          threshold: 78.125,
          themeColor: "#5bbad5",
        },
      },
      settings: {
        compression: 3,
        scalingAlgorithm: "Mitchell",
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done();
    }
  );
}

function injectFaviconMarkups() {
  return src(["app/*.html"])
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
      )
    )
    .pipe(dest("app"));
}

function checkForFaviconUpdate(done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err;
    }
  });
}

function normalize() {
  return src("node_modules/normalize.css/normalize.css")
    .pipe(dest("app/sass"))
    .pipe(browserSync.reload({ stream: true }));
}

function svgSprites() {
  return src("app/images/icons/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("app/images"));
}

function svgRemoveAttr() {
  return src("app/images/icons/*.svg")
    .pipe(
      cheerio({
        run: ($) => {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("app/images"));
}

const htmlInclude = () => {
  return src(["app/html/*.html"])
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(dest("app"))
    .pipe(browserSync.stream());
};

exports.htmlInclude = htmlInclude;
exports.svgRemoveAttr = svgRemoveAttr;
exports.genFavicon = genFavicon;
exports.injectFaviconMarkups = injectFaviconMarkups;
exports.checkForFaviconUpdate = checkForFaviconUpdate;
exports.normalize = normalize;
exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.svgSprites = svgSprites;
exports.buildRepo = series(cleanDist, images, buildRepo);
exports.default = parallel(
  htmlInclude,
  svgSprites,
  styles,
  scripts,
  browsersync,
  watching
);
