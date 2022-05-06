import TextInput from 'renderer/components/TextInput';
import { useEffect, useState } from 'react';
import SelectInput from 'renderer/components/SelectInput';
import Customer from 'shared/types/Customer';
import {
  DrSecretSGInvoiceItemCreateData,
  DrSecretSGInvoiceDeliveryFeeMode,
  DrSecretSGInvoiceDeliveryFeeModeWhole,
  DrSecretSGInvoiceDeliveryFeeModeIndividual,
} from 'shared/types/dr-secret/DrSecretSGInvoice';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import DrSecretSGProduct from 'shared/types/dr-secret/DrSecretSGProduct';
import RadioInput from 'renderer/components/RadioInput';

interface WithReactKey {
  key: string;
}

const deliveryFeeConstants: {
  WHOLE: DrSecretSGInvoiceDeliveryFeeModeWhole;
  INDIVIDUAL: DrSecretSGInvoiceDeliveryFeeModeIndividual;
} = {
  WHOLE: 'whole',
  INDIVIDUAL: 'individual',
};

const filterDeliveryMode = (mode: string): DrSecretSGInvoiceDeliveryFeeMode => {
  return mode === 'whole' || mode === 'individual' ? mode : 'individual';
};

const SGInvoiceForm = () => {
  const [date, setDate] = useState('');
  const [customerId, setCustomerId] = useState<number | undefined>(undefined);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<
    Array<DrSecretSGInvoiceItemCreateData & WithReactKey>
  >([]);
  const [products, setProducts] = useState<DrSecretSGProduct[]>([]);
  const [isWithCashback, setIsWithCashback] = useState('');
  const [deliveryFeeMode, setDeliveryFeeMode] =
    useState<DrSecretSGInvoiceDeliveryFeeMode>('individual');

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
        let deliveryFee: null | number = product ? product.deliveryFee : null;
        if (deliveryFeeMode === deliveryFeeConstants.WHOLE) {
          deliveryFee = null;
        }
        return {
          ...item,
          points: product ? product.points : 0,
          priceSGD: product ? product.priceSGD : 0,
          deliveryFee,
        };
      })
    );
  }, [invoiceItems, products, deliveryFeeMode]);

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
            deliveryFee:
              deliveryFeeMode === deliveryFeeConstants.INDIVIDUAL
                ? products[0].deliveryFee
                : null,
          },
        ];
      });
    }
  };

  const deleteProduct = (key: string) => {
    setInvoiceItems((prev) => prev.filter((item) => item.key !== key));
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
          <RadioInput
            label="Cashback"
            id="cashback"
            className="col-span-6 "
            containerClassName="flex gap-2"
          >
            <RadioInput.Button
              label="Yes"
              id="cashback-yes"
              value="yes"
              checked={isWithCashback === 'yes'}
              onChange={(e) => setIsWithCashback(e.target.value)}
            />
            <RadioInput.Button
              label="No"
              id="cashback-no"
              value="no"
              checked={isWithCashback === 'no'}
              onChange={(e) => setIsWithCashback(e.target.value)}
            />
          </RadioInput>

          <RadioInput
            label="Delivery Fee"
            id="delivery-fee-mode"
            className="col-span-6 "
            containerClassName="flex gap-2"
          >
            <RadioInput.Button
              label="Whole"
              id="delivery-fee-mode-whole"
              value={deliveryFeeConstants.WHOLE}
              checked={deliveryFeeMode === deliveryFeeConstants.WHOLE}
              onChange={(e) =>
                setDeliveryFeeMode(filterDeliveryMode(e.target.value))
              }
            />
            <RadioInput.Button
              label="Individual"
              id="delivery-fee-mode-individual"
              value={deliveryFeeConstants.INDIVIDUAL}
              checked={deliveryFeeMode === deliveryFeeConstants.INDIVIDUAL}
              onChange={(e) =>
                setDeliveryFeeMode(filterDeliveryMode(e.target.value))
              }
            />
          </RadioInput>
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
                  {deliveryFeeMode === deliveryFeeConstants.INDIVIDUAL && (
                    <th>Delivery</th>
                  )}
                  <th>Qty</th>
                  <th>Points Subtotal</th>
                  <th>Price Subtotal</th>
                  {deliveryFeeMode === deliveryFeeConstants.INDIVIDUAL && (
                    <th>Delivery Subtotal</th>
                  )}
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
                    {deliveryFeeMode === deliveryFeeConstants.INDIVIDUAL && (
                      <td>{item.deliveryFee}</td>
                    )}
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
                    {deliveryFeeMode === 'individual' && (
                      <td>
                        {item.quantity *
                          (item.deliveryFee ? item.deliveryFee : 0)}
                      </td>
                    )}

                    <td className="flex gap-2">
                      <button
                        type="button"
                        className="btn-danger p-2"
                        onClick={() => deleteProduct(item.key)}
                      >
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
