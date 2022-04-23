interface Customer {
  id: number;

  name: string;

  phone: string;

  address: string | null;

  createdAt: Date;

  updatedAt: Date;
}

export default Customer;
