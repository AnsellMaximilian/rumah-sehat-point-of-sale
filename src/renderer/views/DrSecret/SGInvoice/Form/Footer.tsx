import { DrSecretSGInvoiceItemCreateData } from 'shared/types/dr-secret/DrSecretSGInvoice';
import { WithReactKey } from 'shared/types/general';
import useSettings from 'renderer/hooks/useSettings';
import drSecret from 'shared/helpers/dr-secret';

const {
  sg: {
    calcTotalPriceSGD,
    calcTotalPriceRP,
    calcTotalDeliveryFee,
    calcTotalCashback,
  },
} = drSecret;

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
        value={calcTotalPriceSGD(invoiceItems)}
      />
      <FooterItem
        label="Total Price (RP)"
        value={calcTotalPriceRP(
          invoiceItems,
          Number(exchangeRateSGDToRP.value)
        )}
      />

      <FooterItem
        label="Total Delivery Fee (RP)"
        value={calcTotalDeliveryFee(invoiceItems)}
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
          value={calcTotalCashback(invoiceItems, {
            reducer: Number(sgCashbackPointReducer.value),
            multiplier: Number(sgCashbackMultiplier.value),
            percentage: Number(sgCashbackPercentage.value),
          })}
        />
      )}
    </div>
  );
};

export default Footer;
