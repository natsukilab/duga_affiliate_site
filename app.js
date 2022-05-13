var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const yaml = require('js-yaml');
const fs = require('fs');
const serverConfPath = path.join(process.cwd(), 'config', 'server.yml');
const serverData = yaml.load(fs.readFileSync(serverConfPath, 'utf-8'));
const appConfPath = path.join(process.cwd(), 'config', 'default.yml');
const conf = yaml.load(fs.readFileSync(appConfPath, 'utf-8'));
var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var labelRouter = require('./routes/label');
var castRouter = require('./routes/cast');
var searchRouter = require('./routes/search');
var watchRouter = require('./routes/watch');
var playerRouter = require('./routes/player');
var aboutRouter = require('./routes/about');

var app = express();
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/javascripts/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use("/javascripts/plyr", express.static(__dirname + "/node_modules/plyr/dist/"));
app.use("/stylesheets/plyr", express.static(__dirname + "/node_modules/plyr/dist/"));
app.use("/lightbox2", express.static(__dirname + "/node_modules/lightbox2/dist/"));

app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/label', labelRouter);
app.use('/cast', castRouter);
app.use('/search', searchRouter);
app.use('/watch', watchRouter);
app.use('/player', playerRouter);
app.use('/about', aboutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});

module.exports = app;