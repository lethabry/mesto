import { modalImage, modalText, popupImage} from "./utils/constants.js";
import { openModalWindow } from "./utils/utils.js";

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _like() {
    this._element
      .querySelector('.places__button_type_like')
      .classList
      .toggle('active');
  }

  _delete() {
    this._element.remove();
  }

  _openPopup() {
    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalText.textContent = this._name;
    openModalWindow(popupImage);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const image = this._element.querySelector('.places__image');

    this._element.querySelector('.places__button_type_like')
      .addEventListener('click', () => {
        this._like();
      });

    this._element.querySelector('.places__button_type_trash')
      .addEventListener('click', () => {
        this._delete();
      });

    image.addEventListener('click', () => {
      this._openPopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    const image = this._element.querySelector('.places__image');
    [image.src, image.alt] = [this._link, this._name];
    this._element.querySelector('.places__title').textContent = this._name;

    return this._element;
  }
}