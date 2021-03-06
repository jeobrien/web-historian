var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  res.writeHead(headers);
  fs.readFile(asset, "utf-8",function(err, data) {
    if (err) {
      callback(res);
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
};

exports.collectData = function(req, res, callback) {
  var data = "";
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function() { 
    console.log(data, "DATA");
    var parts = data.split('=')
    console.log(parts);
    callback(parts[1], function(statusCode, data) {
        res.writeHead(statusCode);
        if (data) {
          res.end(data);
        } else {
          res.end();          
        }
      // })
    });
  });
  res.on('close', function() {
    console.log("closed");
  })
}
 
// As you progress, keep thinking about what helper functions you can put here!
