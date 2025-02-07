require('./config/env');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const hpp = require('hpp');
const compression = require('compression');
const routeNotFoundHandler = require('./middleware/routeNotFoundHandler');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const routes = require('./routes');
const corsOptions = require('./config/cors');

const app = express();

app.use(compression());
app.use(cors(corsOptions));
app.use(helmet());
app.use(hpp());
app.use(morgan('dev'));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/api', require('./config/rateLimiter'));
}

app.use('/api', routes);
app.all('*', routeNotFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
