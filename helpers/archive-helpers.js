var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../web/http-helpers');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, "utf-8", callback);
};

exports.isUrlInList = function(res, url) {
  exports.readListOfUrls(function(err, data) {
    // console.log(data, "data")
    var list = data.split('\n');
    // console.log(url, list);
    if (list.indexOf(url) === -1) {
      exports.addUrlToList(url);
      res.writeHead(302)
      res.end("Adding to List")
    } else {
      exports.isUrlArchived(res, url);
    }
  }) 
};

exports.addUrlToList = function(url) {
  fs.appendFile(exports.paths.list, url + "\n");
};

exports.isUrlArchived = function(res, url) {
  helpers.serveAssets(res, exports.paths.archivedSites + url, function(res){
    res.writeHead(404);
    res.end();
  });
};

exports.downloadUrls = function() {
};
