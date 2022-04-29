import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import Customer, { CustomerCreateData } from 'shared/types/Customer';

contextBridge.exposeInMainWorld('electron', {
  store: {
    get(val: string) {
      return ipcRenderer.sendSync('store-get', val);
    },
    set(property: string, val: string) {
      ipcRenderer.send('store-set', property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example', 'notify'];
      if (validChannels.includes(channel)) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
          func(...args);
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, subscription);

        return () => ipcRenderer.removeListener(channel, subscription);
      }

      return undefined;
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
  customers: {
    read(): Promise<Customer[]> {
      return ipcRenderer.invoke('customers:read');
    },
    delete(id: number): Promise<boolean> {
      return ipcRenderer.invoke('customers:delete', id);
    },
    create(customerData: CustomerCreateData): Promise<boolean> {
      return ipcRenderer.invoke('customers:create', customerData);
    },
  },
});
