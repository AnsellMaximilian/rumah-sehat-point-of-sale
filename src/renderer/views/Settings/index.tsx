import TextInput from 'renderer/components/TextInput';

const Settings = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Settings</h1>
      <form className="flex flex-col gap-4">
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
      </form>
    </div>
  );
};

export default Settings;
