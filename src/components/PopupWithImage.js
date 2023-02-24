import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);

    this._image = this._popup.querySelector('.popup__image');
    this._name = this._popup.querySelector('.popup__description');
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;

    super.open();
  }
}