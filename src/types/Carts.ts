export type CartsType = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  thumbnailUrl: string;
};

export type CartsSelectedType = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  thumbnailUrl: string;
  isChecked: boolean;
};

export type CartsResponseType = {
  data: CartsType[];
  status: number;
};

export type AddCartsResponseType = {
  data: CartsType;
  status: number;
};

export type DetailCartsResponseType = {
  data: CartsType;
  status: number;
};

export type GetDetailCartType = {
  id: string;
};

export type PayloadAddCart = {
  quantity: number;
};

export type PayloadSubmitType = {
  id: number;
  orders: CartsSelectedType[];
};
