import { useEffect, useState } from 'react';
import TextInput from 'renderer/components/TextInput';

const Settings = () => {
  const [appName, setAppName] = useState('');

  useEffect(() => {
    setAppName(window.electron.store.get('app-name') || '');
  }, []);

  const handleSave: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { set } = window.electron.store;
    set('app-name', appName);
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
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold pb-2 border-b-2 border-primary mb-2">
            Database
          </h2>
          <div className="grid grid-cols-12">
            <TextInput
              label="Database Name"
              id="db-name"
              placeholder="Database Name"
              containerClassName="col-span-12 md:col-span-4"
            />
            <TextInput
              label="Database User"
              id="db-user"
              placeholder="Database User"
              containerClassName="col-span-12 md:col-span-4"
            />
            <TextInput
              label="Database Port"
              id="db-port"
              placeholder="Database Port"
              containerClassName="col-span-12 md:col-span-4"
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn-primary">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
