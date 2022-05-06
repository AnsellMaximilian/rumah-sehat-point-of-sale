import { No, Yes } from 'shared/types/general';
import {
  DrSecretSGInvoiceDeliveryFeeModeWhole,
  DrSecretSGInvoiceDeliveryFeeModeIndividual,
} from '../types/dr-secret/DrSecretSGInvoice';

export const deliveryFeeConstants: {
  WHOLE: DrSecretSGInvoiceDeliveryFeeModeWhole;
  INDIVIDUAL: DrSecretSGInvoiceDeliveryFeeModeIndividual;
} = {
  WHOLE: 'whole',
  INDIVIDUAL: 'individual',
};

export const YES: Yes = 'yes';
export const NO: No = 'no';
