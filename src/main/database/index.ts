import { dialog } from 'electron';
import { Sequelize } from 'sequelize';
import { initCustomer } from './models/Customer';
import { initDrSecretIDProduct } from './models/dr-secret/IDProduct';
import { initDrSecretSGProduct } from './models/dr-secret/SGProduct';

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
  initDrSecretSGProduct(database);
  initDrSecretIDProduct(database);

  return database;
};

export default connectDatabase;
