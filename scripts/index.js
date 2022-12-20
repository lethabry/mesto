const openPopupButton = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__button_type_close');
const formName = document.querySelector('.profile__title');
const formActivity = document.querySelector('.profile__subtitle');
const formProfile = popup.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const activityInput = formProfile.querySelector('.popup__input_type_activity');

openPopupButton.addEventListener('click', function () {
  nameInput.value = formName.textContent;
  activityInput.value = formActivity.textContent;
  popup.classList.add('popup_active');
});

function closePopup() {
  popup.classList.remove('popup_active');
}

closePopupButton.addEventListener('click', closePopup);

function changeText(evt) {
  evt.preventDefault();
  formName.textContent = nameInput.value;
  formActivity.textContent = activityInput.value;
  closePopup();
}

formProfile.addEventListener('submit', changeText);

// Задание 1. При загрузке сайта js отображает картинки из массива в секцию places

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#cards-template').content;
const cardsList = document.querySelector('.places__cards');

initialCards.forEach(function (element){
  const cardElement = cardTemplate.querySelector('.places__card').cloneNode(true);
  cardElement.querySelector('.places__image').src = element.link;
  cardElement.querySelector('.places__title').textContent = element.name;
  cardsList.prepend(cardElement);
});