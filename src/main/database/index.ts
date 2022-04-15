import { Sequelize } from 'sequelize';
import { initCustomer } from './models/Customer';

export const connectDatabase = async () => {
  const database = new Sequelize('rumah-sehat-pos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

  try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  initCustomer(database);

  return database;
};

export default connectDatabase;
