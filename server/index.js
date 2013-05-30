
var express = require('express');
var app = express();

console.log(__dirname);
app.configure(function(){ 
  app.use(express.methodOverride()); 
  app.use(express.bodyParser()); 
  app.use(express.logger()); 
  app.use(app.router);
  app.use(express.favicon(__dirname + '/../public/favicon.ico', { maxAge: 2592000000 }));
  app.use(express.static(__dirname + '/../public'));
}); 

app.get('/', function(req, res){
  res.sendfile('index.html', {root: __dirname + '/../public/'});
});

app.listen(8000);