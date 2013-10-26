var crypto = require("crypto"),
    querystring = require("querystring");

exports.index = function(req, res){
  res.render("index", { title: "On the Cent" });
};

exports.createTrail =  function(req, res){

  if (!req.query.trail) {
    crypto.randomBytes(32, function(ex, buf) {
      if(ex) throw ex;
      crypto.randomBytes(32, function(ex2, buf2) {
        if(ex2) throw ex2;

        var trail = buf.toString("base64");
        var admin = buf2.toString("base64");

        //go(trail, admin);
        res.redirect("/create-trail?" + getAdminQuery(trail, admin));
      });
    });
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
      pennies: [{year: 1987}],
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