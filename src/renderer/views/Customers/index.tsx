import { useEffect, useState } from 'react';

const CustomersView = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    window.electron.customers
      .read()
      .then((cus) => {
        console.log(cus);
        return cus;
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Customers</h1>
        <button type="button" className="btn-primary">
          Create
        </button>
      </div>
    </div>
  );
};

export default CustomersView;
