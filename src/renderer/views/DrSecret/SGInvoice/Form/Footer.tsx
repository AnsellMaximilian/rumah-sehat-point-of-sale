import { DrSecretSGInvoiceItemCreateData } from 'shared/types/dr-secret/DrSecretSGInvoice';
import { WithReactKey } from 'shared/types/general';
import useSettings from 'renderer/hooks/useSettings';

interface Props {
  invoiceItems: Array<DrSecretSGInvoiceItemCreateData & WithReactKey>;
  isWithCashback: boolean;
}
const Footer = ({ invoiceItems, isWithCashback }: Props) => {
  const exchangeRateSGDToRP = useSettings('exchange-rate-sgd-rp');
  const sgCashbackPercentage = useSettings('sg-cashback-percentage');
  const sgCashbackMultiplier = useSettings('sg-cashback-multiplier');
  const sgCashbackPointReducer = useSettings('sg-cashback-point-reducer');

  return (
    <div>
      <div>
        <div>Total Price (SGD):</div>
        <div>
          {invoiceItems.reduce(
            (total, item) => total + item.priceSGD * item.quantity,
            0
          )}
        </div>
      </div>
      <div>
        Total Price (RP):{' '}
        {invoiceItems.reduce(
          (total, item) => total + item.priceSGD * item.quantity,
          0
        ) * Number(exchangeRateSGDToRP.value)}
      </div>
      <div>
        Total Delivery Fee (RP):{' '}
        {invoiceItems.reduce(
          (total, item) =>
            total + (item.deliveryFee ? item.deliveryFee : 0) * item.quantity,
          0
        )}
      </div>
      <div>
        Total Points:{' '}
        {invoiceItems.reduce(
          (total, item) => total + item.points * item.quantity,
          0
        )}
      </div>
      {isWithCashback && (
        <div>
          Total Cashback:{' '}
          {(invoiceItems.reduce(
            (total, item) => total + item.points * item.quantity,
            0
          ) -
            sgCashbackPointReducer.value) *
            sgCashbackMultiplier.value *
            (sgCashbackPercentage.value / 100)}
        </div>
      )}
    </div>
  );
};

export default Footer;
