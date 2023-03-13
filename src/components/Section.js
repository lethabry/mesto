export class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(cards) {
    cards.forEach(card => this._renderer(card));
  }

  addItemDown(card) {
    this._container.append(card);
  }

  addItemUp(card) {
    this._container.prepend(card);
  }
}