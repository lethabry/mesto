export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector('.popup__button_type_close');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _handleClickOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close())
    this._popup.addEventListener('click', (evt) => this._handleClickOverlayClose(evt))
  }
}