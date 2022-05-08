import { DrSecretSGInvoiceItemCreateData } from 'shared/types/dr-secret/DrSecretSGInvoice';
import { WithReactKey } from 'shared/types/general';

type InvoiceItems = Array<
  | (DrSecretSGInvoiceItemCreateData & WithReactKey)
  | DrSecretSGInvoiceItemCreateData
>;

const drSecret = {
  sg: {
    calcTotalPriceSGD(invoiceItems: InvoiceItems) {
      return invoiceItems.reduce(
        (total, item) => total + item.priceSGD * item.quantity,
        0
      );
    },
    calcTotalPriceRP(invoiceItems: InvoiceItems, exchangeRate: number) {
      return (
        invoiceItems.reduce(
          (total, item) => total + item.priceSGD * item.quantity,
          0
        ) * exchangeRate
      );
    },
    calcTotalDeliveryFee(invoiceItems: InvoiceItems) {
      return invoiceItems.reduce(
        (total, item) =>
          total + (item.deliveryFee ? item.deliveryFee : 0) * item.quantity,
        0
      );
    },
    calcTotalCashback(
      invoiceItems: InvoiceItems,
      {
        reducer,
        percentage,
        multiplier,
      }: { reducer: number; percentage: number; multiplier: number }
    ) {
      return (
        (invoiceItems.reduce(
          (total, item) => total + item.points * item.quantity,
          0
        ) -
          reducer) *
        multiplier *
        (percentage / 100)
      );
    },
  },
};

export default drSecret;
