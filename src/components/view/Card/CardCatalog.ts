import { Card } from "./Card";
import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";

export class CardCatalog extends Card {

  constructor(protected events: IEvents, onClick: () => void) {
    super(events, '#card-catalog')

    this.container.addEventListener('click', onClick)
  } 

  render(product: IProduct): HTMLElement {
    this.renderBase(product)
    return this.container
  } 
}