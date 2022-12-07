const openPopupButton = document.querySelector('.profile__button_edit');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__button_close');

openPopupButton.addEventListener('click', function () {
    popup.classList.add('popup_active');
});

closePopupButton.addEventListener('click', function() {
    popup.classList.remove('popup_active');
});

const formProfile = popup.querySelector('.popup__content');
const nameInput = formProfile.querySelector('.popup__input_name');
const activityInput = formProfile.querySelector('.popup__input_activity');
const buttonSave =  formProfile.querySelector('.popup__button_save');

function changeText(evt){
    evt.preventDefault();
    a = nameInput.value;
    b = activityInput.value;
    document.querySelector('.profile__title').textContent = a;
    document.querySelector('.profile__subtitle').textContent = b;
    popup.classList.remove('popup_active');
}

buttonSave.addEventListener('click', changeText);