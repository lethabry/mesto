const openPopupEditButton = document.querySelector('.profile__button_type_edit');
const popupEditProfile = document.querySelector('.popup-edit');
const closePopupEditButton = popupEditProfile.querySelector('.popup__button_type_close');
const formName = document.querySelector('.profile__title');
const formActivity = document.querySelector('.profile__subtitle');
const formProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const activityInput = formProfile.querySelector('.popup__input_type_activity');

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
// Show cards
const cardTemplate = document.querySelector('#cards-template').content;
const cardsList = document.querySelector('.places__cards');

// Open popupAdd
const openPopupAddButton = document.querySelector('.profile__button_type_add');
const popupAddCard = document.querySelector('.popup_type_add');
const closePopupAddButton = popupAddCard.querySelector('.popup__button_type_close');

// Add cards
const formCard = popupAddCard.querySelector('.popup__form');
const titleInput = formCard.querySelector('.popup__input_type_name');
const linkInput = formCard.querySelector('.popup__input_type_activity');

// Open popupImage
const popupImage = document.querySelector('.popup_type_card');
const modalImage = popupImage.querySelector('.popup__image');
const modalText = popupImage.querySelector('.popup__description');
const closePopupImageButton = popupImage.querySelector('.popup__button_type_close');

function togglePopupEditProfile() {
  popupEditProfile.classList.toggle('popup_active');
}

openPopupEditButton.addEventListener('click', function () {
  nameInput.value = formName.textContent;
  activityInput.value = formActivity.textContent;
  togglePopupEditProfile();
});

closePopupEditButton.addEventListener('click', togglePopupEditProfile);

function changeText(evt) {
  evt.preventDefault();
  formName.textContent = nameInput.value;
  formActivity.textContent = activityInput.value;
  togglePopupEditProfile();
}

formProfile.addEventListener('submit', changeText);

function deleteCard(evt) {
  const element = evt.target.closest('.places__card');
  element.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('active');
};

function showCards(element) {
  const cardElement = cardTemplate.querySelector('.places__card').cloneNode(true);
  cardElement.querySelector('.places__image').src = element.link;
  cardElement.querySelector('.places__image').alt = element.name;
  cardElement.querySelector('.places__title').textContent = element.name;
  cardElement.querySelector('.places__button_type_like').addEventListener('click', likeCard);
  cardElement.querySelector('.places__button_type_trash').addEventListener('click', deleteCard);
  cardsList.append(cardElement);
}

initialCards.forEach(showCards);

const cardElements = document.querySelectorAll('.places__card');

function openPopupImage(element) {
  element.querySelector('.places__image').addEventListener('click', function () {
    modalImage.src = element.querySelector('.places__image').src;
    modalImage.alt = element.querySelector('.places__title').textContent;
    modalText.textContent = element.querySelector('.places__title').textContent;
    popupImage.classList.toggle('popup_active');
  });
}

cardElements.forEach(openPopupImage);

function closePopupImage() {
  popupImage.classList.toggle('popup_active');
}

closePopupImageButton.addEventListener('click', closePopupImage);

function togglePopupAddCard() {
  popupAddCard.classList.toggle('popup_active');
}

openPopupAddButton.addEventListener('click', togglePopupAddCard);

closePopupAddButton.addEventListener('click', togglePopupAddCard);

function addCard(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.places__card').cloneNode(true);
  cardElement.querySelector('.places__image').src = linkInput.value;
  cardElement.querySelector('.places__image').alt = titleInput.value;
  cardElement.querySelector('.places__title').textContent = titleInput.value;
  cardElement.querySelector('.places__button_type_like').addEventListener('click', likeCard);
  cardElement.querySelector('.places__button_type_trash').addEventListener('click', deleteCard);
  cardsList.prepend(cardElement);
  togglePopupAddCard();
}

formCard.addEventListener('submit', addCard);