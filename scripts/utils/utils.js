function openModalWindow(modalWindow) {
  document.addEventListener('keydown', closeOnKeydownEscape);
  modalWindow.addEventListener('click', closeOnClickOverlay);
  modalWindow.classList.add('popup_active');
}

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

function closeModalWindow(modalWindow) {
  document.removeEventListener('keydown', closeOnKeydownEscape);
  modalWindow.removeEventListener('click', closeOnClickOverlay);
  modalWindow.classList.remove('popup_active');
}

export { openModalWindow, closeModalWindow }