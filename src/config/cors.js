const env = require('./env');

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || env.CORS_ALLOWED_ORIGIN.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Akses diblokir oleh CORS policy'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

module.exports = corsOptions;
