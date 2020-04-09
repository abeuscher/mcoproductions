var srcDir = "./src/";
var buildDir = "./public_html/dist/";

var jsSrcDir = srcDir + "js/";
var jsBuildDir = buildDir + "js/";

var sassSrcDir = srcDir + "scss/";
var sassBuildDir = buildDir;

var templateSrcDir = srcDir + "templates/";
var templateBuildDir = buildDir + "views/";


function siteSettings() {
  return {
    siteName: "mcoproductions.local",
    directories:[buildDir, jsBuildDir],
    jsFiles: [
      {
        name: "Main Bundle",
        srcDir: jsSrcDir,
        srcFileName: "app.js",
        buildDir: jsBuildDir,
        buildFileName: "bundle.js"
      },
    ],
    templates: [
      {
        name: "Main Template Group",
        srcDir: templateSrcDir,
        buildDir: templateBuildDir
      },
    ],
    stylesheets: [
      {
        name: "Main Stylesheet",
        srcDir: sassSrcDir,
        buildDir: sassBuildDir + "css/"
      },
    ]
  };
}
module.exports = siteSettings;
