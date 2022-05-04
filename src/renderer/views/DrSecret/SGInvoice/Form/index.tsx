import TextInput from 'renderer/components/TextInput';
import { useEffect, useState } from 'react';
import SelectInput from 'renderer/components/SelectInput';
import Customer from 'shared/types/Customer';
import { DrSecretSGInvoiceItemCreateData } from 'shared/types/dr-secret/DrSecretSGInvoice';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import DrSecretSGProduct from 'shared/types/dr-secret/DrSecretSGProduct';

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
  const [products, setProducts] = useState<DrSecretSGProduct[]>([]);

  useEffect(() => {
    (async () => {
      const allCustomers = await window.electron.customers.read();
      setCustomers(allCustomers);
      if (allCustomers.length > 0) setCustomerId(allCustomers[0].id);
      setProducts(await window.electron.drSecret.sgProducts.read());
    })();
  }, []);

  useEffect(() => {
    setInvoiceItems((prev) =>
      prev.map((item) => {
        const product = products.find((prod) => prod.id === item.productId);
        return {
          ...item,
          points: product ? product.points : 0,
          priceSGD: product ? product.priceSGD : 0,
        };
      })
    );
  }, [invoiceItems, products]);

  const addProduct = () => {
    if (products.length > 0) {
      setInvoiceItems((prev) => {
        return [
          ...prev,
          {
            key: uuidv4(),
            productId: products[0].id,
            points: products[0].points,
            priceSGD: products[0].priceSGD,
            quantity: 0,
            deliveryFee: null,
          },
        ];
      });
    }
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
                    <td>
                      <SelectInput
                        id={`invoice-item-product-${item.key}`}
                        containerClassName="col-span-8"
                        inputClassName="w-full"
                        value={item.productId}
                        onChange={(e) =>
                          setInvoiceItems((prev) =>
                            prev.map((prevItem) =>
                              prevItem.key === item.key
                                ? {
                                    ...prevItem,
                                    productId: Number(e.target.value),
                                  }
                                : prevItem
                            )
                          )
                        }
                      >
                        {products.map((prod) => (
                          <option key={prod.id} value={prod.id}>
                            {prod.name}
                          </option>
                        ))}
                      </SelectInput>
                    </td>
                    <td>{item.points}</td>
                    <td>{item.priceSGD}</td>
                    <td>
                      <TextInput
                        id={`invoice-item-qty-${item.key}`}
                        placeholder="Quantity"
                        containerClassName="col-span-4"
                        inputClassName="w-full"
                        value={item.quantity}
                        type="number"
                        onChange={(e) =>
                          setInvoiceItems((prev) =>
                            prev.map((prevItem) =>
                              prevItem.key === item.key
                                ? {
                                    ...prevItem,
                                    quantity: Number(e.target.value),
                                  }
                                : prevItem
                            )
                          )
                        }
                      />
                    </td>
                    <td>{item.quantity * item.points}</td>
                    <td>{item.quantity * item.priceSGD}</td>
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
