import config from '../../../../config.json';

const buttonSign = document.getElementById('button-sign');
const signBlock = document.getElementById('sign-block');
const buttonCrossClose = document.getElementById('sign-cross-close');
const signError = document.getElementById('sign-error');
const formSign = document.forms.formSign;

buttonSign.onclick = function(event) {
	event.preventDefault();
	signBlock.style.display = 'block';
};

// функция удаления параметра урл с сообщением ошибки
function delUrlParamMsg() {
	let url = document.location.href;
	let newUrl = url.slice(0, url.indexOf('?'));
	window.history.replaceState(null, null, newUrl);
}

buttonCrossClose.onclick = function() {
	signBlock.style.display = 'none';
	signError.innerHTML = '';

	delUrlParamMsg();
};

window.onload = function() {
	let params = (new URL(document.location.href)).searchParams;

	if (params.get('msg')) {
		signBlock.style.display = 'block';
		signError.innerHTML = params.get('msg');

		delUrlParamMsg();
	}
};

formSign.login.onfocus = function () {
	signError.innerHTML = '';
};

formSign.password.onfocus = function () {
	signError.innerHTML = '';
};

// formSign.onsubmit = function(event) {
// 	event.preventDefault();

// 	let data = {
// 		login: this.login.value,
// 		password: this.password.value
// 	};

// 	fetch(`${config.URL}:${config.PORT}/users/adduser`, {
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