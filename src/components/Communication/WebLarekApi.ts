import type { IApi, IOrderRequest, IOrderResponse, IProduct, IProductsResponse } from '../../types';

export class WebLarekApi {
  constructor(private api: IApi) {}

  /** GET /product/ -> возвращает массив товаров */
  getProducts(): Promise<IProduct[]> {
    return this.api
      .get<IProductsResponse>('/product/')
      .then((data) => data.items);
  }

  /** POST /order/ -> отправляет заказ и возвращает ответ сервера */
  postOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order', order);
  }
}
