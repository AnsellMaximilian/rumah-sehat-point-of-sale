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

export const affirmationConstants = {
  YES: 'yes',
  NO: 'no',
};
