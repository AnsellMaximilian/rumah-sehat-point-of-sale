interface DrSecretIDProduct {
  id: number;

  name: string;

  priceRP: number;

  points: number;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface DrSecretIDProductCreateData {
  name: string;

  priceRP: number;

  points: number;
}

export default DrSecretIDProduct;
