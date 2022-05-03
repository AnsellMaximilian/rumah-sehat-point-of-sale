import { useEffect, useState } from 'react';
import Modal from 'renderer/components/Modal';
import confirm from 'renderer/utils/confirm';
import DrSecretIDProduct, {
  DrSecretIDProductCreateData,
} from 'shared/types/dr-secret/DrSecretIDProduct';
import Table from './Table';
import Form from './Form';

const IDProducts = () => {
  const [idProducts, setIdProducts] = useState<DrSecretIDProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProductToEdit, setIdProductToEdit] = useState<
    DrSecretIDProduct | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      const allIdProducts = await window.electron.drSecret.idProducts.read();
      setIdProducts(allIdProducts);
    })();
  }, []);

  useEffect(() => {
    if (!isModalOpen) setIdProductToEdit(undefined);
  }, [isModalOpen]);

  const deleteIdProduct = async (id: number) => {
    confirm('Are you sure?', async () => {
      await window.electron.drSecret.idProducts.delete(id);
      setIdProducts(await window.electron.drSecret.idProducts.read());
    });
  };

  const createIdProduct = async (customerData: DrSecretIDProductCreateData) => {
    await window.electron.drSecret.idProducts.create(customerData);
    setIsModalOpen(false);
    setIdProducts(await window.electron.drSecret.idProducts.read());
  };

  const editIdProduct = (customer: DrSecretIDProduct) => {
    setIdProductToEdit(customer);
    setIsModalOpen(true);
  };

  const updateIdProduct = async (
    id: number,
    customerData: DrSecretIDProductCreateData
  ) => {
    await window.electron.drSecret.idProducts.update(id, customerData);
    setIsModalOpen(false);
    setIdProducts(await window.electron.drSecret.idProducts.read());
  };
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Dr. Secret Indonesian Products</h1>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Create
        </button>
      </div>
      <Table
        idProducts={idProducts}
        editIdProduct={editIdProduct}
        deleteIdProduct={deleteIdProduct}
      />
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <Modal.Header
          label={
            idProductToEdit
              ? `Edit Product of ID ${idProductToEdit.id}`
              : 'Create Product'
          }
          closeModal={() => setIsModalOpen(false)}
        />
        <Form
          createIdProduct={createIdProduct}
          idProductToEdit={idProductToEdit}
          updateIdProduct={updateIdProduct}
        />
      </Modal>
    </div>
  );
};

export default IDProducts;
