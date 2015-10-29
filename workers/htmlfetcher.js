// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var http = require('http');
var archive = require('../helpers/archive-helpers');
var path = require('path');

exports.paths = {
  archivedSites: path.join(__dirname, '../archives/sites'),
};

exports.fetch = function(url) {
  console.log(archive.paths.archivedSites + url)
  var file = fs.createWriteStream(archive.paths.archivedSites + "/" + url);
  var request = http.get('http://' + url, function(response, err) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
    })
  });
  request.end();
  // request.setTimeout(function() {
  //   request.abort();
  // }, 15000);

}