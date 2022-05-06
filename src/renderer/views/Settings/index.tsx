import { toast } from 'react-toastify';
import TextInput from 'renderer/components/TextInput';
import useSettings from 'renderer/hooks/useSettings';

const Settings = () => {
  // General Settings
  const appName = useSettings('app-name');
  const dbUser = useSettings('db-user');
  const dbPort = useSettings('db-port');
  const dbName = useSettings('db-name');
  const exchangeRateSGDToRP = useSettings('exchange-rate-sgd-rp');
  const sgCashbackPercentage = useSettings('sg-cashback-percentage');
  const sgCashbackMultiplier = useSettings('sg-cashback-multiplier');
  const sgCashbackPointReducer = useSettings('sg-cashback-point-reducer');

  const handleSave: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // General Settings
    appName.save();
    dbName.save();
    dbPort.save();
    dbUser.save();

    // Dr. Secret
    exchangeRateSGDToRP.save();
    sgCashbackPercentage.save();
    sgCashbackMultiplier.save();
    sgCashbackPointReducer.save();

    toast.success('Settings saved');
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold pb-2 border-b-2 border-primary mb-2">
            General
          </h2>
          <div className="grid grid-cols-12">
            <TextInput
              label="App Name"
              id="app-name"
              placeholder="App Name"
              containerClassName="col-span-12 md:col-span-4"
              value={appName.value || ''}
              onChange={(e) => appName.setValue(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold pb-2 border-b-2 border-primary mb-2">
            Database
          </h2>
          <div className="grid grid-cols-12 gap-2">
            <TextInput
              label="Database Name"
              id="db-name"
              placeholder="Database Name"
              containerClassName="col-span-12 md:col-span-4"
              value={dbName.value || ''}
              onChange={(e) => dbName.setValue(e.target.value)}
            />
            <TextInput
              label="Database User"
              id="db-user"
              placeholder="Database User"
              containerClassName="col-span-12 md:col-span-4"
              value={dbUser.value || ''}
              onChange={(e) => dbUser.setValue(e.target.value)}
            />
            <TextInput
              label="Database Port"
              id="db-port"
              placeholder="Database Port"
              containerClassName="col-span-12 md:col-span-4"
              value={dbPort.value || ''}
              onChange={(e) => dbPort.setValue(e.target.value)}
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold pb-2 border-b-2 border-primary mb-2">
            Dr. Secret
          </h2>
          <div className="grid grid-cols-12 gap-2">
            <TextInput
              label="Exchange Rate (SGD to RP)"
              id="exchange-rate-sgd-rp"
              placeholder="Exchange Rate (SGD to RP)"
              containerClassName="col-span-12"
              value={exchangeRateSGDToRP.value || ''}
              onChange={(e) => exchangeRateSGDToRP.setValue(e.target.value)}
            />
            <div className="col-span-12">
              <div className="input-label">SG Discount Model</div>
              <div className="flex gap-2 items-center max-w-full">
                <div>(</div>

                <div>Total Points</div>
                <div>-</div>

                <TextInput
                  id="sg-cashback-point-reducer"
                  placeholder="SG Cashback Point Reducer"
                  value={sgCashbackPointReducer.value || ''}
                  inputClassName="w-full"
                  onChange={(e) =>
                    sgCashbackPointReducer.setValue(e.target.value)
                  }
                />
                <div>)</div>
                <div>*</div>

                <TextInput
                  id="sg-cashback-multiplier"
                  placeholder="SG Cashback Multiplier"
                  value={sgCashbackMultiplier.value || ''}
                  inputClassName="w-full"
                  onChange={(e) =>
                    sgCashbackMultiplier.setValue(e.target.value)
                  }
                />

                <div className="flex gap-1 items-center">
                  <TextInput
                    id="sg-cashback-percentage"
                    placeholder="SG Cashback Percentage"
                    value={sgCashbackPercentage.value || ''}
                    inputClassName="w-full"
                    onChange={(e) =>
                      sgCashbackPercentage.setValue(e.target.value)
                    }
                  />
                  <div>%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <button type="submit" className="ml-auto btn-primary">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
