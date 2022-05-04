import TextInput from 'renderer/components/TextInput';
import { useEffect, useState } from 'react';
import SelectInput from 'renderer/components/SelectInput';
import Customer from 'shared/types/Customer';
import { DrSecretSGInvoiceItemCreateData } from 'shared/types/dr-secret/DrSecretSGInvoice';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

interface WithReactKey {
  key: string;
}

const SGInvoiceForm = () => {
  const [date, setDate] = useState('');
  const [customerId, setCustomerId] = useState<number | undefined>(undefined);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<
    Array<DrSecretSGInvoiceItemCreateData & WithReactKey>
  >([]);

  useEffect(() => {
    (async () => {
      const allCustomers = await window.electron.customers.read();
      setCustomers(allCustomers);
      if (allCustomers.length > 0) setCustomerId(allCustomers[0].id);
    })();
  }, []);

  const addProduct = () => {
    setInvoiceItems((prev) => {
      return [
        ...prev,
        {
          key: uuidv4(),
          productId: 0,
          points: 0,
          priceSGD: 0,
          quantity: 0,
          deliveryFee: 0,
        },
      ];
    });
  };

  return (
    <div>
      <h1>Create Singaporean Form</h1>
      <div>
        <form className="grid grid-cols-12 gap-4">
          <SelectInput
            label="Customer"
            id="invoice-customer"
            containerClassName="col-span-8"
            inputClassName="w-full"
            value={customerId}
            onChange={(e) => setCustomerId(Number(e.target.value))}
          >
            {customers.map((cus) => (
              <option key={cus.id} value={cus.id}>
                {cus.name}
              </option>
            ))}
          </SelectInput>
          <TextInput
            label="Date"
            id="invoice-date"
            placeholder="Invoice Date"
            containerClassName="col-span-4"
            inputClassName="w-full"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="col-span-12">
            <div className="flex justify-between items-center mb-4">
              <h2>Products</h2>
              <button
                className="btn-primary"
                type="button"
                onClick={addProduct}
              >
                Add Product
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Points</th>
                  <th>Price (SGD)</th>
                  <th>Qty</th>
                  <th>Points Subtotal</th>
                  <th>Price Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item) => (
                  <tr key={item.key}>
                    <td>{item.productId}</td>
                    <td>{item.points}</td>
                    <td>{item.priceSGD}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity}</td>
                    <td className="flex gap-2">
                      <button type="button" className="btn-danger p-2">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SGInvoiceForm;
