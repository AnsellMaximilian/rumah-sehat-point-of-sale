import { FaTrash } from 'react-icons/fa';
import Customer from 'shared/types/Customer';

const Table = ({
  customers,
  deleteCustomer,
}: {
  customers: Customer[];
  deleteCustomer: (id: number) => void;
}) => {
  return (
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
            <th className="uppercase font-medium text-left text-xs px-6 py-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {customers.map((cus) => (
            <tr key={cus.id}>
              <td className="px-6 py-4 text-sm text-cool-gray-900">{cus.id}</td>
              <td className="px-6 py-4 text-sm text-cool-gray-900">
                {cus.name}
              </td>
              <td className="px-6 py-4 text-sm text-cool-gray-900">
                {cus.address}
              </td>
              <td className="px-6 py-4 text-sm text-cool-gray-900">
                {cus.phone}
              </td>
              <td className="px-6 py-4 text-sm text-cool-gray-900">
                <button
                  type="button"
                  className="btn-danger p-2"
                  onClick={() => deleteCustomer(cus.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
