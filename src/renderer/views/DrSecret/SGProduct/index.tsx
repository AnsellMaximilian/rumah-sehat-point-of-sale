import { useEffect, useState } from 'react';
import Modal from 'renderer/components/Modal';
import confirm from 'renderer/utils/confirm';
import Table from 'renderer/views/DrSecret/SGProduct/Table';
import DrSecretSGProduct, {
  DrSecretSGProductCreateData,
} from 'shared/types/dr-secret/DrSecretSGProduct';
import Form from './Form';

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

  const updateSgProduct = async (
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
        <button
          type="button"
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create
        </button>
      </div>
      <Table
        sgProducts={sgProducts}
        editSgProduct={editSgProduct}
        deleteSgProduct={deleteSgProduct}
      />
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <Modal.Header
          label={
            sgProductToEdit
              ? `Edit Customer of ID ${sgProductToEdit.id}`
              : 'Create Customer'
          }
          closeModal={() => setIsModalOpen(false)}
        />
        <Form
          createSgProduct={createSgProduct}
          sgProductToEdit={sgProductToEdit}
          updateSgProduct={updateSgProduct}
        />
      </Modal>
    </div>
  );
};

export default Products;
