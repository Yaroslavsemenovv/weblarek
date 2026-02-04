Назначение:
Интерфейс описывает данные покупателя, необходимые для оформления заказа.

Описание полей:
- payment — выбранный способ оплаты
- email — электронная почта покупателя
- phone — телефон покупателя
- address — адрес доставки


МОДЕЛИ ДАННЫХ

В приложении используются три модели данных, разделённые по зонам ответственности:
- каталог товаров;
- корзина;
- данные покупателя.


КАТАЛОГ ТОВАРОВ

Назначение и зона ответственности:
Класс отвечает за хранение всех товаров, полученных с сервера,
а также за хранение товара, выбранного для подробного отображения.

Поля класса:
- products: IProduct[]
  Хранит массив всех доступных товаров.
- preview: IProduct | null
  Хранит товар, выбранный для подробного отображения.

Методы:
- setProducts(products: IProduct[]): void
  Сохраняет массив товаров, полученный с сервера.

- getProducts(): IProduct[]
  Возвращает массив всех товаров.

- getProductById(id: string): IProduct | undefined
  Возвращает товар по его идентификатору.

- setPreview(product: IProduct): void
  Сохраняет товар для подробного отображения.

- getPreview(): IProduct | null
  Возвращает товар, выбранный для подробного отображения.


КОРЗИНА

Назначение и зона ответственности:
Класс отвечает за хранение товаров, выбранных пользователем для покупки,
а также за расчёты, связанные с корзиной.

Поля класса:
- items: IProduct[]
  Массив товаров, добавленных в корзину.

Методы:
- getItems(): IProduct[]
  Возвращает массив товаров в корзине.

- addItem(product: IProduct): void
  Добавляет товар в корзину.

- removeItem(product: IProduct): void
  Удаляет товар из корзины.

- clear(): void
  Очищает корзину.

- getTotalPrice(): number
  Возвращает общую стоимость товаров в корзине.

- getItemsCount(): number
  Возвращает количество товаров в корзине.

- hasItem(id: string): boolean
  Проверяет наличие товара в корзине по его идентификатору.


ПОКУПАТЕЛЬ

Назначение и зона ответственности:
Класс отвечает за хранение, обновление и валидацию данных покупателя,
которые вводятся при оформлении заказа.

Поля класса:
- payment: TPayment | null
  Выбранный способ оплаты.
- email: string
  Электронная почта покупателя.
- phone: string
  Телефон покупателя.
- address: string
  Адрес доставки.

Методы:
- setData(data: Partial<IBuyer>): void
  Сохраняет переданные данные покупателя.
  Позволяет обновлять отдельные поля без удаления ранее сохранённых значений.

- getData(): IBuyer
  Возвращает все данные покупателя.

- clear(): void
  Очищает все данные покупателя.

- validate(): Partial<Record<keyof IBuyer, string>>
  Выполняет валидацию данных покупателя.
  Поле считается валидным, если оно не пустое.
  Метод возвращает объект с ошибками, где ключ — имя поля,
  а значение — текст ошибки.

Пример результата валидации:
{
  payment: 'Не выбран вид оплаты',
  email: 'Укажите email'
}

Если объект пустой, значит все поля валидны.


СЛОЙ КОММУНИКАЦИИ

Для взаимодействия приложения с сервером «Веб-ларёк» используется отдельный
коммуникационный слой. Его задача — получение данных с сервера и отправка данных
на сервер. Коммуникационный слой не содержит логики отображения интерфейса и не
занимается хранением данных, а лишь передаёт их моделям данных.

Для реализации коммуникационного слоя используется отдельный класс, который
применяет композицию. В конструктор класса передаётся объект, реализующий
интерфейс IApi. Это позволяет использовать готовые методы get и post для выполнения
HTTP-запросов.

Назначение и зона ответственности класса:
- получение каталога товаров с сервера;
- отправка данных заказа на сервер.

Конструктор класса:
- constructor(api: IApi)
  - api: IApi — объект, реализующий интерфейс IApi и предоставляющий методы
    для выполнения HTTP-запросов (get и post).

Методы класса:
- getProducts(): Promise<IProduct[]>
- postOrder(order: IOrderRequest): Promise<IOrderResponse>


ПРЕДСТАВЛЕНИЯ

В приложении используются классы представления, отвечающие за отображение интерфейса
и работу с DOM. Классы представления не содержат бизнес-логики и не хранят данные.

GALLERY

Назначение и зона ответственности:
Класс отвечает за отображение каталога товаров.

Поля класса:
- container: HTMLElement
  DOM-контейнер галереи.

Методы:
- render(data: { catalog: HTMLElement[] }): void
  Отображает карточки товаров в галерее.

Конструктор:
- constructor(container: HTMLElement)


HEADER

Назначение и зона ответственности:
Класс отвечает за отображение шапки сайта и счётчика корзины.

Поля класса:
- counterElement: HTMLElement
- basketButtonElement: HTMLButtonElement
- events: IEvents

Методы:
- set counter(value: number): void

Конструктор:
- constructor(events: IEvents, container: HTMLElement)


MODAL

Назначение и зона ответственности:
Класс отвечает за отображение модальных окон приложения.

Поля класса:
- container: HTMLElement
- contentElement: HTMLElement
- closeButtonElement: HTMLButtonElement
- events: IEvents

Методы:
- open(content: HTMLElement): void
- close(): void

Конструктор:
- constructor(container: HTMLElement, events: IEvents)


BASKET

Назначение и зона ответственности:
Класс отвечает за отображение корзины пользователя.

Поля класса:
- container: HTMLElement
- itemsContainer: HTMLElement
- totalElement: HTMLElement
- orderButtonElement: HTMLButtonElement
- events: IEvents

Методы:
- render(data: { items: HTMLElement[]; total: number }): HTMLElement

Конструктор:
- constructor(container: HTMLElement, events: IEvents)


CARD

Назначение и зона ответственности:
Базовый класс карточки товара.

Поля класса:
- container: HTMLElement
- title: HTMLElement
- price: HTMLElement
- events: IEvents

Методы:
- renderBase(product: IProduct): void
- render(product: IProduct): HTMLElement

Конструктор:
- constructor(events: IEvents, template: string)


CARD CATALOG

Назначение и зона ответственности:
Карточка товара в каталоге.

Поля класса:
- category: HTMLElement
- image: HTMLImageElement

Методы:
- render(product: IProduct): HTMLElement

Конструктор:
- constructor(events: IEvents, onClick: () => void)


CARD PREVIEW

Назначение и зона ответственности:
Карточка предпросмотра товара.

Поля класса:
- description: HTMLElement
- actionButtonElement: HTMLButtonElement
- image: HTMLImageElement
- category: HTMLElement

Методы:
- render(product: IProduct): HTMLElement
- setButtonText(text: string): void
- setButtonDisabled(disabled: boolean): void

Конструктор:
- constructor(events: IEvents, onButtonClick: () => void)


CARD BASKET

Назначение и зона ответственности:
Карточка товара в корзине.

Поля класса:
- indexElement: HTMLElement
- removeButtonElement: HTMLButtonElement

Методы:
- render(product: IProduct & { index?: number }): HTMLElement

Конструктор:
- constructor(events: IEvents, onRemoveClick: () => void)


FORM

Назначение и зона ответственности:
Базовый класс формы.

Поля класса:
- container: HTMLElement
- submitButtonElement: HTMLButtonElement
- errorsElement: HTMLElement
- events: IEvents

Методы:
- setErrors(message: string): void
- setSubmitEnabled(enabled: boolean): void
- onSubmit(): void

Конструктор:
- constructor(container: HTMLElement, events: IEvents)


ORDER FORM

Назначение и зона ответственности:
Форма оформления заказа.

Поля класса:
- addressInputElement: HTMLInputElement
- paymentButtons: HTMLButtonElement[]

Методы:
- setAddress(value: string): void
- togglePaymentButtonStatus(value: TPayment): void
- onSubmit(): void

Конструктор:
- constructor(container: HTMLElement, events: IEvents)


PAYMENT FORM

Назначение и зона ответственности:
Форма ввода контактных данных.

Поля класса:
- emailInputElement: HTMLInputElement
- phoneInputElement: HTMLInputElement

Методы:
- setEmail(value: string): void
- setPhone(value: string): void
- onSubmit(): void

Конструктор:
- constructor(container: HTMLElement, events: IEvents)


SUCCESS

Назначение и зона ответственности:
Экран успешного оформления заказа.

Поля класса:
- totalElement: HTMLElement
- closeButtonElement: HTMLButtonElement
- events: IEvents

Методы:
- set total(value: number): void

Конструктор:
- constructor(container: HTMLElement, events: IEvents)


ПРЕЗЕНТЕР

Презентер связывает модели и представления приложения,
управляет состоянием и реагирует на события.

Все обработчики событий находятся в презентере (main.ts).
Презентер получает данные от моделей и передаёт их в представления.
