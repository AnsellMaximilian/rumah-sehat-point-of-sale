import { useEffect, useState } from 'react';
import Customer, { CustomerCreateData } from 'shared/types/Customer';
import Modal from 'renderer/components/Modal';
import confirm from 'renderer/utils/confirm';
import Table from './Table';
import Form from './Form';

const CustomersView = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const allCustomers = await window.electron.customers.read();
      setCustomers(allCustomers);
    })();
  }, []);

  useEffect(() => {
    if (!isModalOpen) setCustomerToEdit(undefined);
  }, [isModalOpen]);

  const deleteCustomer = async (id: number) => {
    confirm('Are you sure?', async () => {
      await window.electron.customers.delete(id);
      setCustomers(await window.electron.customers.read());
    });
  };

  const createCustomer = async (customerData: CustomerCreateData) => {
    await window.electron.customers.create(customerData);
    setIsModalOpen(false);
    setCustomers(await window.electron.customers.read());
  };

  const editCustomer = (customer: Customer) => {
    setCustomerToEdit(customer);
    setIsModalOpen(true);
  };

  const updateCustomer = async (
    id: number,
    customerData: CustomerCreateData
  ) => {
    await window.electron.customers.update(id, customerData);
    setIsModalOpen(false);
    setCustomers(await window.electron.customers.read());
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Customers</h1>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create
        </button>
      </div>
      <Table
        customers={customers}
        deleteCustomer={deleteCustomer}
        editCustomer={editCustomer}
      />
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <Modal.Header
          label={
            customerToEdit
              ? `Edit Customer of ID ${customerToEdit.id}`
              : 'Create Customer'
          }
          closeModal={() => setIsModalOpen(false)}
        />
        <Form
          createCustomer={createCustomer}
          customerToEdit={customerToEdit}
          updateCustomer={updateCustomer}
        />
      </Modal>
    </div>
  );
};

export default CustomersView;
