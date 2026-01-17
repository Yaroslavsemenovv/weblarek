export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

/** Способ оплаты */
export type TPayment = 'online' | 'cash';

/** Товар */
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

/** Покупатель */
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

/** Ответ сервера на GET /product/ */
export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

/** Тело запроса на POST /order/ */
export type IOrderRequest = IBuyer & {
  total: number;
  items: string[];
};

/** Ответ сервера на POST /order/ */
export interface IOrderResponse {
  id: string;
  total: number;
}
