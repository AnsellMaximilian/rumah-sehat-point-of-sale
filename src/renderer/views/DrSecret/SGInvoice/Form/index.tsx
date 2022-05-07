import TextInput from 'renderer/components/TextInput';
import { useEffect, useState } from 'react';
import SelectInput from 'renderer/components/SelectInput';
import Customer from 'shared/types/Customer';
import {
  DrSecretSGInvoiceItemCreateData,
  DrSecretSGInvoiceDeliveryFeeMode,
} from 'shared/types/dr-secret/DrSecretSGInvoice';

import { deliveryFeeConstants, NO, YES } from 'shared/constants';
import { filterDeliveryMode, filterYesOrNo } from 'shared/helpers';
import { v4 as uuidv4 } from 'uuid';
import DrSecretSGProduct from 'shared/types/dr-secret/DrSecretSGProduct';
import RadioInput from 'renderer/components/RadioInput';
import useSettings from 'renderer/hooks/useSettings';
import { WithReactKey, YesOrNo } from 'shared/types/general';
import ProductList from './ProductList';
import Footer from './Footer';

const SGInvoiceForm = () => {
  const [date, setDate] = useState('');
  const [customerId, setCustomerId] = useState<number | undefined>(undefined);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<
    Array<DrSecretSGInvoiceItemCreateData & WithReactKey>
  >([]);
  const [products, setProducts] = useState<DrSecretSGProduct[]>([]);
  const [isWithCashback, setIsWithCashback] = useState<YesOrNo>('no');
  const [deliveryFeeMode, setDeliveryFeeMode] =
    useState<DrSecretSGInvoiceDeliveryFeeMode>('individual');

  const exchangeRateSGDToRP = useSettings('exchange-rate-sgd-rp');

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
      <h1 className="text-xl font-bold mb-4">Create Singaporean Form</h1>
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
              checked={isWithCashback === YES}
              onChange={(e) => setIsWithCashback(filterYesOrNo(e.target.value))}
            />
            <RadioInput.Button
              label="No"
              id="cashback-no"
              value="no"
              checked={isWithCashback === NO}
              onChange={(e) => setIsWithCashback(filterYesOrNo(e.target.value))}
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
            Exchange Rate:{' '}
            <span className="font-semibold">{exchangeRateSGDToRP.value}</span>
          </div>
          <div className="col-span-12">
            <ProductList
              products={products}
              deleteProduct={deleteProduct}
              addProduct={addProduct}
              deliveryFeeMode={deliveryFeeMode}
              invoiceItems={invoiceItems}
              setInvoiceItems={setInvoiceItems}
            />
          </div>
          <div className="col-span-6 md:col-start-6">
            <Footer
              invoiceItems={invoiceItems}
              isWithCashback={isWithCashback === YES}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SGInvoiceForm;
