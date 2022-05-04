import TextInput from 'renderer/components/TextInput';
import { useEffect, useState } from 'react';
import SelectInput from 'renderer/components/SelectInput';
import Customer from 'shared/types/Customer';

const SGInvoiceForm = () => {
  const [date, setDate] = useState('');
  const [customerId, setCustomerId] = useState<number | undefined>(undefined);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    (async () => {
      const allCustomers = await window.electron.customers.read();
      setCustomers(allCustomers);
      if (allCustomers.length > 0) setCustomerId(allCustomers[0].id);
    })();
  }, []);

  return (
    <div>
      <h1>Create Singaporean Form</h1>
      <div>
        <form className="grid grid-cols-12 gap-4">
          <SelectInput
            label="Customer"
            id="invoice-customer"
            containerClassName="col-span-8"
            inputClassName="w-full"
            value={customerId}
            onChange={(e) => setCustomerId(Number(e.target.value))}
          >
            {customers.map((cus) => (
              <option key={cus.id} value={cus.id}>
                {cus.name}
              </option>
            ))}
          </SelectInput>
          <TextInput
            label="Date"
            id="invoice-date"
            placeholder="Invoice Date"
            containerClassName="col-span-4"
            inputClassName="w-full"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default SGInvoiceForm;
