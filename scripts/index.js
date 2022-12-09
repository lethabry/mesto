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
