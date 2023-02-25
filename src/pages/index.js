import './index.css'

import {
  validationConfig,
  initialCards,
  buttonEditProfileOpen,
  formProfile,
  nameInput,
  activityInput,
  cardTemplateSelector,
  cardListSelector,
  buttonAddCardOpen,
  formCard,
  titleInput,
  linkInput
} from "../components/utils/constants.js";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

// create instances of class FormValidate
const profileFormValidate = new FormValidator(formProfile, validationConfig);
const cardFormValidate = new FormValidator(formCard, validationConfig);
// create instances of class Popup
const popupOpenImage = new PopupWithImage('.popup_type_card');
const popupProfile = new PopupWithForm('.popup_type_edit', changeUserData);
const popupCard = new PopupWithForm('.popup_type_add', createCard);
// create instance of class UserInfo
const profileInfo = new UserInfo({ userNameSelector: '.profile__title', userActivitSelector: '.profile__subtitle' });
// create instance of class Section
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, cardTemplateSelector, () => popupOpenImage.open(item.name, item.link));
    const cardElement = card.generateCard();
    cardsList.addItemDown(cardElement);
  }
}, cardListSelector);
cardsList.renderItems();
// Set EventListeners for Popups on submit and close popup
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupOpenImage.setEventListeners();
// Set EventListeners for formValidate
profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

buttonEditProfileOpen.addEventListener('click', () => {
  profileFormValidate.cleanInputs();
  const { name, activity } = profileInfo.getUserInfo();
  [nameInput.value, activityInput.value] = [name, activity];
  profileFormValidate.enableSubmitButton();
  popupProfile.open();
});

function changeUserData() {
  profileInfo.setUserInfo(nameInput.value, activityInput.value);
}

function createCard() {
  const [name, link] = [titleInput.value, linkInput.value];
  const card = new Card(name, link, cardTemplateSelector, () => popupOpenImage.open(name, link));
  const cardElement = card.generateCard();
  cardsList.addItemUp(cardElement);
}

buttonAddCardOpen.addEventListener('click', () => {
  cardFormValidate.cleanInputs();
  cardFormValidate.enableSubmitButton();
  popupCard.open();
});