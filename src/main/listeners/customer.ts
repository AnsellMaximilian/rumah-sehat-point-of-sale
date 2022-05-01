import { ipcMain } from 'electron';
import Customer from '../database/models/Customer';
import CustomerInterface, {
  CustomerCreateData,
} from '../../shared/types/Customer';

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

  ipcMain.handle('customers:delete', async (event, id: number) => {
    try {
      Customer.destroy({
        where: {
          id,
        },
      });
      event.sender.send('notify', `Customer of ID ${id} deleted.`, 'success');
      return true;
    } catch (error) {
      return false;
    }
  });

  ipcMain.handle(
    'customers:create',
    async (event, customerData: CustomerCreateData) => {
      try {
        const newCustomer = Customer.build(customerData);
        event.sender.send(
          'notify',
          `Customer "${customerData.name}" successfully created`,
          'success'
        );
        newCustomer.save();
        return true;
      } catch (error) {
        return false;
      }
    }
  );

  ipcMain.handle(
    'customers:edit',
    async (event, id: number, customerData: CustomerCreateData) => {
      try {
        Customer.update(customerData, {
          where: {
            id,
          },
        });
        event.sender.send(
          'notify',
          `Customer of ID "${customerData.name}" updated`,
          'success'
        );
        return true;
      } catch (error) {
        return false;
      }
    }
  );
};

export default setUpCustomerListeners;
