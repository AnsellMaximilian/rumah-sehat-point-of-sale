import {
  DrSecretSGInvoiceCashback,
  DrSecretSGInvoiceItemCreateData,
} from 'shared/types/dr-secret/DrSecretSGInvoice';
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
  { reducer, percentage, multiplier }: DrSecretSGInvoiceCashback
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

export const calcGrandTotal = (
  invoiceItems: InvoiceItems,
  exchangeRate: number,
  isWithCashback: boolean,
  cashback?: DrSecretSGInvoiceCashback
) => {
  let grandTotal =
    calcTotalPriceRP(invoiceItems, exchangeRate) +
    calcTotalDeliveryFee(invoiceItems);
  if (isWithCashback) {
    if (cashback) {
      grandTotal -= calcTotalCashback(invoiceItems, cashback);
    } else {
      throw Error('Cashback object required');
    }
  }
  return grandTotal;
};
