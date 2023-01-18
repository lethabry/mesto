const selectorClass = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_type_save',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const showError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkValidation = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, selectorClass);
  } else {
    hideError(formElement, inputElement, selectorClass);
  }
};

const isAllInputsAreValide = (inputList) => {
  return inputList.every(inputElement => {
    if (!inputElement.validity.valid) {
      return false;
    }
    else {
      return true;
    }
  })
};

const switchButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
  if (!isAllInputsAreValide(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, { inputSelector, submitButtonSelector }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  switchButtonState(inputList, buttonElement, selectorClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidation(formElement, inputElement, selectorClass);
      switchButtonState(inputList, buttonElement, selectorClass);
    });
  });
};

const enableValidation = (formElement, { formSelector, ...rest }) => {
  setEventListeners(formElement, rest);
};

const cleanInputs = (formElement, { inputSelector }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    hideError(formElement, inputElement, selectorClass);
    inputElement.value = '';
  });
};