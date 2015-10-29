var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');

var actions = {
  "GET" : helpers.serveAssets,
}

exports.handleRequest = function (req, res) {
  var action = actions[req.method];

  if (req.url === '/') {
    if (action) {
      action(res, archive.paths.siteAssets + "/index.html");
    }
  } else if (req.method === "GET") {
    if (req.url === '/triggerDownload') {
      archive.getUrls();
      res.end()
    } else {
      archive.isUrlArchived(req.url, function (statusCode, data) {
          res.writeHead(statusCode);
          if (data) {
            res.end(data);
          } else {
            res.end();          
          }
      });
    }

  }
  if (req.method === "POST") {
    console.log("POSTING")
    helpers.collectData(req, res, archive.isUrlInList);
  }

}