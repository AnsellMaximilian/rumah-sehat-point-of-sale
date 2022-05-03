interface DrSecretSGProduct {
  id: number;

  name: string;

  priceSGD: number;

  points: number;

  deliveryFee: number;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface DrSecretSGProductCreateData {
  name: string;

  priceSGD: number;

  points: number;

  deliveryFee: number;
}

export default DrSecretSGProduct;
