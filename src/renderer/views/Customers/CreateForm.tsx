import { useState } from 'react';
import TextInput from 'renderer/components/TextInput';

const CreateForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  return (
    <article>
      <header>
        <h1>Create Customer</h1>
      </header>
      <form>
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
