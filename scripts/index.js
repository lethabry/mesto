import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { validationConfig, initialCards, popupImage } from "./utils/constants.js";
import { openModalWindow, closeModalWindow } from "./utils/utils.js";

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
const buttonImageClose = popupImage.querySelector('.popup__button_type_close');
// FormValidate
const profileFormValidate = new FormValidator(formProfile, validationConfig);
const cardFormValidate = new FormValidator(formCard, validationConfig);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

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

function createCard(name, link, templateSelector) {
  const card = new Card(name, link, templateSelector);
  const cardElement = card.generateCard()
  return cardElement;
}

initialCards.forEach(item => {
  const cardElement = createCard(item.name, item.link, '#cards-template');
  cardsList.append(cardElement);
})

function addCard(evt) {
  evt.preventDefault();

  const cardElement = createCard(titleInput.value, linkInput.value, '#cards-template')
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