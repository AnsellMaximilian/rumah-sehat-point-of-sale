import { useEffect, useState } from 'react';
import Customer from 'shared/types/Customer';
import Swal from 'sweetalert2';
import Table from './Table';

const CustomersView = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
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
        <button type="button" className="btn-primary">
          Create
        </button>
      </div>
      <Table customers={customers} deleteCustomer={deleteCustomer} />
    </div>
  );
};

export default CustomersView;
