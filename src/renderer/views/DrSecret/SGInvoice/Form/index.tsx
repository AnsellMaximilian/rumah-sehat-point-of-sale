import TextInput from 'renderer/components/TextInput';
import { useState } from 'react';

const SGInvoiceForm = () => {
  const [date, setDate] = useState('');

  return (
    <div>
      <h1>Create Singaporean Form</h1>
      <div>
        <form>
          <TextInput
            label="Date"
            id="invoice-date"
            placeholder="Invoice Date"
            containerClassName="col-span-6"
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
