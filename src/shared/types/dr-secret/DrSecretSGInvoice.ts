export interface DrSecretSGInvoiceItem {
  id: number;
  itemId: number;
  points: number;
  priceSGD: number;
  quantity: number;
  sgInvoiceId: number;
  deliveryFee: number | null;
}

export interface DrSecretSGInvoiceItemCreateData {
  itemId: number;
  points: number;
  priceSGD: number;
  quantity: number;
  sgInvoiceId: number;
  deliveryFee: number | null;
}
