import Store from 'electron-store';
import { ipcMain } from 'electron';

const store = new Store();

const setupStoreListeners = () => {
  ipcMain.on('store-get', async (event, val) => {
    event.returnValue = store.get(val);
  });
  ipcMain.on('store-set', async (event, key, val) => {
    store.set(key, val);
  });
};

export default setupStoreListeners;
