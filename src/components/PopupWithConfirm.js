import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
  constructor(selector, handleFormDelete) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form')
    this._handleFormDelete = handleFormDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormDelete(this._idCard, this._element);
    })
  }

  open(data, card) {
    this._idCard = data._id;
    this._element = card;
    super.open();
  }
}