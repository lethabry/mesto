const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

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

// Profile
const buttonEditProfileOpen = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfileClose = popupEditProfile.querySelector('.popup__button_type_close');
const formProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const activityInput = formProfile.querySelector('.popup__input_type_activity');
// Show cards
const cardTemplateSelector = '#cards-template';
const cardListSelector = '.places__cards';
// Open popupAdd
const buttonAddCardOpen = document.querySelector('.profile__button_type_add');
const popupAddCard = document.querySelector('.popup_type_add');
const buttonAddCardClose = popupAddCard.querySelector('.popup__button_type_close');
// Add cards
const formCard = popupAddCard.querySelector('.popup__form');
const titleInput = formCard.querySelector('.popup__input_type_name');
const linkInput = formCard.querySelector('.popup__input_type_activity');
// Open popupImage
const popupImage = document.querySelector('.popup_type_card');
const buttonImageClose = popupImage.querySelector('.popup__button_type_close');

export {
  validationConfig,
  initialCards,
  buttonEditProfileOpen,
  buttonEditProfileClose,
  formProfile,
  nameInput,
  activityInput,
  cardTemplateSelector,
  cardListSelector,
  buttonAddCardOpen,
  buttonAddCardClose,
  formCard,
  titleInput,
  linkInput,
  buttonImageClose,
  popupImage};