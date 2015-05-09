var express = require('express');
var app = express();

app.use(express.static('static'));
app.use(express.static('bower_components/'));

app.listen(8080, function() {
  console.log('Running');
});
