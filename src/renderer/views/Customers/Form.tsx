import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TextInput from 'renderer/components/TextInput';
import Customer, { CustomerCreateData } from 'shared/types/Customer';

interface Props {
  createCustomer?: (customerToEdit: CustomerCreateData) => Promise<void>;
  updateCustomer?: (
    id: number,
    customerData: CustomerCreateData
  ) => Promise<void>;
  customerToEdit?: Customer;
}

const Form = ({ createCustomer, updateCustomer, customerToEdit }: Props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error('Name or phone cannot be empty.');
    } else if (updateCustomer && customerToEdit) {
      updateCustomer(customerToEdit.id, { name, phone, address });
    } else if (createCustomer) {
      createCustomer({ name, phone, address });
    }
  };

  useEffect(() => {
    if (customerToEdit) {
      setName(customerToEdit.name);
      setAddress(customerToEdit.address || '');
      setPhone(customerToEdit.phone);
    }
  }, [customerToEdit]);

  return (
    <article>
      <form onSubmit={onSubmit} className="p-4 grid grid-cols-12 gap-2">
        <TextInput
          label="Name"
          id="customer-name"
          placeholder="Customer Name"
          containerClassName="col-span-6"
          inputClassName="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Phone"
          id="customer-phone"
          placeholder="Customer Phone Number"
          containerClassName="col-span-6"
          inputClassName="w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextInput
          label="Address"
          id="customer-address"
          placeholder="Customer Address"
          containerClassName="col-span-12"
          inputClassName="w-full"
          textarea
          value={address}
          onChangeTextArea={(e) => setAddress(e.target.value)}
        />
        <div className="flex col-span-12">
          <button type="submit" className="btn-primary ml-auto">
            Create
          </button>
        </div>
      </form>
    </article>
  );
};

Form.defaultProps = {
  customerToEdit: undefined,
  updateCustomer: undefined,
  createCustomer: undefined,
};

export default Form;
