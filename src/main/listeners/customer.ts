import { ipcMain } from 'electron';
import Customer from '../database/models/Customer';

const setUpCustomerListeners = () => {
  ipcMain.handle('customers:read', (e) => {
    return Customer.findAll();
  });
};

export default setUpCustomerListeners;
