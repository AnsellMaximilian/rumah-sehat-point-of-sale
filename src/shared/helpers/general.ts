import { YesOrNo } from 'shared/types/general';
import { DrSecretSGInvoiceDeliveryFeeMode } from '../types/dr-secret/DrSecretSGInvoice';

export const filterDeliveryMode = (
  mode: string
): DrSecretSGInvoiceDeliveryFeeMode => {
  return mode === 'whole' || mode === 'individual' ? mode : 'individual';
};

export const filterYesOrNo = (answer: string): YesOrNo => {
  return answer === 'yes' || answer === 'no' ? answer : 'no';
};

export default filterDeliveryMode;
