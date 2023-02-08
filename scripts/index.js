import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { validationConfig, initialCards } from "./constants.js";

// Profile
const buttonEditProfileOpen = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfileClose = popupEditProfile.querySelector('.popup__button_type_close');
const formName = document.querySelector('.profile__title');
const formActivity = document.querySelector('.profile__subtitle');
const formProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const activityInput = formProfile.querySelector('.popup__input_type_activity');
// Show cards
const cardsList = document.querySelector('.places__cards');
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
const modalImage = popupImage.querySelector('.popup__image');
const modalText = popupImage.querySelector('.popup__description');
const buttonImageClose = popupImage.querySelector('.popup__button_type_close');
// FormValidate
const profileFormValidate = new FormValidator(formProfile, validationConfig);
const cardFormValidate = new FormValidator(formCard, validationConfig);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

function openModalWindow(modalWindow) {
  document.addEventListener('keydown', closeOnKeydownEscape);
  modalWindow.addEventListener('click', closeOnClickOverlay);
  modalWindow.classList.add('popup_active');
}

function closeModalWindow(modalWindow) {
  document.removeEventListener('keydown', closeOnKeydownEscape);
  modalWindow.removeEventListener('click', closeOnClickOverlay);
  modalWindow.classList.remove('popup_active');
}

buttonEditProfileOpen.addEventListener('click', () => {
  nameInput.value = formName.textContent;
  activityInput.value = formActivity.textContent;
  profileFormValidate.enableSubmitButton();
  openModalWindow(popupEditProfile);
});

buttonEditProfileClose.addEventListener('click', () => {
  profileFormValidate.cleanInputs();
  closeModalWindow(popupEditProfile);
})

function changeText(evt) {
  evt.preventDefault();
  formName.textContent = nameInput.value;
  formActivity.textContent = activityInput.value;
  closeModalWindow(popupEditProfile);
}

formProfile.addEventListener('submit', changeText);

initialCards.forEach(item => {
  const card = new Card(item.name, item.link, '#cards-template');
  const cardElement = card.generateCard();

  cardsList.append(cardElement);
})

function addCard(evt) {
  evt.preventDefault();

  const card = new Card(titleInput.value, linkInput.value, '#cards-template')
  const cardElement = card.generateCard();

  cardsList.prepend(cardElement);
  closeModalWindow(popupAddCard);
}

formCard.addEventListener('submit', addCard);

buttonImageClose.addEventListener('click', () => closeModalWindow(popupImage));

buttonAddCardOpen.addEventListener('click', () => {
  cardFormValidate.cleanInputs();
  cardFormValidate.enableSubmitButton();
  openModalWindow(popupAddCard);
});

buttonAddCardClose.addEventListener('click', () => {
  closeModalWindow(popupAddCard);
});

const closeOnClickOverlay = evt => {
  if (evt.target.classList.contains('popup')) {
    const modalWindow = document.querySelector('.popup_active');
    closeModalWindow(modalWindow);
  }
}

const closeOnKeydownEscape = evt => {
  if (evt.key === 'Escape') {
    const modalWindow = document.querySelector('.popup_active');
    closeModalWindow(modalWindow);
  };
};


export { modalImage, modalText, popupImage, openModalWindow };