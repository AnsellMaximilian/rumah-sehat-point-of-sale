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
      <div className="flex justify-between">
        <div>Total Price (SGD)</div>
        <div>
          {invoiceItems.reduce(
            (total, item) => total + item.priceSGD * item.quantity,
            0
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Total Price (RP)</div>
        <div>
          {invoiceItems.reduce(
            (total, item) => total + item.priceSGD * item.quantity,
            0
          ) * Number(exchangeRateSGDToRP.value)}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Total Delivery Fee (RP)</div>
        <div>
          {invoiceItems.reduce(
            (total, item) =>
              total + (item.deliveryFee ? item.deliveryFee : 0) * item.quantity,
            0
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div>Total Points</div>
        <div>
          {invoiceItems.reduce(
            (total, item) => total + item.points * item.quantity,
            0
          )}
        </div>
      </div>
      {isWithCashback && (
        <div className="flex justify-between">
          <div>Total Cashback:</div>
          <div>
            {(invoiceItems.reduce(
              (total, item) => total + item.points * item.quantity,
              0
            ) -
              sgCashbackPointReducer.value) *
              sgCashbackMultiplier.value *
              (sgCashbackPercentage.value / 100)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
