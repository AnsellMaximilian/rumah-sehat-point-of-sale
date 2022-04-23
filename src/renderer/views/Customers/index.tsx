import { useEffect, useState } from 'react';
import Customer from 'shared/types/Customer';

const CustomersView = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    (async () => {
      const allCustomers = await window.electron.customers.read();
      setCustomers(allCustomers);
    })();
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Customers</h1>
        <button type="button" className="btn-primary">
          Create
        </button>
      </div>
      <div>
        {customers.map((cus) => (
          <div>{cus.id}</div>
        ))}
      </div>
    </div>
  );
};

export default CustomersView;
