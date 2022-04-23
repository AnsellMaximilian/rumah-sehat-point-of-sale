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
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Customers</h1>
        <button type="button" className="btn-primary">
          Create
        </button>
      </div>
      <div>
        <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="uppercase font-medium text-left text-xs px-6 py-4">
                Id
              </th>
              <th className="uppercase font-medium text-left text-xs px-6 py-4">
                Name
              </th>
              <th className="uppercase font-medium text-left text-xs px-6 py-4">
                Address
              </th>
              <th className="uppercase font-medium text-left text-xs px-6 py-4">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {customers.map((cus) => (
              <tr key={cus.id}>
                <td className="px-6 py-4 text-sm text-cool-gray-900">
                  {cus.id}
                </td>
                <td className="px-6 py-4 text-sm text-cool-gray-900">
                  {cus.name}
                </td>
                <td className="px-6 py-4 text-sm text-cool-gray-900">
                  {cus.address}
                </td>
                <td className="px-6 py-4 text-sm text-cool-gray-900">
                  {cus.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersView;
