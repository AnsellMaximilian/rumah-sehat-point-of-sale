import { useEffect, useState } from 'react';
import Customer, { CustomerCreateData } from 'shared/types/Customer';
import Swal from 'sweetalert2';
import Modal from 'renderer/components/Modal';
import Table from './Table';
import Form from './Form';

const CustomersView = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  useEffect(() => {
    (async () => {
      const allCustomers = await window.electron.customers.read();
      setCustomers(allCustomers);
    })();
  }, []);

  const deleteCustomer = async (id: number) => {
    const confirmation = await Swal.fire({
      title: 'Warning!',
      text: 'Are you sure?',
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#b51919',
    });

    if (confirmation.isConfirmed) {
      await window.electron.customers.delete(id);
      setCustomers(await window.electron.customers.read());
    }
  };

  const createCustomer = async (customerData: CustomerCreateData) => {
    await window.electron.customers.create(customerData);
    setIsCreateModalOpen(false);
    setCustomers(await window.electron.customers.read());
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Customers</h1>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create
        </button>
      </div>
      <Table customers={customers} deleteCustomer={deleteCustomer} />
      <Modal
        isOpen={isCreateModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
      >
        <Form createCustomer={createCustomer} />
      </Modal>
    </div>
  );
};

export default CustomersView;
