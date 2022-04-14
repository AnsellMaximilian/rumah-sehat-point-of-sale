const { Sequelize } = require('sequelize');

const connectDatabase = async () => {
  const sequelize = new Sequelize('rumah-sehat-pos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDatabase;
