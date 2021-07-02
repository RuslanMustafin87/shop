module.exports = function() {

	let modalContainer = document.querySelector('.modal');
	let modal = modalContainer.querySelector('.modal__window');
	let modalText = modalContainer.querySelector('.modal__text');
	let modalClose = modalContainer.querySelector('.modal__cross');

	this.start = (message) => {

		modal.style.transition = '.3s linear ';
		setTimeout(() => {
			modal.style.transform = 'translate(-50%, -50%) scale(1)';
		}, 100);
		modalContainer.style.display = 'block';
		modalText.innerHTML = message;

	};

	modalClose.addEventListener('click', () => {
		modalContainer.style.display = 'none';
		modal.style.transform = 'translate(-50%, -50%) scale(0)';
		modalText.innerHTML = '';
	});
};