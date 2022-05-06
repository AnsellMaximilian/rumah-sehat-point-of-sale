import React from 'react';
import { FaTrash } from 'react-icons/fa';
import SelectInput from 'renderer/components/SelectInput';
import TextInput from 'renderer/components/TextInput';
import { deliveryFeeConstants } from 'shared/constants';
import {
  DrSecretSGInvoiceDeliveryFeeMode,
  DrSecretSGInvoiceItemCreateData,
} from 'shared/types/dr-secret/DrSecretSGInvoice';
import DrSecretSGProduct from 'shared/types/dr-secret/DrSecretSGProduct';
import { WithReactKey } from 'shared/types/general';

interface Props {
  addProduct: () => void;
  deliveryFeeMode: DrSecretSGInvoiceDeliveryFeeMode;
  invoiceItems: Array<DrSecretSGInvoiceItemCreateData & WithReactKey>;
  setInvoiceItems: React.Dispatch<
    React.SetStateAction<(DrSecretSGInvoiceItemCreateData & WithReactKey)[]>
  >;
  products: DrSecretSGProduct[];
  deleteProduct: (key: string) => void;
}

const ProductList = ({
  addProduct,
  deliveryFeeMode,
  invoiceItems,
  setInvoiceItems,
  products,
  deleteProduct,
}: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Products</h2>
        <button className="btn-primary" type="button" onClick={addProduct}>
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
                  {item.quantity * (item.deliveryFee ? item.deliveryFee : 0)}
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
  );
};

export default ProductList;
