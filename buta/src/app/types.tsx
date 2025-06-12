export type CustomError = {
  status?: number;
  message?: string;
};

export type NewUser = {
  email: string;
  password: string;
  gender: string;
  Name: string;
  phone: string;
  terms: boolean;
  marketing: boolean;
};

export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
};
