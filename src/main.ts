import './scss/styles.scss';



import { apiProducts } from './utils/data';
import { Basket } from './components/base/Models/Basket';
import { Buyer } from './components/base/Models/Buyer';
import { ProductsCatalog } from './components/base/Models/ProductsCatalog';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { WebLarekApi } from './components/base/Communication/WebLarekApi';


// 1) Каталог товаров
const catalog = new ProductsCatalog();
console.log('--- Каталог ---');
catalog.setProducts(apiProducts.items);
console.log('Массив товаров из каталога:', catalog.getProducts());
console.log('Товар по id (первый):', catalog.getProductById(apiProducts.items[0]?.id));
catalog.setPreview(apiProducts.items[1]);
console.log('Товар для подробного отображения (preview):', catalog.getPreview());

// 2) Корзина
const basket = new Basket();
console.log('--- Корзина ---');
console.log('Корзина изначально:', basket.getItems());
basket.addItem(apiProducts.items[0]);
basket.addItem(apiProducts.items[1]);
console.log('После добавления 2 товаров:', basket.getItems());
console.log('Проверка наличия первого товара по id:', basket.hasItem(apiProducts.items[0].id));
console.log('Количество товаров:', basket.getItemsCount());
console.log('Сумма корзины:', basket.getTotalPrice());
basket.removeItem(apiProducts.items[0]);
console.log('После удаления первого товара:', basket.getItems());
basket.clear();
console.log('После очистки корзины:', basket.getItems());

// 3) Покупатель
const buyer = new Buyer();
console.log('--- Покупатель ---');
console.log('Ошибки валидации (пустая форма):', buyer.validate());
buyer.setData({ payment: 'online' });
console.log('Ошибки после выбора оплаты:', buyer.validate());
buyer.setData({ address: 'Москва, ул. Пушкина, д. 4' });
console.log('Ошибки после адреса:', buyer.validate());
buyer.setData({ email: 'test@example.com', phone: '+7 (900) 555-44-00' });
console.log('Ошибки после заполнения всех полей:', buyer.validate());
console.log('Данные покупателя:', buyer.getData());
buyer.clear();
console.log('После очистки данных покупателя:', buyer.getData(), buyer.validate());


const api = new Api(API_URL);
const webApi = new WebLarekApi(api);

webApi.getProducts()
  .then((items) => {
    console.log('--- Сервер: товары получены ---', items);

    // сохраняем в модель каталога
    catalog.setProducts(items);
    console.log('--- Модель каталога после загрузки с сервера ---', catalog.getProducts());
  })
  .catch((err) => {
    console.log('--- Ошибка загрузки товаров ---', err);
  });
