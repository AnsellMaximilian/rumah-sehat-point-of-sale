export interface DrSecretSGInvoiceItem {
  id: number;
  productId: number;
  points: number;
  priceSGD: number;
  quantity: number;
  sgInvoiceId: number;
  deliveryFee: number | null;
}

export interface DrSecretSGInvoiceItemCreateData {
  productId: number;
  points: number;
  priceSGD: number;
  quantity: number;
  deliveryFee: number | null;
}

export type DrSecretSGInvoiceDeliveryFeeModeIndividual = 'individual';
export type DrSecretSGInvoiceDeliveryFeeModeWhole = 'whole';

export type DrSecretSGInvoiceDeliveryFeeMode =
  | DrSecretSGInvoiceDeliveryFeeModeIndividual
  | DrSecretSGInvoiceDeliveryFeeModeWhole;
