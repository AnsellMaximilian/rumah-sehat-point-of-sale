import { DrSecretSGInvoiceItemCreateData } from 'shared/types/dr-secret/DrSecretSGInvoice';
import { WithReactKey } from 'shared/types/general';
import useSettings from 'renderer/hooks/useSettings';

const FooterItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex justify-between">
    <div>{label}</div>
    <div>{value}</div>
  </div>
);

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
      <FooterItem
        label="Total Price (SGD)"
        value={invoiceItems.reduce(
          (total, item) => total + item.priceSGD * item.quantity,
          0
        )}
      />
      <FooterItem
        label="Total Price (RP)"
        value={
          invoiceItems.reduce(
            (total, item) => total + item.priceSGD * item.quantity,
            0
          ) * Number(exchangeRateSGDToRP.value)
        }
      />

      <FooterItem
        label="Total Delivery Fee (RP)"
        value={invoiceItems.reduce(
          (total, item) =>
            total + (item.deliveryFee ? item.deliveryFee : 0) * item.quantity,
          0
        )}
      />
      <FooterItem
        label="Total Points"
        value={invoiceItems.reduce(
          (total, item) => total + item.points * item.quantity,
          0
        )}
      />
      {isWithCashback && (
        <FooterItem
          label="Total Cashback"
          value={
            (invoiceItems.reduce(
              (total, item) => total + item.points * item.quantity,
              0
            ) -
              sgCashbackPointReducer.value) *
            sgCashbackMultiplier.value *
            (sgCashbackPercentage.value / 100)
          }
        />
      )}
    </div>
  );
};

export default Footer;
