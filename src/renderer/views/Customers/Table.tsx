import { FaTrash, FaPenSquare } from 'react-icons/fa';
import Customer from 'shared/types/Customer';

interface Props {
  customers: Customer[];
  deleteCustomer: (id: number) => void;
  editCustomer: (customer: Customer) => void;
}

const Table = ({ customers, deleteCustomer, editCustomer }: Props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cus) => (
            <tr key={cus.id}>
              <td>{cus.id}</td>
              <td>{cus.name}</td>
              <td>{cus.address}</td>
              <td>{cus.phone}</td>
              <td className="flex gap-2">
                <button
                  type="button"
                  className="btn-danger p-2"
                  onClick={() => deleteCustomer(cus.id)}
                >
                  <FaTrash />
                </button>
                <button
                  type="button"
                  className="btn-warning p-2"
                  onClick={() => editCustomer(cus)}
                >
                  <FaPenSquare />
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
