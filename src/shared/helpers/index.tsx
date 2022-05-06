import { DrSecretSGInvoiceDeliveryFeeMode } from '../types/dr-secret/DrSecretSGInvoice';

export const filterDeliveryMode = (
  mode: string
): DrSecretSGInvoiceDeliveryFeeMode => {
  return mode === 'whole' || mode === 'individual' ? mode : 'individual';
};

export default filterDeliveryMode;
