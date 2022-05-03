import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TextInput from 'renderer/components/TextInput';
import DrSecretSGProduct, {
  DrSecretSGProductCreateData,
} from 'shared/types/dr-secret/DrSecretSGProduct';

interface Props {
  createSgProduct?: (
    sgProductToEdit: DrSecretSGProductCreateData
  ) => Promise<void>;
  updateSgProduct?: (
    id: number,
    sgProductData: DrSecretSGProductCreateData
  ) => Promise<void>;
  sgProductToEdit?: DrSecretSGProduct;
}

const Form = ({ createSgProduct, updateSgProduct, sgProductToEdit }: Props) => {
  const [name, setName] = useState('');
  const [priceSGD, setPriceSGD] = useState(0);
  const [points, setPoints] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Name cannot be empty.');
    } else if (updateSgProduct && sgProductToEdit) {
      updateSgProduct(sgProductToEdit.id, {
        name,
        points,
        deliveryFee,
        priceSGD,
      });
    } else if (createSgProduct) {
      createSgProduct({ name, points, deliveryFee, priceSGD });
    }
  };

  useEffect(() => {
    if (sgProductToEdit) {
      setName(sgProductToEdit.name);
      setDeliveryFee(sgProductToEdit.deliveryFee);
      setPoints(sgProductToEdit.points);
      setPriceSGD(sgProductToEdit.priceSGD);
    }
  }, [sgProductToEdit]);

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
          value={priceSGD}
          type="number"
          onChange={(e) => setPriceSGD(Number(e.target.value))}
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

        <TextInput
          label="Delivery Fee (Rp)"
          id="sg-product-delivery-fee"
          placeholder="Product Delivery Fee"
          containerClassName="col-span-6"
          inputClassName="w-full"
          value={deliveryFee}
          type="number"
          onChange={(e) => setDeliveryFee(Number(e.target.value))}
        />
        <div className="flex col-span-12">
          <button type="submit" className="btn-primary ml-auto">
            {sgProductToEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </article>
  );
};

Form.defaultProps = {
  sgProductToEdit: undefined,
  updateSgProduct: undefined,
  createSgProduct: undefined,
};

export default Form;
