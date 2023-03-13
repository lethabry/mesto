import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._image = this._popup.querySelector('.popup__image');
    this._name = this._popup.querySelector('.popup__description');
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._name.textContent = data.name;

    super.open();
  }
}