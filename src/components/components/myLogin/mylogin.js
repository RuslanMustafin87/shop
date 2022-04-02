const loginAdmin = document.getElementById('login-admin');
const buttonCrossClose = document.getElementById('cross-close');
const loginError = document.getElementById('login-error');
const formLogin = document.forms.formLogin;

// функция удаления параметра урл с сообщением ошибки
function delUrlParamMsg() {
	let url = document.location.href;
	let newUrl = url.slice(0, url.indexOf('?'));
	window.history.replaceState(null, null, newUrl);
}

buttonCrossClose.onclick = function() {
	loginAdmin.style.display = 'none';
	loginError.innerHTML = '';

	delUrlParamMsg();
};

formLogin.email.onfocus = function() {
	loginError.innerHTML = '';
};

formLogin.password.onfocus = function() {
	loginError.innerHTML = '';
};

export function showLoginWindow() {
	loginAdmin.style.display = 'block';
}

export function showLoginWindowError(err) {
	loginAdmin.style.display = 'block';
	loginError.innerHTML = err;

	delUrlParamMsg();
}