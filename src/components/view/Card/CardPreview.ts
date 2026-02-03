import { ensureElement } from "../../../utils/utils"
import { IEvents } from "../../base/Events";
import { Card } from "./Card"; 
import { IProduct } from "../../../types";

export class CardPreview extends Card {
  protected description: HTMLElement
  protected cardButtonElement: HTMLButtonElement

  constructor(protected events: IEvents, onButtonClick: () => void) {
    super(events, '#card-preview')
    this.description = ensureElement<HTMLElement>('.card__text', this.container)
    this.cardButtonElement = ensureElement<HTMLButtonElement>('.card__button', this.container)
    this.cardButtonElement.addEventListener('click', onButtonClick)
  }

  render(product: IProduct): HTMLElement {
    this.renderBase(product)
    this.description.textContent = product.description
    return this.container
  }
  
  setButtonText(text: string): void {
    this.cardButtonElement.textContent = text
  }

  setButtonDisabled(disabled: boolean): void {
    this.cardButtonElement.disabled = disabled
  }
}