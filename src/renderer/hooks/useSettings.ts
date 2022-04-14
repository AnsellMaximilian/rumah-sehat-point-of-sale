import { useEffect, useState } from 'react';

const useSettings = (key: string) => {
  const [value, setValue] = useState<any | null>(null);
  useEffect(() => {
    setValue(window.electron.store.get(key));
  }, [key]);

  const save = () => {
    window.electron.store.set(key, value);
  };

  return {
    value,
    setValue,
    save,
  };
};

export default useSettings;
