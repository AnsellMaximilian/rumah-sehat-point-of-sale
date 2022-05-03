import { FaTrash, FaPenSquare } from 'react-icons/fa';
import DrSecretIDProduct from '../../../../shared/types/dr-secret/DrSecretIDProduct';

interface Props {
  idProducts: DrSecretIDProduct[];
  deleteIdProduct: (id: number) => void;
  editIdProduct: (customer: DrSecretIDProduct) => void;
}

const Table = ({ idProducts, deleteIdProduct, editIdProduct }: Props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price (Rp)</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {idProducts.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.priceRP}</td>
              <td>{prod.points}</td>
              <td className="flex gap-2">
                <button
                  type="button"
                  className="btn-danger p-2"
                  onClick={() => deleteIdProduct(prod.id)}
                >
                  <FaTrash />
                </button>
                <button
                  type="button"
                  className="btn-warning p-2"
                  onClick={() => editIdProduct(prod)}
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
