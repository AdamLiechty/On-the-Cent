var uuid = require("node-uuid"),
    querystring = require("querystring");

exports.index = function(req, res){
  res.render("index", { title: "On the Cent" });
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