const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const price = require('./modules/price');
// Get routes
const indexRouter = require('./routes/index');
const infoRouter = require('./routes/info');
const priceRouter = require('./routes/price');
// Create express application
const app = express();

// Set application
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Set routes
app.use('/', indexRouter);
app.use('/info', infoRouter);
app.use('/price', priceRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') == 'development' ? err : {};
  // Render the error page
  res.status(err.status || 500).send(err);
});

// Initialization
(async () => {
  const result = await price.configure();
  if (result.code !== 0) {
    console.error(`[ERROR] ${result.message}`);
    process.exit(result.code);
  } else {
    console.info(`[NOTICE] ${result.message}`);
  }
})();

module.exports = app;