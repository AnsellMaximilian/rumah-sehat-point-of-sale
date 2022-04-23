import { ipcMain } from 'electron';
import Customer from '../database/models/Customer';
import CustomerInterface from '../../shared/types/Customer';

const setUpCustomerListeners = () => {
  ipcMain.handle('customers:read', async () => {
    const customers: CustomerInterface[] = (await Customer.findAll()).map(
      (cus) => ({
        name: cus.name,
        address: cus.address,
        id: cus.id,
        phone: cus.phone,
        createdAt: cus.createdAt,
        updatedAt: cus.updatedAt,
      })
    );
    return customers;
  });
};

export default setUpCustomerListeners;
