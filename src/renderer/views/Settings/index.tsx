import { toast } from 'react-toastify';
import TextInput from 'renderer/components/TextInput';
import useSettings from 'renderer/hooks/useSettings';

const Settings = () => {
  const appName = useSettings('app-name');
  const dbUser = useSettings('db-user');
  const dbPort = useSettings('db-port');
  const dbName = useSettings('db-name');

  const handleSave: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    appName.save();
    dbName.save();
    dbPort.save();
    dbUser.save();
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
