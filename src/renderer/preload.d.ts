import Customer, { CustomerCreateData } from '../shared/types/Customer';

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
      ipcRenderer: {
        myPing(): void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
      customers: {
        read(): Promise<Customer[]>;
        delete(id: number): Promise<boolean>;
        create(customerData: CustomerCreateData): Promise<boolean>;
        update(id: number, customerData: CustomerCreateData): Promise<boolean>;
      };
    };
  }
}

export {};
