export class Card {
  constructor(data, templateSelector, userId, handleCardClick, handleCardDelete, handleCardPutLike) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._isOwner = data.owner._id === this._userId;
    this._likes = data.likes;

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardPutLike = handleCardPutLike;
  }

  isLiked() {
    return this._likes.some(user => user._id === this._userId);
  }

  _activeLikeButton() {
    this._element
      .querySelector('.places__button_type_like')
      .classList
      .add('active');
  }

  _inactiveLikeButton() {
    this._element
      .querySelector('.places__button_type_like')
      .classList
      .remove('active');
  }

  _handleButtonLikeState() {
    if (this.isLiked()) {
      this._activeLikeButton();
    }
    else {
      this._inactiveLikeButton();
    }
  }

  delete() {
    this._element.remove();
  }

  _removeDeleteButton() {
    this._deleteButton = this._element.querySelector('.places__button_type_trash');
    if (!this._isOwner) {
      this._deleteButton.remove();
    }
  }

  showLikesCounter(likes) {
    this._likes = likes;
    this._likesCounter = this._element.querySelector('.places__counter');
    if (this._likes.length > 0) {
      this._likesCounter.textContent = this._likes.length;
      this._likesCounter.classList.add('places__counter_active');
    }
    else {
      this._likesCounter.textContent = '';
      this._likesCounter.classList.remove('places__counter_active');
    }

    this._handleButtonLikeState();
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
        this._handleCardPutLike();
      });

    this._element.querySelector('.places__button_type_trash')
      .addEventListener('click', () => {
        this._handleCardDelete();
      });

    image.addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();
    this._removeDeleteButton();
    this.showLikesCounter(this._likes);
    const image = this._element.querySelector('.places__image');
    [image.src, image.alt] = [this._link, this._name];
    this._element.querySelector('.places__title').textContent = this._name;

    return this._element;
  }
}