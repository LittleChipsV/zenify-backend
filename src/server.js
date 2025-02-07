const app = require('./app');
const { sequelize } = require('./models');

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.listen(SERVER_PORT, async () => {
  console.log(`Server berhasil dijalankan di PORT ${SERVER_PORT}`);

  try {
    await sequelize.authenticate();
    console.log('Berhasil terkoneksi ke database');

    if (process.env.NODE_ENV === 'development') {
      sequelize.sync();
      console.log('Berhasil menyinkronkan database');
    }
  } catch (error) {
    console.error('Gagal terkoneksi ke database:', error);
    process.exit(1);
  }
});
