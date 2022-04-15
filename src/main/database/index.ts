import { dialog } from 'electron';
import { Sequelize } from 'sequelize';
import { initCustomer } from './models/Customer';

export const connectDatabase = async () => {
  const database = new Sequelize('rumah-sehat-pos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

  try {
    await database.authenticate();
    dialog.showMessageBox({
      message: 'Database connection successful.',
      type: 'info',
    });
  } catch (error) {
    dialog.showErrorBox(
      'Database connection failed.',
      'Something went wrong while trying to connect to the database.'
    );
  }

  initCustomer(database);

  return database;
};

export default connectDatabase;
