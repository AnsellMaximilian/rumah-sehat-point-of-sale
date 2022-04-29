import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Customer from 'shared/types/Customer';
import Swal from 'sweetalert2';
import Table from './Table';
import CreateForm from './CreateForm';

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
    }
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
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
          content: { padding: 0, border: 'none' },
        }}
      >
        <CreateForm />
      </Modal>
    </div>
  );
};

export default CustomersView;
