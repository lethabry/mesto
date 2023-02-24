export class FormValidator {
  constructor(formElement, validationConfig) {
    this._formElement = formElement;
    this._validationConfig = validationConfig;
  }

  _showError(inputElement) {
    this._errorMessage = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    this._errorMessage.textContent = inputElement.validationMessage;
    this._errorMessage.classList.add(this._validationConfig.errorClass)
  }

  _hideError(inputElement) {
    this._errorMessage = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    this._errorMessage.textContent = '';
    this._errorMessage.classList.remove(this._validationConfig.errorClass)
  }

  _checkValidation(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }

  _isAllInputsAreValidate() {
    return this._inputList.every(inputElement => {
      return inputElement.validity.valid;
    })
  }

  _switchButtonState() {
    if (!this._isAllInputsAreValidate()) {
      this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._switchButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkValidation(inputElement);
        this._switchButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }

  cleanInputs() {
    this._inputList.forEach(inputElement => {
      this._hideError(inputElement);
      inputElement.value = '';
    })
  }

  enableSubmitButton() {
    this._switchButtonState();
  }
}