
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var fs = require("fs");

var app = express();
routes.init(app);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get("/", routes.index);
app.get("/create-trail", routes.createTrail);
app.post("/create-trail", routes.postTrail);
app.get("/trail", routes.trail);
app.get("/api/trails/:id", routes.apiTrail);
app.get("/manifest-:id", routes.manifests)
//app.get("/users", user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("On-the-Cent server listening on port " + app.get('port'));
});
