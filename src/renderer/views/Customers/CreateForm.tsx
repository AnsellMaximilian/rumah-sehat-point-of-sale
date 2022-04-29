import { useState } from 'react';
import { toast } from 'react-toastify';
import TextInput from 'renderer/components/TextInput';
import { CustomerCreateData } from 'shared/types/Customer';

interface Props {
  createCustomer: (customerData: CustomerCreateData) => Promise<void>;
}

const CreateForm = ({ createCustomer }: Props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error('Name or phone cannot be empty.');
    } else {
      createCustomer({ name, phone, address });
    }
  };

  return (
    <article>
      <header>
        <h1>Create Customer</h1>
      </header>
      <form onSubmit={onSubmit}>
        <TextInput
          label="Name"
          id="customer-name"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Phone"
          id="customer-phone"
          placeholder="Customer Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </article>
  );
};

export default CreateForm;
