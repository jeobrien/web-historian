var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../web/http-helpers');
var htmlFetch = require('../workers/htmlfetcher');

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

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, "utf-8", function(err, data) {
    var list = data.split('\n');
    callback(list);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(list) {
    if (list.indexOf(url) === -1) {
      exports.addUrlToList(url, callback);
    } else {
      exports.isUrlArchived(url, callback);
    }
  }); 
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + "\n", function() {
    callback(302)
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readFile(exports.paths.archivedSites + url, function(err, data){
    if (err) {
      callback(404);
    } else {
      callback(200, data);
    }
  });
};

exports.downloadUrls = function(urlArray) {
  _.each(urlArray, function(website) {
    fs.stat(exports.paths.archivedSites + website, function(err, stats) {
      if (err) {
        //go get it in html fetcher
        htmlFetch.fetch(website);
      }
    })
  })
};
