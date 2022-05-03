import { useEffect, useState } from 'react';
import confirm from 'renderer/utils/confirm';
import DrSecretSGProduct, {
  DrSecretSGProductCreateData,
} from 'shared/types/dr-secret/DrSecretSGProduct';

const Products = () => {
  const [sgProducts, setSgProducts] = useState<DrSecretSGProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sgProductToEdit, setCustomerToEdit] = useState<
    DrSecretSGProduct | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const allSgProducts = await window.electron.drSecret.sgProducts.read();
      setSgProducts(allSgProducts);
    })();
  }, []);

  useEffect(() => {
    if (!isModalOpen) setCustomerToEdit(undefined);
  }, [isModalOpen]);

  const deleteSgProduct = async (id: number) => {
    confirm('Are you sure?', async () => {
      await window.electron.drSecret.sgProducts.delete(id);
      setSgProducts(await window.electron.drSecret.sgProducts.read());
    });
  };

  const createSgProduct = async (customerData: DrSecretSGProductCreateData) => {
    await window.electron.drSecret.sgProducts.create(customerData);
    setIsModalOpen(false);
    setSgProducts(await window.electron.drSecret.sgProducts.read());
  };

  const editSgProduct = (customer: DrSecretSGProduct) => {
    setCustomerToEdit(customer);
    setIsModalOpen(true);
  };

  const updateCustomer = async (
    id: number,
    customerData: DrSecretSGProductCreateData
  ) => {
    await window.electron.drSecret.sgProducts.update(id, customerData);
    setIsModalOpen(false);
    setSgProducts(await window.electron.drSecret.sgProducts.read());
  };
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Dr. Secret Products</h1>
        <button type="button" className="btn-primary">
          Create
        </button>
      </div>
    </div>
  );
};

export default Products;
