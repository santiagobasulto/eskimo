
// # caching

var path = require('path');
var helmet = require('helmet');

exports = module.exports = function(IoC, settings) {

  var app = this;

  // Disable cache if settings say so
  if (!settings.cache) {
    app.use(helmet.nocache());
  } else {
    // Enable cache if NOT an XHR (AJAX) request
    app.use(function(req, res, next) {
      if (req.xhr) return next();
      res.setHeader('Expires', new Date(Date.now() + (settings.staticServer.maxAge * 1000)).toUTCString());
      res.setHeader('Cache-Control', "public, max-age=" + settings.staticServer.maxAge);
      next();
    });
  }
};

exports['@require'] = [ '$container', 'igloo/settings' ];
