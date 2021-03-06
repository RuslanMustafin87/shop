
let modalContainer = document.createElement('div');
let modal = document.createElement('div');
let modalText = document.createElement('div');
let modalClose = document.createElement('button');

modalContainer.classList.add('modal');
modal.classList.add('modal__window');
modalText.classList.add('modal__text');
modalClose.classList.add('modal__cross');

// eslint-disable-next-line no-undef
document.body.prepend(modalContainer);
modalContainer.append(modal);
modal.append(modalClose);
modal.append(modalText);

modalClose.addEventListener('click', () => {
	modalContainer.style.display = 'none';
	modal.style.transform = 'translate(-50%, -50%) scale(0)';
	modalText.innerHTML = '';
});

class Modal{

	start(message){

		modal.style.transition = '.3s linear ';
		setTimeout(() => {
			modal.style.transform = 'translate(-50%, -50%) scale(1)';
		}, 100);
		modalContainer.style.display = 'block';
		modalText.innerHTML = message;
	}
}

export default Modal;