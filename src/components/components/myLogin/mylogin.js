import config from '../../../../config.json';

const linkAdmin = document.getElementById('link-admin');
const loginAdmin = document.getElementById('login-admin');
const buttonCrossClose = document.getElementById('cross-close');
const loginError = document.getElementById('login-error');
const formLogin = document.forms.formLogin;

linkAdmin.onclick = function(event) {
	event.preventDefault();
	loginAdmin.style.display = 'block';
};

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

window.onload = function() {
	let params = (new URL(document.location.href)).searchParams;

	if (params.get('msg')) {
		loginAdmin.style.display = 'block';
		loginError.innerHTML = params.get('msg');

		delUrlParamMsg();
	}
};

formLogin.login.onfocus = function () {
	loginError.innerHTML = '';
};

formLogin.password.onfocus = function () {
	loginError.innerHTML = '';
};
// formLogin.onsubmit = function(event) {
// 	event.preventDefault();

// 	let data = {
// 		login: this.login.value,
// 		password: this.password.value
// 	};

// 	fetch(`${config.URL}:${config.PORT}/users/validuser`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(data)
// 	})
// 		.then(
// 			response => response.json()
// 		)
// 		.then(
// 			data => {
// 				console.log(data);
// 			}
// 		);
// };