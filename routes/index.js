
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render("index", { title: "On the Cent" });
};

exports.createTrail =  function(req, res){
  res.render("create-trail", { title: "On the Cent" });
};