const swaggerJsdoc = require('swagger-jsdoc');

const optionsV1 = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zenify API Documentation V1',
      version: '1.0.0',
      description: 'Dokumentasi API v1 untuk aplikasi Zenify',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development Server (v1)',
      },
    ],
  },
  apis: ['./src/routes/v1/*.routes.js'],
};

const swaggerSpecV1 = swaggerJsdoc(optionsV1);

module.exports = swaggerSpecV1;
