// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var http = require('http');
var archive = require('../helpers/archive-helpers');
var path = require('path');
var httpRequest = require ('http-request');

exports.paths = {
  archivedSites: path.join(__dirname, '../archives/sites'),
};

exports.fetch = function(url) {

  var request = httpRequest.createHttpClient({
    url: 'http://' + url,
    method: "GET"
  })
  request.send(function() {
    request.saveFile(archive.paths.archivedSites + "/" + url, function() {
      console.log("saved");
    }) 
  });

}
