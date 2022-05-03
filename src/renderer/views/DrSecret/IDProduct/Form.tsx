import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TextInput from 'renderer/components/TextInput';
import DrSecretIDProduct, {
  DrSecretIDProductCreateData,
} from 'shared/types/dr-secret/DrSecretIDProduct';

interface Props {
  createIdProduct?: (
    idProductToEdit: DrSecretIDProductCreateData
  ) => Promise<void>;
  updateIdProduct?: (
    id: number,
    sgProductData: DrSecretIDProductCreateData
  ) => Promise<void>;
  idProductToEdit?: DrSecretIDProduct;
}

const Form = ({ createIdProduct, updateIdProduct, idProductToEdit }: Props) => {
  const [name, setName] = useState('');
  const [priceRP, setPriceRP] = useState(0);
  const [points, setPoints] = useState(0);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Name cannot be empty.');
    } else if (updateIdProduct && idProductToEdit) {
      updateIdProduct(idProductToEdit.id, {
        name,
        points,
        priceRP,
      });
    } else if (createIdProduct) {
      createIdProduct({ name, points, priceRP });
    }
  };

  useEffect(() => {
    if (idProductToEdit) {
      setName(idProductToEdit.name);
      setPoints(idProductToEdit.points);
      setPriceRP(idProductToEdit.priceRP);
    }
  }, [idProductToEdit]);

  return (
    <article>
      <form onSubmit={onSubmit} className="p-4 grid grid-cols-12 gap-2">
        <TextInput
          label="Name"
          id="customer-name"
          placeholder="Customer Name"
          containerClassName="col-span-6"
          inputClassName="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Price (SGD)"
          id="sg-product-price"
          placeholder="Product Price"
          containerClassName="col-span-6"
          inputClassName="w-full"
          value={priceRP}
          type="number"
          onChange={(e) => setPriceRP(Number(e.target.value))}
        />
        <TextInput
          label="Points"
          id="sg-product-points"
          placeholder="Product Points"
          containerClassName="col-span-6"
          inputClassName="w-full"
          value={points}
          type="number"
          onChange={(e) => setPoints(Number(e.target.value))}
        />
        <div className="flex col-span-12">
          <button type="submit" className="btn-primary ml-auto">
            {idProductToEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </article>
  );
};

Form.defaultProps = {
  idProductToEdit: undefined,
  updateIdProduct: undefined,
  createIdProduct: undefined,
};

export default Form;
