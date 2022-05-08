import { DrSecretSGInvoiceItemCreateData } from 'shared/types/dr-secret/DrSecretSGInvoice';
import { WithReactKey } from 'shared/types/general';

type InvoiceItems = Array<
  | (DrSecretSGInvoiceItemCreateData & WithReactKey)
  | DrSecretSGInvoiceItemCreateData
>;

export const calcTotalPriceSGD = (invoiceItems: InvoiceItems) => {
  return invoiceItems.reduce(
    (total, item) => total + item.priceSGD * item.quantity,
    0
  );
};
export const calcTotalPriceRP = (
  invoiceItems: InvoiceItems,
  exchangeRate: number
) => {
  return (
    invoiceItems.reduce(
      (total, item) => total + item.priceSGD * item.quantity,
      0
    ) * exchangeRate
  );
};
export const calcTotalDeliveryFee = (invoiceItems: InvoiceItems) => {
  return invoiceItems.reduce(
    (total, item) =>
      total + (item.deliveryFee ? item.deliveryFee : 0) * item.quantity,
    0
  );
};
export const calcTotalCashback = (
  invoiceItems: InvoiceItems,
  {
    reducer,
    percentage,
    multiplier,
  }: { reducer: number; percentage: number; multiplier: number }
) => {
  return (
    (invoiceItems.reduce(
      (total, item) => total + item.points * item.quantity,
      0
    ) -
      reducer) *
    multiplier *
    (percentage / 100)
  );
};
