// const buttonSign = document.getElementById('button-sign');
const signBlock = document.getElementById('sign-block');
const signSuccessfully = document.getElementById('sign-successfully');
const buttonCrossClose = document.getElementById('sign-cross-close');
const signError = document.getElementById('sign-error');
const formSign = document.forms.formSign;

// функция удаления параметра урл с сообщением ошибки
function delUrlParamMsg() {
	let url = document.location.href;
	let newUrl = url.slice(0, url.indexOf('?'));
	window.history.replaceState(null, null, newUrl);
}

buttonCrossClose.onclick = function() {
	signSuccessfully.style.display = 'none';
	signBlock.style.display = 'none';
	signError.innerHTML = '';

	delUrlParamMsg();
};

formSign.name.onfocus = function() {
	signError.innerHTML = '';
};

formSign.email.onfocus = function() {
	signError.innerHTML = '';
};

formSign.password.onfocus = function() {
	signError.innerHTML = '';
};

export function showSignWindow() {
	// signSuccessfully.hidden = true;
	signBlock.style.display = 'block';
}

export function showSignWindowError(err) {
	signBlock.style.display = 'block';
	signError.innerHTML = err;

	delUrlParamMsg();
}

export function showSignWindowSuccessfully(){
	signBlock.style.display = 'block';
	signSuccessfully.style.display = 'flex';
}