const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerSpecV1 = require('../../docs/swaggerV1');

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpecV1));

module.exports = router;
