import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);

    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button_type_save');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }

  close() {
    this._form.reset();
    super.close();
  }
}