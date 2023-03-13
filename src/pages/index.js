import './index.css'

import {
  validationConfig,
  buttonEditProfileOpen,
  formProfile,
  nameInput,
  activityInput,
  cardTemplateSelector,
  cardListSelector,
  buttonAddCardOpen,
  formCard,
  titleInput,
  linkInput,
  buttonChangeAvatar,
  formAvatar,
  avatarLink
} from "../components/utils/constants.js";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';

// create instances of class FormValidate
const profileFormValidate = new FormValidator(formProfile, validationConfig);
const cardFormValidate = new FormValidator(formCard, validationConfig);
const avatarFormValidate = new FormValidator(formAvatar, validationConfig);
// create instances of class Popup
const popupOpenImage = new PopupWithImage('.popup_type_card');
const popupProfile = new PopupWithForm('.popup_type_edit', changeUserData);
const popupCard = new PopupWithForm('.popup_type_add', createCard);
const popupAvatar = new PopupWithForm('.popup_type_avatar', changeUserAvatar);
// create instance of class UserInfo
const profileInfo = new UserInfo({ userNameSelector: '.profile__title', userActivitSelector: '.profile__subtitle', userAvatarSelector: '.profile__avatar' });
// create instance of class PopupWithConfirm
const popupConfirmDelete = new PopupWithConfirm('.popup_type_delete', deleteCard);

let userId;
// create instance of class Section
const cardsList = new Section({
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, userId, () => popupOpenImage.open(item), () => popupConfirmDelete.open(item, card), () => handleButtonLike(item, card));
    const cardElement = card.generateCard();
    cardsList.addItemDown(cardElement);
  }
}, cardListSelector);
// Set EventListeners for Popups on submit and close popup
popupConfirmDelete.setEventListeners();
popupAvatar.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupOpenImage.setEventListeners();
// Set EventListeners for formValidate
profileFormValidate.enableValidation();
cardFormValidate.enableValidation();
avatarFormValidate.enableValidation();
// crearte instance of class Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61', headers: {
    authorization: '06fabed3-38bf-475b-8006-62678a9239b6',
    'Content-Type': 'application/json'
  }
})

// Render cards and userData from server
Promise.all([api.getCards(), api.getCurrentUser()])
  .then(([cards, userData]) => {
    userId = userData._id;
    cardsList.renderItems(cards);
    profileInfo.setUserInfo(userData.name, userData.about);
    profileInfo.setUserAvatar(userData.avatar);
  })
  .catch(err => console.log(`Error: ${err.status}`))

buttonChangeAvatar.addEventListener('click', openPopupAvatar)
buttonEditProfileOpen.addEventListener('click', openPopupEditProfile);
buttonAddCardOpen.addEventListener('click', openPopupAddCard);

function openPopupAvatar(){
  avatarFormValidate.cleanInputs();
  avatarFormValidate.enableSubmitButton();
  popupAvatar.open();
}

function openPopupEditProfile(){
  profileFormValidate.cleanInputs();
  const { name, activity } = profileInfo.getUserInfo();
  [nameInput.value, activityInput.value] = [name, activity];
  profileFormValidate.enableSubmitButton();
  popupProfile.open();
}

function openPopupAddCard(){
  cardFormValidate.cleanInputs();
  cardFormValidate.enableSubmitButton();
  popupCard.open();
}

function changeUserData() {
  popupProfile.renderLoading(true);
  api.changeUserData(nameInput.value, activityInput.value)
    .then(userData => {
      profileInfo.setUserInfo(userData.name, userData.about);
      popupProfile.close();
    })
    .catch(err => console.log(`Error: ${err.status}`))
    .finally(() => popupProfile.renderLoading(false));
}

function createCard() {
  api.addNewCard(titleInput.value, linkInput.value)
    .then(data => {
      userId = data.owner._id;
      const card = new Card(data, cardTemplateSelector, userId, () => popupOpenImage.open(data), () => popupConfirmDelete.open(data, card), () => handleButtonLike(data, card));
      const cardElement = card.generateCard();
      cardsList.addItemUp(cardElement);
      popupCard.close();
    })
    .catch(err => console.log(`Error: ${err.status}`))
}

function deleteCard(data, card) {
  api.deleteCard(data)
    .then(data => {
      card.delete(data);
      popupConfirmDelete.close();
    })
    .catch(err => console.log(`Error: ${err.status}`));
}

function handleButtonLike(data, card) {
  if (!card.isLiked()) {
    api.putLike(data._id)
      .then(data => card.showLikesCounter(data.likes))
      .catch(err => console.log(`Error: ${err.status}`))
  }
  else {
    api.deleteLike(data._id)
      .then(data => card.showLikesCounter(data.likes))
      .catch(err => console.log(`Error: ${err.status}`))
  }
}

function changeUserAvatar() {
  popupAvatar.renderLoading(true);
  api.changeAvatar(avatarLink.value)
    .then(data => {
      profileInfo.setUserAvatar(data.avatar);
      popupAvatar.close();
    })
    .catch(err => console.log(`Error: ${err.status}`))
    .finally(() => popupAvatar.renderLoading(false));
}