const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const validEnvironments = ['development', 'production', 'test'];
const environment = validEnvironments.includes(process.env.NODE_ENV)
  ? process.env.NODE_ENV
  : 'development';
const envFile = `.env.${environment}`;

const envPath = path.join(__dirname, '..', '..', envFile);
if (!fs.existsSync(envPath)) {
  throw new Error(`File env: ${envFile} tidak ditemukan`);
}

const { parsed } = dotenv.config({ path: envPath });

module.exports = {
  ...parsed,
  CORS_ALLOWED_ORIGIN: parsed.CORS_ALLOWED_ORIGINS ? parsed.CORS_ALLOWED_ORIGINS.split(',') : [],
};
