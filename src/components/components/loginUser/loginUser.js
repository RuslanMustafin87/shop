const loginUser = document.getElementById('login-user-admin');
const buttonCloseLoginUser = document.getElementById('cross-close-login-user');
const loginUserError = document.getElementById('login-user-error');
const formLoginUser = document.forms.formLoginUser;

// функция удаления параметра урл с сообщением ошибки
function delUrlParamMsg() {
	let url = new URL(document.location.href);

	url.searchParams.forEach((value, name) => {
		if (name === 'id') return;
		url.searchParams.delete(name);
	});

	window.history.replaceState(null, null, url.toString());
}

buttonCloseLoginUser.onclick = function() {
	loginUser.style.display = 'none';
	loginUserError.innerHTML = '';

	delUrlParamMsg();
};

formLoginUser.email.onfocus = function() {
	loginUserError.innerHTML = '';
};

formLoginUser.password.onfocus = function() {
	loginUserError.innerHTML = '';
};

export function showLoginUserWindow() {
	loginUser.style.display = 'block';
}

export function showLoginUserWindowError(err) {
	loginUser.style.display = 'block';
	loginUserError.innerHTML = err;

	delUrlParamMsg();
}