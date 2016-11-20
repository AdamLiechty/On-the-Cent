var process = require('process')
var uuid = require("node-uuid"),
    querystring = require("querystring"),
    fs = require("fs"),
    path = require("path");

var app = null;

exports.init = function(expressApp) {
  app = expressApp;
  return exports;
};

exports.index = function(req, res){
  res.render("index", { title: "On the Cent" });
};

exports.trail = function(req, res){
  if (req.query.trail) {
    res.render("trail", {
      title: "On the Cent",
      manifest: process.env.NODE_ENV == "production" ? req.query.trail + ".manifest" : null,
      trail: req.query.trail
    });
  } else {
    res.redirect("/");
  }
};

exports.apiTrail = function(req, res){
  fs.readFile(path.join(__dirname, "../trails", req.params.id + ".json"), { encoding: "utf-8" }, function(err, data) {
    if (err) {
      res.send(400);
    } else {
      var trailData = JSON.parse(data);
      res.send(trailData);
    }
  });
};

exports.createTrail =  function(req, res){

  if (!req.query.trail) {
    var trail = uuid.v4();
    var admin = uuid.v4();
    res.redirect("/create-trail?" + getAdminQuery(trail, admin));
  } else {
    go(req.query.trail, req.query.admin);
  }

  function getAdminQuery(trail, admin) {
    return querystring.stringify({
      admin: admin,
      trail: trail
    });
  }

  function go(trail, admin) {
    var adminQuery = getAdminQuery(trail, admin);

    var trailQuery = querystring.stringify({
      trail: trail
    });

    res.render("create-trail", {
      title: "On the Cent",
      pennies: [{year: 1987, caption: "Corner Tree  "}],
      trail: trail,
      admin: admin,
      adminQuery: adminQuery,
      trailQuery: trailQuery
    });
  }
};

exports.postTrail = function(req, res) {
  // TODO: POST stuff.
  exports.createTrail(req, res);
};
