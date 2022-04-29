interface Customer {
  id: number;

  name: string;

  phone: string;

  address: string | null;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface CustomerCreateData {
  name: string;

  phone: string;

  address?: string;
}

export default Customer;
