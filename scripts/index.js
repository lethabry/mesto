const buttonEditProfileOpen = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfileClose = popupEditProfile.querySelector('.popup__button_type_close');
const formName = document.querySelector('.profile__title');
const formActivity = document.querySelector('.profile__subtitle');
const formProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const activityInput = formProfile.querySelector('.popup__input_type_activity');
// Show cards
const cardTemplate = document.querySelector('#cards-template').content;
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

function openModalWindow(modalWindow){
  modalWindow.classList.add('popup_active');
}

function closeModalWindow(modalWindow){
  modalWindow.classList.remove('popup_active');
}

buttonEditProfileOpen.addEventListener('click', () => {
  nameInput.value = formName.textContent;
  activityInput.value = formActivity.textContent;
  openModalWindow(popupEditProfile);
});

buttonEditProfileClose.addEventListener('click', () => closeModalWindow(popupEditProfile));

function changeText(evt) {
  evt.preventDefault();
  formName.textContent = nameInput.value;
  formActivity.textContent = activityInput.value;
  closeModalWindow(popupEditProfile);
}

formProfile.addEventListener('submit', changeText);

function deleteCard(evt) {
  const element = evt.target.closest('.places__card');
  element.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('active');
};

function openPopupImage(evt) {
  const element = evt.target.closest('.places__card');
  modalImage.src = element.querySelector('.places__image').src;
  modalImage.alt = element.querySelector('.places__title').textContent;
  modalText.textContent = element.querySelector('.places__title').textContent;
  openModalWindow(popupImage);
}

function renderCard(link, name) {
  const cardElement = cardTemplate.querySelector('.places__card').cloneNode(true);
  cardElement.querySelector('.places__image').src = link;
  cardElement.querySelector('.places__image').alt = name;
  cardElement.querySelector('.places__title').textContent = name;
  cardElement.querySelector('.places__button_type_like').addEventListener('click', likeCard);
  cardElement.querySelector('.places__button_type_trash').addEventListener('click', deleteCard);
  cardElement.querySelector('.places__image').addEventListener('click', openPopupImage);
  return cardElement;
}

function showCards(element) {
  const cardElement = renderCard(element.link, element.name);
  cardsList.append(cardElement);
}

function addCard(evt) {
  evt.preventDefault();
  const cardElement = renderCard(linkInput.value, titleInput.value);
  cardsList.prepend(cardElement);
  closeModalWindow(popupAddCard);
}

formCard.addEventListener('submit', addCard);

initialCards.forEach(showCards);

buttonImageClose.addEventListener('click', () => closeModalWindow(popupImage));

buttonAddCardOpen.addEventListener('click', () => openModalWindow(popupAddCard));

buttonAddCardClose.addEventListener('click', () => closeModalWindow(popupAddCard));