import { FaTrash, FaPenSquare } from 'react-icons/fa';
import DrSecretSGProduct from '../../../../shared/types/dr-secret/DrSecretSGProduct';

interface Props {
  sgProducts: DrSecretSGProduct[];
  deleteSgProduct: (id: number) => void;
  editSgProduct: (customer: DrSecretSGProduct) => void;
}

const Table = ({ sgProducts, deleteSgProduct, editSgProduct }: Props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price (SGD)</th>
            <th>Points</th>
            <th>Delivery Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sgProducts.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.priceSGD}</td>
              <td>{prod.points}</td>
              <td>{prod.deliveryFee}</td>
              <td className="flex gap-2">
                <button
                  type="button"
                  className="btn-danger p-2"
                  onClick={() => deleteSgProduct(prod.id)}
                >
                  <FaTrash />
                </button>
                <button
                  type="button"
                  className="btn-warning p-2"
                  onClick={() => editSgProduct(prod)}
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
