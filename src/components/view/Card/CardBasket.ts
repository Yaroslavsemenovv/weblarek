import { IProduct } from "../../../types";
import { Component } from "../../base/Component";
import { ensureElement, cloneTemplate } from "../../../utils/utils"  
import { IEvents } from "../../base/Events";

export class CardBasket extends Component<IProduct & { index?: number }> {
    protected price: HTMLElement
    protected title: HTMLElement
    protected cardIndexElement: HTMLElement
    protected cardButtonRemoveElement: HTMLButtonElement

    constructor(protected events: IEvents, onRemoveClick: () => void) {
     super(cloneTemplate<HTMLElement>('#card-basket'))
      this.price = ensureElement<HTMLElement>('.card__price', this.container)
      this.title = ensureElement<HTMLElement>('.card__title', this.container)
      this.cardIndexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
      this.cardButtonRemoveElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)
      this.cardButtonRemoveElement.addEventListener('click', onRemoveClick)
    }

    render(product: IProduct & { index?: number }): HTMLElement {
      this.title.textContent = product.title
      this.price.textContent = product.price ? `${product.price} синапсов` : 'Бесценно'
      this.cardIndexElement.textContent = String((product.index || 0) + 1)
      return this.container
    }
}