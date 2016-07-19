const express = require('express');
const path = require('path');
const logger = require('morgan');
const api = require('./api');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

//app.disable('etag');


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
