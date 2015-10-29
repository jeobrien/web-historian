var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');

var actions = {
  "GET" : helpers.serveAssets,
}
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var action = actions[req.method];

  if (req.url === '/') {
    if (action) {
      action(res, archive.paths.siteAssets + "/index.html");
    }
  }
  else if (req.method === "GET") {
    archive.isUrlArchived(res, req.url);
  }
  if (req.method === "POST") {
    helpers.collectData(req, res, archive.isUrlInList);
  }

}